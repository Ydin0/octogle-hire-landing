"use client";

import { useRef, useState } from "react";
import {
  BookingFrame,
  CALENDAR_URL,
  ErrorLine,
  EXPLORING,
  LEADEY_TIMELINE,
  bookingSrc,
  emailOk,
  isFreeEmail,
  readAttribution,
  sendLead,
  setAdvancedMatching,
  track,
  trackGoogleAdsLead,
} from "@/components/Funnel";

// /hire is the US search page, so leads go to the US campaign (market "us")
// and its US developer follow-up flow. Tagged apart from the Meta lander.
const LOCATION_TAG = "landing page - hire";

const ROLES = ["Full-stack", "Backend", "Frontend", "AI / ML", "Mobile", "Not sure yet"];
const HEADCOUNT = ["1", "2–3", "4+"];
const START_OPTIONS = ["As soon as possible", "Within a month", "In 1 to 3 months", EXPLORING];

/**
 * Two steps: what they need (three taps), then who they are. Lead fires on
 * step 2, then the calendar shows in place. Rendered twice on the page (hero
 * and bottom); each instance is its own lead.
 */
export default function HireForm({ id }: { id: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState("");
  const [count, setCount] = useState("");
  const [start, setStart] = useState("");
  const [f, setF] = useState({ name: "", email: "", company: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const started = useRef(false);
  const exploring = start === EXPLORING;
  const freeEmail = emailOk(f.email) && isFreeEmail(f.email);

  const next = () => {
    if (!role || !count || !start) return setError("Pick a role, how many and when.");
    setError("");
    if (!started.current) {
      started.current = true;
      track("InitiateCheckout", {}, { eventID: "ic_" + eventId.current });
    }
    setStep(2);
  };

  const submit = async () => {
    if (f.name.trim().length < 2) return setError("Add your name.");
    if (!emailOk(f.email)) return setError("Add a valid work email.");
    if (f.company.trim().length < 2) return setError("Add your company.");
    setError("");
    setSubmitting(true);

    setAdvancedMatching({ name: f.name, email: f.email, phone: "" });
    track("Lead", { content_category: role }, { eventID: eventId.current });
    trackGoogleAdsLead(eventId.current);

    // status "partial" is the step at which /api/lead sends the CAPI Lead.
    await sendLead({
      name: f.name.trim(),
      email: f.email.trim(),
      email_type: isFreeEmail(f.email) ? "free" : "work",
      company: f.company.trim(),
      role,
      headcount_needed: count,
      timeline: LEADEY_TIMELINE[start] ?? start,
      nurture: exploring ? "Yes" : undefined,
      market: "us",
      country: "US",
      status: "partial",
      captured_step: 2,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: `Hire page (${id} form): Role: ${role}; Developers: ${count}; Start: ${start}${
        exploring ? "; exploring, nurture (no calendar shown)" : ""
      }`,
      page: location.href,
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
      hero_variant: "hire",
      ...readAttribution(),
    });
    setSubmitting(false);
    setStep(3);
  };

  const chip = (active: boolean) =>
    "rounded-xl border px-3 py-2.5 text-center text-[14.5px] font-medium leading-tight transition " +
    (active
      ? "border-navy-900 bg-navy-900 text-white"
      : "border-[var(--border-default)] bg-white text-navy-900 hover:border-sky-500");
  const inputCls =
    "mt-1 w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow";
  const primary =
    "mt-5 w-full rounded-2xl bg-navy-900 px-6 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800 disabled:opacity-60";

  const group = (label: string, options: string[], value: string, set: (v: string) => void, cols: string) => (
    <>
      <p className="mt-4 text-[14.5px] font-semibold first:mt-0">{label}</p>
      <div className={`mt-2 grid gap-2 ${cols}`}>
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => set(o)} className={chip(value === o)}>
            {o}
          </button>
        ))}
      </div>
    </>
  );

  if (step === 3) {
    const first = f.name.trim().split(/\s+/)[0];
    return exploring ? (
      <div className="text-navy-900">
        <p className="font-display text-[22px] font-semibold">Thanks{first ? `, ${first}` : ""}.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
          We&apos;ll email you the price at each level and how it works. When you&apos;re ready, book a
          call and we&apos;ll have a shortlist waiting.
        </p>
        <a
          href={CALENDAR_URL.replace("?embed=1", "")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[14px] font-medium text-steel-600 underline underline-offset-4 hover:text-navy-900"
        >
          Ready now? Book a call
        </a>
      </div>
    ) : (
      <div className="text-navy-900">
        <p className="font-display text-[20px] font-semibold">
          Last step{first ? `, ${first}` : ""}: pick a time with Connor.
        </p>
        <p className="mt-1 text-[14px] text-steel-700">15 minutes. Your shortlist within 48 hours of the call.</p>
        <BookingFrame
          eventId={eventId.current}
          src={bookingSrc({
            name: f.name.trim(),
            email: f.email.trim(),
            notes: `Company: ${f.company.trim()}. Role: ${role}. Developers: ${count}. Start: ${start}.`,
          })}
        />
      </div>
    );
  }

  return (
    <div className="text-navy-900">
      <p className="eyebrow text-[11px] text-steel-600">Step {step} of 2</p>
      {step === 1 ? (
        <div className="mt-3">
          {group("Role you need", ROLES, role, setRole, "grid-cols-2 sm:grid-cols-3")}
          {group("How many developers", HEADCOUNT, count, setCount, "grid-cols-3")}
          {group("When do you need them", START_OPTIONS, start, setStart, "grid-cols-2")}
          {error && <ErrorLine>{error}</ErrorLine>}
          <button type="button" onClick={next} className={primary}>
            Next
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-2 inline-flex rounded-full bg-ice-100 px-3 py-1.5 text-[13px] font-medium text-steel-700 hover:text-navy-900"
          >
            {role} · {count} · {start} · Edit
          </button>
          <div className="mt-4 space-y-3">
            <label className="block text-[14px] font-medium text-steel-700">
              Name
              <input
                autoComplete="name"
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Work email
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                className={inputCls}
              />
              {freeEmail && (
                <span className="mt-1.5 block text-[12.5px] font-normal text-steel-600">
                  Got a company email? Shortlists go out faster to a work address.
                </span>
              )}
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Company
              <input
                autoComplete="organization"
                placeholder="Acme Inc."
                value={f.company}
                onChange={(e) => setF({ ...f, company: e.target.value })}
                className={inputCls}
              />
            </label>
          </div>
          {error && <ErrorLine>{error}</ErrorLine>}
          <button type="submit" disabled={submitting} className={primary}>
            {submitting ? "Sending…" : exploring ? "Send me the details" : "Get my shortlist"}
          </button>
        </form>
      )}
      <p className="mt-3 text-center text-[12.5px] text-[var(--text-faint)]">
        No placement fee · Free replacement · Rolling monthly
      </p>
    </div>
  );
}
