"use client";

import { useEffect, useRef, useState } from "react";
import { DIAL_CODES, PRIORITY_ISO2, composePhone } from "@/lib/dial-codes";

// Same-origin relay to Leadey (see app/api/lead/route.ts). Posting to Leadey
// directly with no-cors dropped every lead.
const LEAD_ENDPOINT = "/api/lead";
const CALENDAR_URL =
  "https://app.leadey.ai/book/octogle-hire-connor-lp-mcjcg2?embed=1";
const LOCATION_TAG = "landing page -dan";
const LEADEY_ORIGIN = "https://app.leadey.ai";
// Same id app/layout.tsx initialises the pixel with; re-init only adds
// Advanced Matching data, it never creates a second pixel.
const META_PIXEL_ID = "1614640659743336";
// Shared with /booked so a booking is only ever counted once per visitor.
const SCHEDULE_SENT_KEY = "ogh_schedule_sent";
// Google Ads "Submit lead form" conversion (tag loaded in app/layout.tsx).
const GOOGLE_ADS_LEAD_CONVERSION = "AW-18440423872/1XedCIbikPscEMCTitlE";

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

function track(event: string, params?: object, opts?: object) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params || {}, opts || {});
}

/**
 * Re-init the pixel with Advanced Matching so Meta can match the Lead to a
 * person (email, phone, name). fbevents.js hashes these client-side; they must
 * never go in event params. Call right before the conversion event.
 */
function setAdvancedMatching(user: { name: string; email: string; phone: string }) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq !== "function") return;
  const parts = user.name.trim().split(/\s+/).filter(Boolean);
  const data: Record<string, string> = {};
  if (user.email.trim()) data.em = user.email.trim().toLowerCase();
  if (parts[0]) data.fn = parts[0].toLowerCase();
  if (parts.length > 1) data.ln = parts.slice(1).join(" ").toLowerCase();
  const digits = user.phone.replace(/\D/g, "");
  if (digits) data.ph = digits;
  fbq("init", META_PIXEL_ID, data);
}

function trackGoogleAdsLead(transactionId: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_LEAD_CONVERSION,
      value: 1.0,
      currency: "AED",
      transaction_id: transactionId,
    });
  } catch {
    // Analytics must never break the funnel.
  }
}

const LEVEL_OPTIONS = ["Junior", "Mid-level", "Senior", "Not sure yet"];
const START_OPTIONS = [
  "As soon as possible",
  "Within a month",
  "In 1 to 3 months",
  "Just exploring",
];
// Not ready to start: no calendar, a nurture message instead. Exploring leads
// were the biggest source of "Not a Fit" calls.
const EXPLORING = "Just exploring";

// Business email is the only form field that predicts a deal, so we nudge
// (never block) toward it and tag every lead with which it was.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.co.uk", "outlook.com",
  "outlook.co.uk", "live.com", "live.co.uk", "msn.com", "yahoo.com",
  "yahoo.co.uk", "icloud.com", "me.com", "aol.com", "proton.me",
  "protonmail.com", "btinternet.com", "sky.com", "gmx.com", "mail.com",
]);
const isFreeEmail = (email: string) =>
  FREE_EMAIL_DOMAINS.has(email.trim().toLowerCase().split("@")[1] ?? "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Campaign attribution, read from the landing URL so every lead in Leadey can
// be tied back to the ad (utm_content = ad name) and the hero it saw.
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "fbclid",
] as const;

function readAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ATTRIBUTION_KEYS) {
    const val = params.get(k)?.trim();
    if (val) out[k] = val.slice(0, 200);
  }
  return out;
}

