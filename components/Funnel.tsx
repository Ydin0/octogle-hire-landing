"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type Fbq = (...args: unknown[]) => void;
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

// Google Ads "Submit lead form" conversion (tag loaded in app/layout.tsx).
const GOOGLE_ADS_LEAD_CONVERSION = "AW-18440423872/1XedCIbikPscEMCTitlE";

type Gtag = (...args: unknown[]) => void;
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

function track(event: string, params?: object, opts?: object) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params || {}, opts || {});
}

// First tap: how far along the product is. It qualifies as well as starts the
// funnel: idea-stage leads were the biggest source of "Not a Fit" on calls, so
// they get a nurture path instead of Connor's calendar.
export const STAGE_OPTIONS = [
  "Just an idea",
  "Designs or spec",
  "Prototype built",
  "Live with users",
] as const;
const IDEA_STAGE = STAGE_OPTIONS[0];

const LEVEL_OPTIONS = ["Junior", "Mid-level", "Senior", "Not sure"];

// Free-mail domains. Business email is the only form field that predicts a
// deal, so we nudge (not block) toward it and tag every lead with which it was.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.co.uk", "outlook.com",
  "outlook.co.uk", "live.com", "live.co.uk", "msn.com", "yahoo.com",
  "yahoo.co.uk", "icloud.com", "me.com", "aol.com", "proton.me",
  "protonmail.com", "btinternet.com", "sky.com", "gmx.com", "mail.com",
]);
const isFreeEmail = (email: string) =>
  FREE_EMAIL_DOMAINS.has(email.trim().toLowerCase().split("@")[1] ?? "");

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
  "v",
] as const;

function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ATTRIBUTION_KEYS) {
    const val = params.get(k)?.trim();
    if (val) out[k === "v" ? "hero_variant" : k] = val.slice(0, 200);
  }
  return out;
}

type Ctx = { open: (stage?: string) => void };
const FunnelCtx = createContext<Ctx | null>(null);

export function useFunnel() {
  const ctx = useContext(FunnelCtx);
  if (!ctx) throw new Error("useFunnel must be used within FunnelProvider");
  return ctx;
}

export function FunnelProvider({
  variant,
  children,
}: {
  /** Which ad-matched hero the visitor saw; sent with the lead. */
  variant?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialStage, setInitialStage] = useState<string | undefined>();

  const open = useCallback((stage?: string) => {
    track("InitiateCheckout", {}, { eventID: "ic_" + Date.now() });
    setInitialStage(stage);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <FunnelCtx.Provider value={value}>
      {children}
      {isOpen && (
        <QuizModal
          initialStage={initialStage}
          variant={variant}
          onClose={() => setIsOpen(false)}
        />
      )}
    </FunnelCtx.Provider>
  );
}

export function CtaButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useFunnel();
  return (
    <button type="button" onClick={() => open()} className={className}>
      {children}
    </button>
  );
}

