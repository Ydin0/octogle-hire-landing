import { FunnelProvider, CtaButton, InlineStart } from "@/components/Funnel";
import Faq from "@/components/Faq";
import StickyCta from "@/components/StickyCta";
import { pickHero } from "@/lib/hero-variants";

// One job: get a UK founder to tap a stage, leave contact details and book.
// Everything on the page either answers "who would I get, what does it cost,
// can I trust you" or it isn't here. Every claim was already on this page and
// signed off by Dan on 2026-09-24 (prices, engineers, testimonials, notice).

const CLUTCH_URL = "https://clutch.co/profile/octogle-technologies";
const ISO_URL =
  "https://www.iafcertsearch.org/certified-entity/YgnCzSQq4p76plJ5hUNVNd5C";

const ENGINEERS = [
  {
    photo: "/engineers/priya.jpg",
    name: "Priya",
    role: "Full-stack",
    years: "7 yrs",
    stack: "TypeScript · React · Node.js",
  },
  {
    photo: "/engineers/rohit.jpg",
    name: "Rohit",
    role: "Backend",
    years: "5 yrs",
    stack: "Python · Django · AWS",
  },
  {
    photo: "/engineers/prasanna.jpg",
    name: "Prasanna",
    role: "AI / ML",
    years: "17 yrs",
    stack: "Python · LLMs · RAG",
  },
];

const TIERS = [
  { level: "Junior", note: "1–3 years", price: "£1,500", uk: "£3,000" },
  { level: "Mid-level", note: "3–6 years", price: "£2,500", uk: "£5,000" },
  { level: "Senior", note: "6+ years", price: "£4,500", uk: "£8,500+" },
];

const QUOTES = [
  {
    quote:
      "Our initial budget for a developer in the UK was £75,000. OctogleHire placed an equally skilled engineer for £38,000, without compromising on quality.",
    name: "Eduardo Middleton",
    role: "Founder, 1VA",
    photo: "/proof/eduardo.jpg",
  },
  {
    quote:
      "We were about to commit to three senior frontend engineers at London rates. OctogleHire matched us with equally talented engineers in under a week.",
    name: "Ricardo Machado",
    role: "CEO, Beekey",
    photo: "/proof/ricardo.jpg",
  },
];