// keepalive so the request survives the visitor closing the tab mid-send.
function sendLead(body: object) {
  return fetch(LEAD_ENDPOINT, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

/**
 * The page's only form, inline at #book. Step 1 is two taps (level, start
 * date), step 2 is contact details and fires Lead, then the calendar shows in
 * place. Every CTA on the page scrolls here.
 */
export function BookForm({ variant }: { variant: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [level, setLevel] = useState("");
  const [start, setStart] = useState("");
  const [f, setF] = useState({ name: "", email: "", phone: "", dialCc: "GB" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const started = useRef(false);
  const scheduled = useRef(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const exploring = start === EXPLORING;
  const freeEmail = emailOk(f.email) && isFreeEmail(f.email);

  // Leadey's booking iframe posts {channel:"leadey:booking", event, ...} for
  // everything, including size updates while it loads. Only a real
  // booking_scheduled from Leadey's origin counts as a Schedule.
  useEffect(() => {
    if (step !== 3) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== LEADEY_ORIGIN) return;
      const data = e.data as
        | { channel?: string; event?: string; height?: number; url?: string }
        | undefined;
      if (!data || data.channel !== "leadey:booking") return;

      if (data.event === "resize" && data.height && frameRef.current) {
        frameRef.current.style.height = `${Math.max(560, data.height)}px`;
        return;
      }
      if (data.event === "booking_scheduled" && !scheduled.current) {
        scheduled.current = true;
        try {
          sessionStorage.setItem(SCHEDULE_SENT_KEY, "1");
        } catch {
          /* storage blocked; /booked may count it again, acceptable */
        }
        track("Schedule", {}, { eventID: "sched_" + eventId.current });
        return;
      }
      // The iframe can't navigate the top window itself.
      if (data.event === "redirect" && data.url) {
        window.location.href = data.url;
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [step]);

  // First interaction with the form = funnel start, once.
  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("InitiateCheckout", {}, { eventID: "ic_" + eventId.current });
  };

  const next = () => {
    if (!level || !start) return setError("Pick a level and a start date.");
    setError("");
    setStep(2);
  };

  const submit = async () => {
    if (f.name.trim().length < 2) return setError("Add your name.");
    if (!emailOk(f.email)) return setError("Add a valid email.");
    setError("");
    setSubmitting(true);
    const phone = f.phone.trim() ? composePhone(f.dialCc, f.phone) : "";

    setAdvancedMatching({ name: f.name, email: f.email, phone });
    track("Lead", { content_category: level }, { eventID: eventId.current });
    trackGoogleAdsLead(eventId.current);

    // status "partial" is the step at which /api/lead sends the CAPI Lead.
    await sendLead({
      name: f.name.trim(),
      email: f.email.trim(),
      email_type: isFreeEmail(f.email) ? "free" : "work",
      phone,
      seniority: level,
      timeline: start,
      nurture: exploring || undefined,
      status: "partial",
      captured_step: 2,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: `Landing page: Level: ${level}; Start: ${start}${
        exploring ? "; exploring, nurture (no calendar shown)" : ""
      }`,
      page: location.href,
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
      hero_variant: variant,
      ...readAttribution(),
    });
    setSubmitting(false);
    setStep(3);
  };

  const chip = (active: boolean) =>
    "rounded-xl border px-3 py-3 text-center text-[15px] font-medium leading-tight transition " +
    (active
      ? "border-navy-900 bg-navy-900 text-white"
      : "border-[var(--border-default)] bg-white text-navy-900 hover:border-sky-500");
  const inputCls =
    "mt-1 w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow";
  const primary =
    "mt-5 w-full rounded-2xl bg-navy-900 px-6 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800 disabled:opacity-60";

  if (step === 3) {
    const first = f.name.trim().split(/\s+/)[0];
    return exploring ? (
      <div className="rounded-3xl bg-white p-6 text-navy-900 shadow-cta">
        <p className="font-display text-[22px] font-semibold">
          Thanks{first ? `, ${first}` : ""}.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
          We&apos;ll email you how it works and the price at each level. When
          you&apos;re ready to start, book a call and we&apos;ll have three
          profiles ready.
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
      <div className="rounded-3xl bg-white p-4 text-navy-900 shadow-cta sm:p-6">
        <p className="px-2 font-display text-[20px] font-semibold">
          Last step{first ? `, ${first}` : ""}: pick a time with Connor.
        </p>
        <p className="mt-1 px-2 text-[14px] text-steel-700">
          15 minutes. Three profiles within 48 hours of the call.
        </p>
        <iframe
          ref={frameRef}
          src={CALENDAR_URL}
          title="Book a call with Connor"
          className="mt-3 h-[560px] w-full rounded-2xl border border-[var(--border-subtle)]"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl bg-white p-5 text-navy-900 shadow-cta sm:p-6"
      onFocusCapture={markStarted}
      onPointerDown={markStarted}
      onClickCapture={markStarted}
    >
      <p className="eyebrow text-[11px] text-steel-600">Step {step} of 2</p>

      {step === 1 ? (
        <>
          <p className="mt-3 text-[15px] font-semibold">Level you need</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {LEVEL_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={level === o}
                onClick={() => setLevel(o)}
                className={chip(level === o)}
              >
                {o}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[15px] font-semibold">When do you want them to start?</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {START_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={start === o}
                onClick={() => setStart(o)}
                className={chip(start === o)}
              >
                {o}
              </button>
            ))}
          </div>
          {error && <ErrorLine>{error}</ErrorLine>}
          <button type="button" onClick={next} className={primary}>
            Next
          </button>
        </>
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
            {level} · {start} · Edit
          </button>
          <div className="mt-4 space-y-3">
            <label className="block text-[14px] font-medium text-steel-700">
              Name
              <input
                autoComplete="name"
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className={inputCls}
                autoFocus
              />
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Work email
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.co.uk"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                className={inputCls}
              />
              {freeEmail && (
                <span className="mt-1.5 block text-[12.5px] font-normal text-steel-600">
                  Got a company email? Profiles go out faster to a work address.
                </span>
              )}
            </label>
            <label className="block text-[14px] font-medium text-steel-700">
              Mobile <span className="font-normal text-[var(--text-faint)]">(optional, for a quick call back)</span>
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
                      return c ? (
                        <option key={`pri-${c.iso2}`} value={c.iso2}>
                          {c.flag} {c.dial}
                        </option>
                      ) : null;
                    })}
                  </optgroup>
                  <optgroup label="All countries">
                    {DIAL_CODES.map((c) => (
                      <option key={c.iso2} value={c.iso2}>
                        {c.flag} {c.dial} {c.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="7700 900123"
                  value={f.phone}
                  onChange={(e) => setF({ ...f, phone: e.target.value })}
                  className="w-full min-w-0 rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white"
                />
              </div>
            </label>
          </div>
          {error && <ErrorLine>{error}</ErrorLine>}
          <button type="submit" disabled={submitting} className={primary}>
            {submitting ? "Sending…" : exploring ? "Send me the details" : "Book my call"}
          </button>
        </form>
      )}

      <p className="mt-3 text-center text-[12.5px] text-[var(--text-faint)]">
        No placement fee · Free swap · Rolling monthly
      </p>
    </div>
  );
}

function ErrorLine({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[13px] font-medium text-[#d93a3f]">{children}</p>;
}
