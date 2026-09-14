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

const WEBHOOK_URL =
  "https://backend.leadey.ai/webhooks/funnels/funnel_mtukds7fvcp7yz/leads?token=whk_mtukds7l2028s9";
const CALENDAR_URL =
  "https://app.leadey.ai/book/octogle-hire-connor-lp-mcjcg2?embed=1";
const LOCATION_TAG = "landing page -dan";

type Fbq = (...args: unknown[]) => void;
function track(event: string, params?: object, opts?: object) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params || {}, opts || {});
}

const BUILD_OPTIONS = ["SaaS", "Website", "Ecom store", "App"];
const STAGE_OPTIONS = [
  "Not started",
  "Starting soon",
  "Mid way through",
  "Nearly finished",
];

type Ctx = { open: () => void };
const FunnelCtx = createContext<Ctx | null>(null);

export function useFunnel() {
  const ctx = useContext(FunnelCtx);
  if (!ctx) throw new Error("useFunnel must be used within FunnelProvider");
  return ctx;
}

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    track("InitiateCheckout", {}, { eventID: "ic_" + Date.now() });
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <FunnelCtx.Provider value={value}>
      {children}
      {isOpen && <QuizModal onClose={() => setIsOpen(false)} />}
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
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [build, setBuild] = useState("");
  const [stage, setStage] = useState("");
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const eventId = useRef("lead_" + crypto.randomUUID());
  const scheduled = useRef(false);

  // Lock scroll + escape to close + Schedule pixel from calendar postMessage.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onMsg = (e: MessageEvent) => {
      let d = "";
      try {
        d = typeof e.data === "string" ? e.data : JSON.stringify(e.data || {});
      } catch {
        d = "";
      }
      if (/book|confirm|schedul/i.test(d) && !scheduled.current) {
        scheduled.current = true;
        track("Schedule", {}, { eventID: "sched_" + eventId.current });
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

  const pickBuild = (v: string) => {
    setBuild(v);
    setStep(2);
  };
  const pickStage = (v: string) => {
    setStage(v);
    setStep(3);
  };

  const contactNext = () => {
    if (!f.name.trim()) return setError("Add your name.");
    if (!emailOk(f.email)) return setError("Add a valid work email.");
    if (f.phone.trim().length < 6) return setError("Add a phone number.");
    setError("");
    track(
      "Lead",
      { content_category: build, content_name: stage },
      { eventID: eventId.current },
    );
    setStep(4);
  };

  const submit = async () => {
    if (!f.company.trim()) return setError("Add your company.");
    setError("");
    setSubmitting(true);
    const lead = {
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      company: f.company.trim(),
      website: f.website.trim(),
      build,
      stage,
      location: LOCATION_TAG,
      source: LOCATION_TAG,
      note: LOCATION_TAG,
      page: typeof location !== "undefined" ? location.href : "",
      submitted_at: new Date().toISOString(),
      event_id: eventId.current,
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(lead),
      });
    } catch {
      /* opaque no-cors response still delivers the payload */
    }
    track(
      "SubmitApplication",
      { content_category: build, content_name: stage },
      { eventID: "app_" + eventId.current },
    );
    setSubmitting(false);
    setStep(5);
  };

  const progress = step >= 5 ? 100 : (step / 4) * 100;

  return (
    <div
      className="overlay-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-900/45 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-in my-auto w-full max-w-[460px] rounded-3xl bg-white p-6 shadow-cta sm:p-7">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-[11px] text-steel-600">
            {step >= 5 ? "Done" : `Step ${step} of 4`}
          </span>
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

        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[rgba(66,110,140,.12)]">
          <div
            className="h-full rounded-full bg-navy-900 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {step === 1 && (
          <Step title="What are you building?">
            <div className="grid grid-cols-2 gap-3">
              {BUILD_OPTIONS.map((o) => (
                <OptionButton key={o} onClick={() => pickBuild(o)}>
                  {o}
                </OptionButton>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="How far through the build are you?">
            <div className="grid grid-cols-2 gap-3">
              {STAGE_OPTIONS.map((o) => (
                <OptionButton key={o} onClick={() => pickStage(o)}>
                  {o}
                </OptionButton>
              ))}
            </div>
            <FootRow onBack={() => setStep(1)} />
          </Step>
        )}

        {step === 3 && (
          <Step title="Where do we send the three profiles?">
            <div className="space-y-3">
              <Field
                label="Name"
                value={f.name}
                onChange={(v) => setF({ ...f, name: v })}
                autoFocus
              />
              <Field
                label="Work email"
                type="email"
                value={f.email}
                onChange={(v) => setF({ ...f, email: v })}
              />
              <Field
                label="Phone"
                type="tel"
                value={f.phone}
                onChange={(v) => setF({ ...f, phone: v })}
              />
            </div>
            {error && <ErrorLine>{error}</ErrorLine>}
            <PrimaryButton onClick={contactNext}>Continue</PrimaryButton>
            <FootRow onBack={() => setStep(2)} hint="One more step." />
          </Step>
        )}

        {step === 4 && (
          <Step title="And the company we're building for?">
            <div className="space-y-3">
              <Field
                label="Company"
                value={f.company}
                onChange={(v) => setF({ ...f, company: v })}
                autoFocus
              />
              <Field
                label="Website (optional)"
                type="url"
                placeholder="https://"
                value={f.website}
                onChange={(v) => setF({ ...f, website: v })}
              />
            </div>
            {error && <ErrorLine>{error}</ErrorLine>}
            <PrimaryButton onClick={submit} disabled={submitting}>
              {submitting ? "Sending…" : "Send me the three profiles"}
            </PrimaryButton>
            <FootRow
              onBack={() => setStep(3)}
              hint="No placement fee. No commitment to hire."
            />
          </Step>
        )}

        {step === 5 && (
          <div>
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
            <h3 className="font-display text-[26px] font-semibold leading-[1.12] text-navy-900">
              Got it. Profiles are on their way within 48 hours.
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
              Want to skip the wait? Book 15 minutes with Connor and we&apos;ll
              walk through the three engineers together.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
              <iframe
                src={CALENDAR_URL}
                title="Book a call with Connor"
                className="h-[520px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--border-default)] bg-ice-100/40 px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-[var(--text-faint)] focus:border-sky-500 focus:bg-white focus:shadow-glow"
      />
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