const STEPS = [
  { when: "Today", what: "Tell us what you're building. Two minutes." },
  { when: "Within 48 hours", what: "Three engineer profiles in your inbox." },
  { when: "The week after", what: "Your pick starts in your repo and standups." },
];

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={"shrink-0 " + className}
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#FFB547]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="eyebrow text-[11px] font-medium text-steel-500">{kicker}</p>
      <h2 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-navy-900">
        {title}
      </h2>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const hero = pickHero(await searchParams);

  return (
    <FunnelProvider variant={hero.key}>
      <main className="overflow-x-hidden pb-28 lg:pb-0">
        {/* Hero: dark, one promise, one tap. */}
        <section className="relative bg-navy-900 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(70% 60% at 85% 0%, rgba(102,184,214,.28) 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-content gap-8 px-5 pb-10 pt-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-8">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/octogle-logo.svg"
                alt="Octogle Hire"
                width={128}
                height={30}
                className="h-[26px] w-auto brightness-0 invert"
              />
              <h1 className="mt-8 font-display text-[clamp(2.1rem,7vw,3.9rem)] font-semibold leading-[1.03] tracking-[-0.025em] lg:mt-14">
                {hero.lead}{" "}
                <span className="text-sky-400">{hero.punch}</span>
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#B7D2E1]">
                {hero.sub}
              </p>
              <ul className="mt-5 hidden flex-wrap gap-x-5 gap-y-2 text-[14px] text-white/85 lg:flex">
                {["Profiles in 48 hours", "No placement fee", "14 days' notice"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Tick className="text-sky-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="start"
              className="rounded-3xl bg-white p-5 text-navy-900 shadow-cta sm:p-6"
            >
              <InlineStart />
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-steel-700">
                {["Free", "No placement fee", "No commitment"].map((t) => (
                  <li key={t} className="flex items-center gap-1">
                    <Tick className="text-good" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/80 lg:col-span-2">
              <a
                href={CLUTCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Stars />
                <span className="font-semibold text-white">5.0</span> on Clutch
                <span className="text-white/50">· 12 reviews</span>
              </a>
              <a
                href={ISO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <Tick className="text-sky-400" />
                ISO 27001 certified
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          {/* Who you'd get */}
          <section className="mt-14">
            <SectionTitle kicker="Who you'd get" title="Real engineers, available now." />
            <div className="divide-y divide-[var(--border-subtle)] overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
              {ENGINEERS.map((e) => (
                <div key={e.name} className="flex items-center gap-4 p-4 sm:p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.photo}
                    alt={e.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-2xl object-cover object-[center_35%]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[16px] font-semibold text-navy-900">
                      {e.name}{" "}
                      <span className="font-normal text-steel-600">
                        · {e.role}, {e.years}
                      </span>
                    </p>
                    <p className="mt-0.5 truncate text-[14px] text-steel-700">
                      {e.stack}
                    </p>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-good/10 px-2.5 py-1 text-[12px] font-medium text-good sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-good" />
                    Available
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-steel-600">
              Full time, one client at a time, from our own office in India.
              Every engineer builds with Claude Code.
            </p>
          </section>

          {/* What it costs */}
          <section className="mt-14">
            <SectionTitle kicker="What it costs" title="One monthly price. No placement fee." />
            <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
              {TIERS.map((t, i) => (
                <div
                  key={t.level}
                  className={
                    "flex items-center justify-between gap-4 p-4 sm:p-5 " +
                    (i > 0 ? "border-t border-[var(--border-subtle)]" : "")
                  }
                >
                  <div>
                    <p className="font-display text-[16px] font-semibold text-navy-900">
                      {t.level}
                    </p>
                    <p className="text-[13px] text-steel-600">{t.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-[24px] font-semibold leading-none text-navy-900">
                      {t.price}
                      <span className="text-[14px] font-medium text-steel-600">/mo</span>
                    </p>
                    <p className="mt-1 text-[12px] text-[var(--text-faint)]">
                      UK hire <span className="line-through">{t.uk}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-steel-600">
              Rolling monthly, 14 days&apos; notice. The code is yours, in your
              repo. Not right? We swap them, no fee.
            </p>
          </section>

          {/* Proof */}
          <section className="mt-14">
            <SectionTitle kicker="What clients say" title="Founders who stopped building it alone." />
            <div className="grid gap-4 sm:grid-cols-2">
              {QUOTES.map((q) => (
                <figure
                  key={q.name}
                  className="flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card"
                >
                  <Stars />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-900">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.photo}
                      alt={q.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-navy-900">{q.name}</p>
                      <p className="text-[13px] text-[var(--text-faint)]">{q.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-14">
            <SectionTitle kicker="How it works" title="Shipping in a week, not a quarter." />
            <ol className="relative space-y-5 border-l-2 border-sky-500/30 pl-6">
              {STEPS.map((s) => (
                <li key={s.when} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-sky-500 ring-4 ring-ice-100" />
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-steel-500">
                    {s.when}
                  </p>
                  <p className="mt-0.5 text-[17px] font-medium text-navy-900">{s.what}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Final CTA */}
          <section className="mt-16 rounded-3xl bg-navy-900 px-6 py-10 text-center text-white sm:px-10">
            <h2 className="font-display text-[clamp(1.6rem,4.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em]">
              See who we&apos;d put on your build.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-[#B7D2E1]">
              Three profiles in 48 hours. Free to look, no placement fee.
            </p>
            <CtaButton className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-display text-[16px] font-medium text-navy-900 shadow-cta transition hover:bg-ice-100">
              Get 3 engineer profiles <span aria-hidden>→</span>
            </CtaButton>
          </section>

          {/* FAQ */}
          <section className="mt-14">
            <SectionTitle kicker="Straight answers" title="Questions people ask first." />
            <Faq />
          </section>

          <footer className="py-10 text-[13px] text-[var(--text-faint)]">
            Octogle Hire · Engineers from £1,500 a month ·{" "}
            Looking for a job?{" "}
            <a
              href="https://www.octoglehire.com/apply"
              className="underline underline-offset-4 hover:text-steel-700"
            >
              Apply here
            </a>
          </footer>
        </div>
      </main>

      <StickyCta />
    </FunnelProvider>
  );
}
