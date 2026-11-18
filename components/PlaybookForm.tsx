"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookingFrame,
  ErrorLine,
  bookingSrc,
  emailOk,
  isFreeEmail,
  readAttribution,
  sendLead,
  setAdvancedMatching,
  track,
  trackGoogleAdsLead,
} from "@/components/Funnel";
import { DIAL_CODES, PRIORITY_ISO2, composePhone } from "@/lib/dial-codes";

// The SDR lead magnet ("The one-rep meeting machine"). Three one-tap questions,
// then where to send it. Every opt-in gets the PDF and Connor's calendar on the
// same screen, and a call within a minute from the Leadey workflow.
const LOCATION_TAG = "playbook - one rep";

const STEPS = [
  { key: "kind", q: "Who are the meetings for?", options: ["My business", "My agency's clients"] },
  { key: "booker", q: "Who books your sales meetings now?", options: ["Me / the founder", "An in-house rep", "An agency", "Nobody yet"] },
  { key: "meetings", q: "How many sales meetings do you book a month?", options: ["0 to 5", "6 to 15", "16 to 40", "More than 40"] },
] as const;

type Answers = Partial<Record<(typeof STEPS)[number]["key"], string>>;

export default function PlaybookForm({ market, pdf, headline }: { market: "uk" | "us"; pdf: string; headline: string }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [f, setF] = useState({ name: "", email: "", phone: "", company: "", dialCc: market === "us" ? "US" : "GB" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const started = useRef(false);
  const freeEmail = emailOk(f.email) && isFreeEmail(f.email);

  // ?preview=thanks opens the thank-you screen without sending a lead, so the
  // team can review it.
  useEffect(() => {
    if (new URLSearchParams(location.search).get("preview") === "thanks") setDone(true);
  }, []);

  const pick = (key: string, value: string) => {
    if (!started.current) {
      started.current = true;
      track("InitiateCheckout", {}, { eventID: "ic_" + eventId.current });
    }
    setA((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (f.name.trim().length < 2) return setError("Add your name.");
    if (!emailOk(f.email)) return setError("Add a valid email.");
    if (f.phone.replace(/\D/g, "").length < 6) return setError("Add your mobile so we can text it to you.");
    setError("");
    setSubmitting(true);
    const phone = composePhone(f.dialCc, f.phone);
    const agency = a.kind === "My agency's clients";

    setAdvancedMatching({ name: f.name, email: f.email, phone });
    track("Lead", { content_category: agency ? "sdr-agency" : "sdr" }, { eventID: eventId.current });
    trackGoogleAdsLead(eventId.current);

    // status "partial" is the step at which /api/lead sends the CAPI Lead.
    await sendLead({
      name: f.name.trim(),
      email: f.email.trim(),
      email_type: isFreeEmail(f.email) ? "free" : "work",
      phone,
      company: f.company.trim() || undefined,
      funnel: "playbook",
      demand_type: "Sales",
      service: "Hire sales reps",
      role: "SDR",
      who_books_now: a.booker,
      meetings_needed: a.meetings,
      buyer_type: agency ? "Agency" : "Business",
      market,
      country: market === "us" ? "US" : "GB",
      status: "partial",
      captured_step: 4,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: `One-rep playbook: ${a.kind}; booked by: ${a.booker}; meetings a month: ${a.meetings}`,
      page: location.href,
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
      hero_variant: headline,
      ...readAttribution(),
    });
    setSubmitting(false);
    setDone(true);
  };

  const chip =
    "rounded-xl border border-[var(--border-default)] bg-white px-4 py-3.5 text-left text-[15.5px] font-medium text-navy-900 transition hover:border-sky-500 hover:bg-ice-100/60";
  const inputCls =
    "mt-1 w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow";

  if (done) {
    const first = f.name.trim().split(/\s+/)[0];
    return (
      <div className="text-navy-900">
        <p className="eyebrow text-[11px] text-steel-600">Your playbook is ready</p>
        <p className="mt-2 font-display text-[22px] font-semibold leading-tight">
          Here it is{first ? `, ${first}` : ""}.
        </p>
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-6 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800"
        >
          Open the playbook (PDF)
        </a>
        <p className="mt-3 text-[13.5px] text-steel-700">
          We&apos;ve also sent it to your email and by text. Connor will give you a quick call to talk it through.
        </p>
        <p className="mt-6 font-display text-[18px] font-semibold">Skip the wait: pick a time with Connor.</p>
        <p className="mt-1 text-[14px] text-steel-700">
          15 minutes. He&apos;ll map the playbook onto your market and show you the rep we&apos;d put on it.
        </p>
        <BookingFrame
          eventId={eventId.current}
          src={bookingSrc({
            name: f.name.trim(),
            email: f.email.trim(),
            notes: `One-rep playbook. ${a.kind}. Books now: ${a.booker}. Meetings a month: ${a.meetings}. Mobile: ${composePhone(f.dialCc, f.phone)}.`,
          })}
        />
      </div>
    );
  }

  const q = STEPS[step];
  return (
    <div className="text-navy-900">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-[11px] text-steel-600">Step {Math.min(step + 1, 4)} of 4</p>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="text-[13px] font-medium text-steel-600 hover:text-navy-900">
            Back
          </button>
        )}
      </div>
      {q ? (
        <>
          <p className="mt-3 font-display text-[19px] font-semibold leading-snug">{q.q}</p>
          <div className="mt-4 grid gap-2">
            {q.options.map((o) => (
              <button key={o} type="button" onClick={() => pick(q.key, o)} className={chip}>
                {o}
              </button>
            ))}
          </div>
        </>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <p className="mt-3 font-display text-[19px] font-semibold leading-snug">Your playbook&apos;s ready. Where should we send it?</p>
          <div className="mt-4 space-y-3">
            <label className="block text-[14px] font-medium text-steel-700">
              Name
              <input autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls} />
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Email
              <input type="email" autoComplete="email" placeholder="you@company.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inputCls} />
              {freeEmail && (
                <span className="mt-1.5 block text-[12.5px] font-normal text-steel-600">A work email helps us tailor the call to your business.</span>
              )}
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Mobile <span className="font-normal text-[var(--text-faint)]">(we&apos;ll text it to you)</span>
              <div className="mt-1 flex gap-2">
                <select
                  aria-label="Country dialling code"
                  value={f.dialCc}
                  onChange={(e) => setF({ ...f, dialCc: e.target.value })}
                  className="w-[116px] shrink-0 rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-2 py-3 text-[16px] text-navy-900 outline-none focus:border-sky-500"
                >
                  <optgroup label="Common">
                    {PRIORITY_ISO2.map((iso) => {
                      const c = DIAL_CODES.find((d) => d.iso2 === iso);
                      return c ? <option key={`pri-${c.iso2}`} value={c.iso2}>{c.flag} {c.dial}</option> : null;
                    })}
                  </optgroup>
                  <optgroup label="All countries">
                    {DIAL_CODES.map((c) => (
                      <option key={c.iso2} value={c.iso2}>{c.flag} {c.dial} {c.name}</option>
                    ))}
                  </optgroup>
                </select>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={f.phone}
                  onChange={(e) => setF({ ...f, phone: e.target.value })}
                  className="w-full min-w-0 rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Company <span className="font-normal text-[var(--text-faint)]">(optional)</span>
              <input autoComplete="organization" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} className={inputCls} />
            </label>
          </div>
          {error && <ErrorLine>{error}</ErrorLine>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-2xl bg-navy-900 px-6 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send me the playbook"}
          </button>
        </form>
      )}
      <p className="mt-3 text-center text-[12.5px] text-[var(--text-faint)]">Free. It opens on the next screen.</p>
    </div>
  );
}
