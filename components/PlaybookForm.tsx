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

// Two doors into one SDR funnel. "book": ready buyers leave their details and
// go straight to Connor's calendar. "playbook": three one-tap questions, then
// the PDF, then the calendar. Both post the same lead (tagged by door) and get a
// call within a minute from the Leadey workflow. ?door= picks one; without it
// the visitor chooses.
const LOCATION_TAG = "playbook - one rep";

export type Door = "book" | "playbook";

const STEPS = [
  { key: "kind", q: "Who are the meetings for?", options: ["My business", "My agency's clients"] },
  { key: "booker", q: "Who books your sales meetings now?", options: ["Me / the founder", "An in-house rep", "An agency", "Nobody yet"] },
  { key: "meetings", q: "How many sales meetings do you book a month?", options: ["0 to 5", "6 to 15", "16 to 40", "More than 40"] },
] as const;

type Answers = Partial<Record<(typeof STEPS)[number]["key"], string>>;

export default function PlaybookForm({
  market,
  pdf,
  headline,
  initialDoor,
  agencyHeadline,
  onDone,
}: {
  market: "uk" | "us";
  pdf: string;
  headline: string;
  initialDoor: Door | null;
  agencyHeadline: boolean;
  onDone: () => void;
}) {
  const [door, setDoor] = useState<Door | null>(initialDoor);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [f, setF] = useState({ name: "", email: "", phone: "", company: "", sell: "", dialCc: market === "us" ? "US" : "GB" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const started = useRef(false);
  const freeEmail = emailOk(f.email) && isFreeEmail(f.email);
  const agency = a.kind ? a.kind === "My agency's clients" : agencyHeadline;

  const finish = () => {
    setDone(true);
    onDone();
  };

  // ?preview=thanks opens the thank-you screen without sending a lead, so the
  // team can review it.
  useEffect(() => {
    if (new URLSearchParams(location.search).get("preview") === "thanks") finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const begin = () => {
    if (!started.current) {
      started.current = true;
      track("InitiateCheckout", {}, { eventID: "ic_" + eventId.current });
    }
  };

  const choose = (d: Door) => {
    begin();
    setDoor(d);
  };

  const pick = (key: string, value: string) => {
    begin();
    setA((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (f.name.trim().length < 2) return setError("Add your name.");
    if (!emailOk(f.email)) return setError("Add a valid email.");
    if (f.phone.replace(/\D/g, "").length < 6) return setError("Add your mobile so we can text you.");
    if (f.sell.trim().length < 2) return setError("Tell us what you sell, so Connor can prep the call.");
    setError("");
    setSubmitting(true);
    const phone = composePhone(f.dialCc, f.phone);

    setAdvancedMatching({ name: f.name, email: f.email, phone });
    track("Lead", { content_category: agency ? "sdr-agency" : "sdr", content_name: door ?? "playbook" }, { eventID: eventId.current });
    trackGoogleAdsLead(eventId.current);

    const answers = `sells: ${f.sell.trim()}; ` + (door === "playbook" ? `${a.kind}; booked by: ${a.booker}; meetings a month: ${a.meetings}` : "asked for a call");
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
      what_you_sell: f.sell.trim(),
      who_books_now: a.booker,
      meetings_needed: a.meetings,
      buyer_type: agency ? "Agency" : "Business",
      market,
      country: market === "us" ? "US" : "GB",
      status: "partial",
      captured_step: door === "playbook" ? 4 : 1,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: `SDR funnel (${door} door): ${answers}`,
      page: location.href,
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
      hero_variant: `${headline}|${door}`,
      ...readAttribution(),
    });
    setSubmitting(false);
    finish();
  };

  const chip =
    "rounded-xl border border-[var(--border-default)] bg-white px-4 py-3.5 text-left text-[15.5px] font-medium text-navy-900 transition hover:border-sky-500 hover:bg-ice-100/60";
  const inputCls =
    "mt-1 w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow";
  const primary =
    "w-full rounded-2xl bg-navy-900 px-6 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800 disabled:opacity-60";

  // The thank-you screen: the call first, the playbook second.
  if (done) {
    const first = f.name.trim().split(/\s+/)[0];
    return (
      <div className="text-navy-900">
        <p className="eyebrow text-[11px] text-steel-600">Last step</p>
        <h2 className="mt-2 font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-semibold leading-tight">
          Pick a time for your SDR plan{first ? `, ${first}` : ""}.
        </h2>
        <p className="mt-2 max-w-[38rem] text-[15.5px] leading-relaxed text-steel-700">
          15 minutes with Connor. You&apos;ll leave knowing who we&apos;d call, the angle of the script and how many
          meetings to expect for {agency ? "your clients' offers" : "your offer"}.
        </p>
        <BookingFrame
          eventId={eventId.current}
          src={bookingSrc({
            name: f.name.trim(),
            email: f.email.trim(),
            notes: `SDR funnel (${door} door). Sells: ${f.sell.trim()}. ${door === "playbook" ? `${a.kind}. Books now: ${a.booker}. Meetings a month: ${a.meetings}.` : ""} Mobile: ${f.phone ? composePhone(f.dialCc, f.phone) : "n/a"}.`,
          })}
        />
        <p className="mt-4 text-[14px] text-steel-700">
          {door === "playbook" ? "Your playbook is in your email and texts too. " : "While you wait, see how it works: "}
          <a href={pdf} target="_blank" rel="noopener noreferrer" className="font-medium text-navy-900 underline underline-offset-4">
            Open the playbook (PDF)
          </a>
        </p>
        <p className="mt-1 text-[13px] text-steel-600">Connor will also give you a quick call in the next few minutes.</p>
      </div>
    );
  }

  // No door picked yet: two buttons.
  if (!door) {
    return (
      <div className="text-navy-900">
        <p className="font-display text-[19px] font-semibold leading-snug">Get your SDR calling this month.</p>
        <p className="mt-1 text-[14.5px] text-steel-700">15 minutes with Connor, or start with the free playbook.</p>
        <button type="button" onClick={() => choose("book")} className={`${primary} mt-5`}>
          Book a 15-min call with Connor
        </button>
        <button
          type="button"
          onClick={() => choose("playbook")}
          className="mt-3 w-full rounded-2xl border border-[var(--border-default)] bg-white px-6 py-3.5 font-display text-[16px] font-medium text-navy-900 transition hover:border-sky-500"
        >
          Get the free playbook first
        </button>
        <p className="mt-3 text-center text-[12.5px] text-[var(--text-faint)]">Free. No commitment.</p>
      </div>
    );
  }

  const q = door === "playbook" ? STEPS[step] : undefined;
  const total = door === "playbook" ? 4 : 1;
  const back = () => (door === "playbook" && step > 0 ? setStep((s) => s - 1) : setDoor(null));
  return (
    <div className="text-navy-900">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-[11px] text-steel-600">{total > 1 ? `Step ${Math.min(step + 1, total)} of ${total}` : "Book your call"}</p>
        <button type="button" onClick={back} className="text-[13px] font-medium text-steel-600 hover:text-navy-900">
          Back
        </button>
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
          <p className="mt-3 font-display text-[19px] font-semibold leading-snug">
            {door === "playbook" ? "Your playbook's ready. Where should we send it?" : "Where can Connor reach you?"}
          </p>
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
              Mobile <span className="font-normal text-[var(--text-faint)]">{door === "playbook" ? "(we'll text it to you)" : "(for a quick call back)"}</span>
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
              What do you sell?
              <input placeholder="e.g. SEO retainers for dental clinics" value={f.sell} onChange={(e) => setF({ ...f, sell: e.target.value })} className={inputCls} />
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Company <span className="font-normal text-[var(--text-faint)]">(optional)</span>
              <input autoComplete="organization" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} className={inputCls} />
            </label>
          </div>
          {error && <ErrorLine>{error}</ErrorLine>}
          <button type="submit" disabled={submitting} className={`${primary} mt-5`}>
            {submitting ? "Sending…" : door === "playbook" ? "Send me the playbook" : "Pick a time with Connor"}
          </button>
        </form>
      )}
      <p className="mt-3 text-center text-[12.5px] text-[var(--text-faint)]">
        {door === "playbook" ? "Free. It opens on the next screen." : "Free. Connor's calendar opens on the next screen."}
      </p>
    </div>
  );
}
