import type { Metadata } from "next";
import ScheduleTracker from "@/components/ScheduleTracker";

export const metadata: Metadata = {
  title: "Booking confirmed — Octogle Hire",
  robots: { index: false, follow: false },
};

const STEPS = [
  { n: "01", b: "Profiles land in your inbox within 48 hours." },
  { n: "02", b: "On the call, you pick one or tell us what to change." },
  {
    n: "03",
    b: "They're embedded in your team from week one. No placement fee.",
  },
];

export default function BookedPage() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-content flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
      <ScheduleTracker />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/octogle-logo.svg"
        alt="Octogle Hire"
        width={128}
        height={30}
        className="mb-10 h-[28px] w-auto"
      />

      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-sky-500/15 text-steel-600">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="eyebrow mb-3 text-[12px] font-medium text-steel-500">
        Booking confirmed
      </p>
      <h1 className="font-display text-[clamp(2rem,6vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.01em] text-navy-900">
        You&apos;re all booked in.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-steel-700">
        A calendar invite is on its way to your inbox. Connor will bring the
        three engineers we&apos;d put on your build so you can go through them
        together.
      </p>

      <div className="mt-12 w-full max-w-2xl text-left">
        <p className="eyebrow mb-4 text-[12px] font-medium text-steel-500">
          What happens next
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card"
            >
              <span className="font-mono text-[15px] font-medium text-sky-600">
                {s.n}
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-steel-700">
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-14 text-[14px] text-[var(--text-faint)]">
        Octogle Hire · Embedded engineers from £1,500 a month · UK
      </p>
    </main>
  );
}
