"use client";

import { useState } from "react";

// Year-one cost of a UK hire vs Octogle at the same level.
//
// Default salaries: Reed UK averages. Employer NI 15% above £5,000 (GOV.UK).
// Workplace pension: employer 3% of qualifying earnings £6,240 to £50,270
// (The Pensions Regulator). Recruiter fee typically 15% to 25%; default 20%.
// Excludes Employment Allowance, equipment, benefits and management time, so
// it understates the real UK cost. Octogle prices are the published tiers.
const LEVELS = [
  { key: "junior", label: "Junior", salary: 31407, monthly: 1500 },
  { key: "mid", label: "Mid-level", salary: 44851, monthly: 2500 },
  { key: "senior", label: "Senior", salary: 59173, monthly: 4500 },
] as const;

const NI_RATE = 0.15;
const NI_THRESHOLD = 5000;
const PENSION_RATE = 0.03;
const PENSION_LOWER = 6240;
const PENSION_UPPER = 50270;

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

export function ukYearOne(salary: number, feePct: number) {
  const ni = NI_RATE * Math.max(0, salary - NI_THRESHOLD);
  const pension =
    PENSION_RATE * Math.max(0, Math.min(salary, PENSION_UPPER) - PENSION_LOWER);
  const fee = (feePct / 100) * salary;
  return { ni, pension, fee, total: salary + ni + pension + fee };
}

export default function CostCalculator() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]["key"]>("mid");
  const lv = LEVELS.find((l) => l.key === level)!;
  const [salary, setSalary] = useState<number>(lv.salary);
  const [feePct, setFeePct] = useState(20);

  const uk = ukYearOne(salary || 0, feePct || 0);
  const octogle = lv.monthly * 12;
  const saving = Math.max(0, uk.total - octogle);
  const pctLess = uk.total > 0 ? Math.round((saving / uk.total) * 100) : 0;
  const octoglePct = uk.total > 0 ? Math.min(100, (octogle / uk.total) * 100) : 100;

  const inputCls =
    "mt-1 w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-3 py-2.5 text-[16px] text-navy-900 outline-none transition focus:border-sky-500 focus:bg-white focus:shadow-glow";

  return (
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-cta sm:p-6">
      <p className="font-display text-[17px] font-semibold text-navy-900">
        How much you&apos;d save vs a UK hire
      </p>

      <div
        role="radiogroup"
        aria-label="Level"
        className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-ice-100 p-1"
      >
        {LEVELS.map((l) => (
          <button
            key={l.key}
            type="button"
            role="radio"
            aria-checked={level === l.key}
            onClick={() => {
              setLevel(l.key);
              setSalary(l.salary);
            }}
            className={
              "rounded-lg py-2 text-[14px] font-medium transition " +
              (level === l.key
                ? "bg-white text-navy-900 shadow-card"
                : "text-steel-600 hover:text-navy-900")
            }
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* The saving is the headline; the costs that make it up sit under it. */}
      <div className="mt-4 rounded-2xl bg-good/10 p-5">
        <p className="text-[13px] font-medium text-good">You&apos;d save in year one</p>
        <p
          key={`${level}-${Math.round(saving)}`}
          className="calc-pop mt-1 font-display text-[44px] font-semibold leading-none tracking-[-0.02em] text-good"
        >
          {gbp(saving)}
        </p>
        <p className="mt-2 text-[14px] text-[#1b7a54]">
          That&apos;s <b className="font-semibold">{gbp(saving / 12)} a month</b>,{" "}
          <b className="font-semibold">{pctLess}% less</b> than hiring in the UK.
        </p>
      </div>

      {/* Side-by-side bars: the gap is the saving. */}
      <div className="mt-4 space-y-3 text-[13px]">
        <div>
          <div className="flex justify-between text-steel-700">
            <span>UK hire (salary, NI, pension, recruiter fee)</span>
            <span className="font-semibold text-navy-900">{gbp(uk.total)}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ice-200">
            <div className="h-full w-full rounded-full bg-[#c2414b]/80" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-steel-700">
            <span>Octogle Hire, 12 months</span>
            <span className="font-semibold text-navy-900">{gbp(octogle)}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ice-200">
            <div
              className="h-full rounded-full bg-good transition-[width] duration-700 ease-out"
              style={{ width: `${octoglePct}%` }}
            />
          </div>
        </div>
      </div>

      <details className="mt-4 text-[12px] leading-relaxed text-[var(--text-faint)]">
        <summary className="cursor-pointer">Change salary or recruiter fee</summary>
        <div className="mt-2 grid grid-cols-2 gap-3 text-[13px] font-medium text-steel-700">
        <label>
          UK salary (£)
          <input
            type="number"
            inputMode="numeric"
            value={salary || ""}
            onChange={(e) => setSalary(Number(e.target.value))}
            className={inputCls}
          />
        </label>
        <label>
          Recruiter fee (%)
          <input
            type="number"
            inputMode="numeric"
            value={feePct}
            onChange={(e) => setFeePct(Number(e.target.value))}
            className={inputCls}
          />
        </label>
      </div>

      </details>

      <details className="mt-3 text-[12px] leading-relaxed text-[var(--text-faint)]">
        <summary className="cursor-pointer">Breakdown and sources</summary>
        <p className="mt-1.5">
          NI {gbp(uk.ni)} · pension {gbp(uk.pension)} · fee {gbp(uk.fee)}.
          Default salaries are Reed UK averages. Employer NI 15% above £5,000
          (GOV.UK). Employer pension 3% of earnings between £6,240 and £50,270
          (The Pensions Regulator). Recruiter fees typically 15% to 25%.
          Excludes Employment Allowance, equipment, benefits and management
          time. Illustrative.
        </p>
      </details>
    </div>
  );
}