// Embedded first question, rendered directly on the page. Tapping an option
// opens the modal already at the contact step, so starting the funnel costs
// a single tap instead of "open a form".
export function InlineStart({ className }: { className?: string }) {
  const { open } = useFunnel();
  return (
    <div className={className}>
      <p className="mb-3 font-display text-[17px] font-semibold text-navy-900">
        Where&apos;s your product at?
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAGE_OPTIONS.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => open(o)}
            className="rounded-2xl border border-navy-900/15 bg-white px-3 py-4 text-center font-display text-[16px] font-medium leading-tight text-navy-900 shadow-card transition hover:border-sky-500 hover:bg-sky-500/5 hover:shadow-glow focus:outline-none focus-visible:border-sky-500"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
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

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function QuizModal({
  initialStage,
  variant,
  onClose,
}: {
  initialStage?: string;
  variant?: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState(initialStage ? 2 : 1);
  const [stage, setStage] = useState(initialStage ?? "");
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    // ISO2 of the selected country prefix; the dial code is prepended to the
    // number on every send via composePhone().
    dialCc: "GB",
    company: "",
    building: "",
    level: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const scheduled = useRef(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // One Google Ads lead conversion per visitor, even if they go Back and
  // continue again (transaction_id also dedupes on Google's side).
  const googleLeadSent = useRef(false);
  const isIdea = stage === IDEA_STAGE;
  const freeEmail = emailOk(f.email) && isFreeEmail(f.email);

  // Lock scroll + escape to close + Schedule pixel from calendar postMessage.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Leadey's booking iframe posts {channel:"leadey:booking", event, ...}
    // for EVERYTHING, including size updates while it loads. Only a real
    // booking_scheduled from Leadey's origin counts as a Schedule.
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== LEADEY_ORIGIN) return;
      const data = e.data as
        | { channel?: string; event?: string; height?: number; url?: string }
        | undefined;
      if (!data || data.channel !== "leadey:booking") return;

      if (data.event === "resize" && data.height && frameRef.current) {
        frameRef.current.style.height = `${Math.max(520, data.height)}px`;
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
    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMsg);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMsg);
    };
  }, [onClose]);

  const pickStage = (v: string) => {
    setStage(v);
    setStep(2);
  };

  // Post the lead to Leadey. Fired once at the contact step (partial, so we
  // keep the contact even if they never finish) and again on the details step
  // with the same event_id + email, so Leadey updates the record instead of
  // creating a duplicate.
  const postLead = (partial: boolean) => {
    const summary = [
      `Stage: ${stage}`,
      f.level && `Level: ${f.level}`,
      f.building.trim() && `Building: ${f.building.trim()}`,
      isIdea && "Idea stage: nurture, no calendar shown",
    ]
      .filter(Boolean)
      .join("; ");
    return sendLead({
      name: f.name.trim(),
      email: f.email.trim(),
      email_type: isFreeEmail(f.email) ? "free" : "work",
      phone: composePhone(f.dialCc, f.phone),
      company: f.company.trim(),
      stage,
      build: f.building.trim(),
      seniority: f.level || undefined,
      nurture: isIdea || undefined,
      status: partial ? "partial" : "complete",
      captured_step: partial ? 2 : 3,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: `Landing page: ${summary}`,
      page: typeof location !== "undefined" ? location.href : "",
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
      hero_variant: variant,
      ...readAttribution(),
    });
  };

  const contactNext = () => {
    if (!f.name.trim()) return setError("Add your first name.");
    if (!emailOk(f.email)) return setError("Add a valid email.");
    if (f.phone.trim().length < 6) return setError("Add a phone number.");
    setError("");
    setAdvancedMatching({
      name: f.name,
      email: f.email,
      phone: composePhone(f.dialCc, f.phone),
    });
    track("Lead", { content_category: stage }, { eventID: eventId.current });
    if (!googleLeadSent.current) {
      googleLeadSent.current = true;
      trackGoogleAdsLead(eventId.current);
    }
    // Partial capture: send contact details now, before the details step.
    void postLead(true);
    setStep(3);
  };

  const submit = async () => {
    if (f.building.trim().length < 3)
      return setError("Tell us in a line what you're building.");
    setError("");
    setSubmitting(true);
    await postLead(false);
    track(
      "SubmitApplication",
      { content_category: stage },
      { eventID: "app_" + eventId.current },
    );
    setSubmitting(false);
    setStep(4);
  };

  const progress = step >= 3 ? 100 : (step / 3) * 100;
  const stepLabel =
    step <= 3 ? `Step ${step} of 3` : isIdea ? "Done" : "Last step";

  return (
    <div
      className="overlay-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-900/45 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-in my-auto w-full max-w-[460px] rounded-3xl bg-white p-6 shadow-cta sm:p-7">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-[11px] text-steel-600">{stepLabel}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-7 w-7 place-items-center rounded-full text-steel-600 transition hover:bg-[rgba(66,110,140,.08)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {step <= 3 && (
          <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[rgba(66,110,140,.12)]">
            <div
              className="h-full rounded-full bg-navy-900 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {step === 1 && (
          <Step title="Where's your product at?">
            <div className="grid grid-cols-2 gap-3">
              {STAGE_OPTIONS.map((o) => (
                <OptionButton key={o} onClick={() => pickStage(o)}>
                  {o}
                </OptionButton>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Where do we send your three profiles?">
            <div className="space-y-3">
              <Field
                label="First name"
                value={f.name}
                autoComplete="given-name"
                onChange={(v) => setF({ ...f, name: v })}
                autoFocus
              />
              <Field
                label="Work email"
                type="email"
                autoComplete="email"
                value={f.email}
                onChange={(v) => setF({ ...f, email: v })}
                hint={
                  freeEmail
                    ? "Got a company email? Shortlists go out faster to a work address."
                    : undefined
                }
              />
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-steel-700">
                  Mobile, so we can call you about the shortlist
                </span>
                <div className="flex gap-2">
                  <select
                    aria-label="Country dialling code"
                    value={f.dialCc}
                    onChange={(e) => setF({ ...f, dialCc: e.target.value })}
                    className="w-[132px] shrink-0 rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-2 py-3 text-[16px] text-navy-900 outline-none transition focus:border-sky-500 focus:bg-white focus:shadow-glow"
                  >
                    <optgroup label="Common">
                      {PRIORITY_ISO2.map((iso) => {
                        const c = DIAL_CODES.find((d) => d.iso2 === iso);
                        return c ? (
                          <option key={`pri-${c.iso2}`} value={c.iso2}>
                            {c.flag} {c.dial} {c.name}
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
                    className="w-full min-w-0 rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow"
                  />
                </div>
              </label>
            </div>
            {error && <ErrorLine>{error}</ErrorLine>}
            <PrimaryButton onClick={contactNext}>Get my 3 profiles</PrimaryButton>
            <FootRow
              onBack={() => setStep(1)}
              hint="Free. No placement fee."
            />
          </Step>
        )}

        {step === 3 && (
          <Step title="Last thing: what are we building?">
            <div className="space-y-3">
              <Field
                label="What are you building? (one line)"
                placeholder="e.g. a booking app for physio clinics"
                value={f.building}
                onChange={(v) => setF({ ...f, building: v })}
                autoFocus
              />
              <Field
                label="Company (optional)"
                autoComplete="organization"
                value={f.company}
                onChange={(v) => setF({ ...f, company: v })}
              />
              <div>
                <p className="mb-2 text-[13px] font-medium text-steel-700">
                  Level you need (optional)
                </p>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_OPTIONS.map((o) => {
                    const active = f.level === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setF({ ...f, level: active ? "" : o })}
                        className={
                          "rounded-full border px-3.5 py-2 text-[13px] font-medium transition " +
                          (active
                            ? "border-sky-500 bg-sky-500/10 text-navy-900 shadow-glow"
                            : "border-[var(--border-default)] bg-white text-steel-700 hover:border-sky-500")
                        }
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {error && <ErrorLine>{error}</ErrorLine>}
            <PrimaryButton onClick={submit} disabled={submitting}>
              {submitting
                ? "Sending…"
                : isIdea
                  ? "Send it over"
                  : "Next: pick a time"}
            </PrimaryButton>
            <FootRow
              onBack={() => setStep(2)}
              hint="We use this to pick the right three."
            />
          </Step>
        )}

        {step === 4 && isIdea && (
          <div>
            <DoneTick />
            <h3 className="font-display text-[26px] font-semibold leading-[1.12] text-navy-900">
              Thanks, {f.name.trim().split(/\s+/)[0] || "got it"}.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
              We&apos;ll email you how it works and what it costs at each level.
              When you&apos;re ready to start building, book a call and
              we&apos;ll have three profiles ready.
            </p>
            <a
              href={CALENDAR_URL.replace("?embed=1", "")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[14px] font-medium text-steel-600 underline underline-offset-4 transition hover:text-navy-900"
            >
              Ready now? Book a call
            </a>
          </div>
        )}

        {step === 4 && !isIdea && (
          <div>
            <DoneTick />
            <h3 className="font-display text-[26px] font-semibold leading-[1.12] text-navy-900">
              Last step: pick a time with Connor.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
              A quick call so the three profiles match what you&apos;re
              building, with exact pricing. They land in your inbox within 48
              hours.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
              <iframe
                ref={frameRef}
                src={CALENDAR_URL}
                title="Book a call with Connor"
                className="h-[520px] w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DoneTick() {
  return (
    <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-sky-500/15 text-steel-600">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-5 font-display text-[26px] font-semibold leading-[1.1] text-navy-900">
        {title}
      </h3>
      {children}
    </div>
  );
}

function OptionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-[var(--border-default)] bg-white px-4 py-5 text-left font-display text-[17px] font-medium text-navy-900 transition hover:border-sky-500 hover:bg-sky-500/5 hover:shadow-glow focus:outline-none focus-visible:border-sky-500"
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoFocus,
  autoComplete,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  /** Soft guidance under the input; never blocks submit. */
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-steel-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow"
      />
      {hint && (
        <span className="mt-1.5 block text-[12.5px] text-steel-600">{hint}</span>
      )}
    </label>
  );
}

function PrimaryButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-5 w-full rounded-2xl bg-navy-900 px-6 py-4 font-display text-[16px] font-medium text-white shadow-cta transition hover:bg-navy-800 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function FootRow({
  onBack,
  hint,
}: {
  onBack: () => void;
  hint?: string;
}) {
  return (
    <div className="mt-4 flex items-center justify-between text-[13px]">
      <button
        type="button"
        onClick={onBack}
        className="font-medium text-steel-700 transition hover:text-navy-900"
      >
        Back
      </button>
      {hint && <span className="text-[var(--text-faint)]">{hint}</span>}
    </div>
  );
}

function ErrorLine({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[13px] font-medium text-[#d93a3f]">{children}</p>;
}
