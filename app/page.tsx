import { CtaButton, FunnelProvider } from "@/components/Funnel";
import CostCalculator from "@/components/CostCalculator";
import StickyCta from "@/components/StickyCta";
import HowItWorks from "@/components/HowItWorks";
import { pickHero } from "@/lib/hero-variants";

// One job: book a 15-minute call. Order follows the 2026-10-23 structure:
// promise + price + the maths, buyer objections answered, proof, how it works,
// the form, three FAQs. Every claim is one this page already made and Dan
// signed off on 2026-09-24 (prices, engineers, testimonials, 14 days' notice,
// ISO 27001, Clutch), or is sourced in the calculator.

const CLUTCH_URL = "https://clutch.co/profile/octogle-technologies";
const ISO_URL =
  "https://www.iafcertsearch.org/certified-entity/YgnCzSQq4p76plJ5hUNVNd5C";

// Left column: fragments of public founder posts (voc.md), quoted exactly as written, about offshore and
// freelance dev, labelled as such on the page. Not our clients' words.
const OBJECTIONS = [
  {
    said: "entirely re-write a lot of their work",
    cost: "You pay for the build twice: once to write it, again to fix it.",
    answer: "Work happens in your repo,",
    detail: "where your team can see and review every change.",
  },
  {
    said: "herding cats 16 hours/day",
    cost: "You end up project-managing instead of running the business.",
    answer: "Managed in person",
    detail: "in our own office, every day. You set priorities, we handle the rest.",
  },
  {
    said: "exorbitant markup (~50% ...)",
    cost: "A chunk of every invoice never reaches the engineer.",
    answer: "One published monthly price.",
    detail: "No placement fee, no hidden extras.",
  },
  {
    said: "Nobody owns your delivery",
    cost: "When it breaks, everyone points at someone else.",
    answer: "One engineer, one client.",
    detail: "Full time on your product, not juggling five others.",
  },
  {
    said: "3-6 month contracts minimum",
    cost: "You're locked in long after you know it isn't working.",
    answer: "Rolling monthly,",
    detail: "14 days' notice. Your code and IP, confirmed in writing.",
  },
];

const ENGINEERS = [
  { photo: "/engineers/priya.jpg", name: "Priya", role: "Full-stack engineer · 7 years", stack: "TypeScript, React, Node.js, AWS" },
  { photo: "/engineers/rohit.jpg", name: "Rohit", role: "Backend engineer · 5 years", stack: "Python, Django, PostgreSQL, AWS" },
  { photo: "/engineers/prasanna.jpg", name: "Prasanna", role: "AI / ML engineer · 17 years", stack: "Python, LLMs, RAG, FastAPI" },
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


const FAQS = [
  {
    q: "Is this outsourcing?",
    a: "No. Your engineer joins your team, full time on your product, and takes direction from you. We handle employment and day-to-day management.",
  },
  {
    q: "Why is it cheaper than a UK hire?",
    a: "Our engineers work from our own office in India, and you pay no UK employer NI, pension or recruiter fee. The calculator above shows the maths.",
  },
  {
    q: "I'm not technical. Can I manage them?",
    a: "Yes. You set the priorities and we manage the engineer day to day. If the fit is wrong, we swap them at no fee.",
  },
];

const btn =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-7 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800";

function Tick() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-good">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.6rem,4vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-navy-900">
      {children}
    </h2>
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
      {/* Offer banner: price, speed, risk reversal and the action in one line. */}
      <div className="bg-navy-900 text-white">
        <div className="mx-auto flex max-w-content items-center justify-center gap-3 px-5 py-2.5 text-center sm:px-8">
          <p className="min-w-0 text-[13px] leading-snug sm:text-[14px]">
            <span className="mr-1.5 inline-flex items-center gap-1.5 rounded-full bg-good/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#7BE0B4]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7BE0B4]" />
              UK
            </span>
            Full-time engineers from <b className="font-semibold">£1,500/mo</b>
            <span className="hidden sm:inline"> · 3 profiles in 48 hours · No placement fee</span>
          </p>
        </div>
      </div>

      <header className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/octogle-logo.svg" alt="Octogle Hire" width={128} height={30} className="h-[28px] w-auto" />
      </header>

      <main className="overflow-x-hidden pb-24 md:pb-0">
        {/* 1. Hero: promise, price, the maths */}
        <section className="mx-auto grid max-w-content items-start gap-8 px-5 pb-14 pt-2 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:pt-8">
          <div>
            <p className="text-[14px] font-semibold text-steel-600">{hero.call}</p>
            <h1 className="mt-2 font-display text-[clamp(2rem,6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-navy-900">
              {hero.head}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-steel-700">{hero.sub}</p>

            <CtaButton className={btn + " mt-7 w-full md:w-auto"}>
              Get engineers now <span aria-hidden>→</span>
            </CtaButton>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-steel-700">
              {["No placement fee", "Profiles in 48 hours", "14 days' notice"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>

            <figure className="mt-8 flex items-start gap-3 border-l-2 border-sky-500/40 pl-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/proof/eduardo.jpg" alt="Eduardo Middleton" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />
              <div>
                <blockquote className="text-[14px] leading-snug text-navy-900">
                  &ldquo;Our initial budget for a developer in the UK was £75,000. OctogleHire placed an equally skilled engineer for £38,000.&rdquo;
                </blockquote>
                <figcaption className="mt-1 text-[12.5px] text-[var(--text-faint)]">
                  Eduardo Middleton, Founder, 1VA ·{" "}
                  <a href={CLUTCH_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-steel-700">
                    5.0 on Clutch, 12 reviews
                  </a>
                </figcaption>
              </div>
            </figure>
          </div>

          <CostCalculator />
        </section>

        {/* 2. The pain, in founders' own words, then the fix */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <p className="eyebrow text-[11px] font-medium text-[#c2414b]">Sound familiar?</p>
            <H2>Offshore and freelance dev usually goes wrong the same five ways.</H2>
            <p className="mt-2 text-[13px] text-[var(--text-faint)]">
              Quotes are from public posts by founders about offshore and freelance dev. Not our clients.
            </p>

            <div className="mt-8 space-y-3">
              {OBJECTIONS.map((o) => (
                <div
                  key={o.said}
                  className="grid overflow-hidden rounded-3xl border border-[var(--border-subtle)] md:grid-cols-[1.15fr_auto_1fr]"
                >
                  <div className="flex gap-3.5 bg-[#fdf2f3] p-5 sm:p-6">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c2414b] text-white" aria-hidden>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-display text-[clamp(1.15rem,2.6vw,1.45rem)] font-semibold leading-snug text-[#7f1d24]">
                        &ldquo;{o.said}&rdquo;
                      </p>
                      <p className="mt-1.5 text-[14.5px] leading-snug text-[#9b2c33]">{o.cost}</p>
                    </div>
                  </div>
                  <div className="hidden items-center bg-white px-3 text-steel-500 md:flex" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex gap-3.5 bg-white p-5 sm:p-6">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-good text-white" aria-hidden>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-[15.5px] leading-relaxed text-navy-900">
                      <b className="font-semibold">{o.answer}</b> {o.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <CtaButton className={btn + " w-full sm:w-auto"}>
                Get engineers now <span aria-hidden>→</span>
              </CtaButton>
              <p className="text-[14px] text-steel-600">Free to look. No placement fee.</p>
            </div>
          </div>
        </section>

        {/* 3. Proof where doubt peaks */}
        <section className="mx-auto max-w-content px-5 py-14 sm:px-8">
          <H2>Real engineers, real clients, a real office.</H2>

          {/* The people you'd actually get, big enough to see. */}
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {ENGINEERS.map((e) => (
              <div
                key={e.name}
                className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.photo}
                  alt={e.name}
                  width={800}
                  height={1071}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-[center_40%]"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-[18px] font-semibold text-navy-900">{e.name}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-good/10 px-2.5 py-1 text-[12px] font-medium text-good">
                      <span className="h-1.5 w-1.5 rounded-full bg-good" />
                      Available
                    </span>
                  </div>
                  <p className="mt-0.5 text-[14px] text-steel-600">{e.role}</p>
                  <p className="mt-3 text-[14px] text-navy-900">{e.stack}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-steel-600">
            Full time, one client at a time. Every engineer builds with Claude Code.
          </p>

          {/* Client voice beside the office: same height, no dead space. */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {QUOTES.slice(1).map((q) => (
              <figure
                key={q.name}
                className="flex flex-col justify-between rounded-3xl bg-navy-900 p-6 text-white sm:p-8"
              >
                <blockquote className="font-display text-[clamp(1.15rem,2.4vw,1.4rem)] font-medium leading-snug">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.photo} alt={q.name} width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="text-[15px] font-semibold">{q.name}</p>
                    <p className="text-[13px] text-[#B7D2E1]">{q.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}

            <figure className="relative min-h-[260px] overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/office/floor.jpg"
                alt="The Octogle engineering office in India"
                width={768}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_60%]"
              />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 px-4 py-3 text-[14px] text-navy-900 shadow-card backdrop-blur">
                <b className="font-semibold">Our own office in India.</b> Managed in person, every day.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. How it works (animated) */}
        <section className="mx-auto max-w-content px-5 pb-16 sm:px-8">
          <H2>How it works</H2>
          <HowItWorks />
        </section>

        {/* 5. Final CTA */}
        <section id="final" className="mx-auto max-w-content px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-navy-900 text-white">
            <div className="px-6 py-10 sm:px-10 sm:py-14">
              <h2 className="font-display text-[clamp(1.7rem,4.5vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.015em]">
                See three engineers within 48 hours.
              </h2>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[#B7D2E1]">
                15 minutes with Connor. Free to look, no placement fee, rolling
                monthly with 14 days&apos; notice.
              </p>
              <CtaButton className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-display text-[17px] font-medium text-navy-900 shadow-cta transition hover:bg-ice-100 sm:w-auto">
                Get engineers now <span aria-hidden>→</span>
              </CtaButton>
              <p className="mt-5 text-[14px] text-[#B7D2E1]">
                Need SDRs instead? Dedicated SDRs from £1,900 a month. Ask on the call.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Short FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-12">
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-medium text-navy-900">
                  {f.q}
                  <span className="text-steel-500 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-5 pb-10 text-center text-[12.5px] leading-relaxed text-[var(--text-faint)]">
        Octogle Hire · Office 2020, Parklane Tower, Business Bay, Dubai ·{" "}
        <a href={ISO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          ISO 27001 certified
        </a>{" "}
        · Looking for a job?{" "}
        <a href="https://www.octoglehire.com/apply" className="underline underline-offset-2">
          Apply here
        </a>
      </footer>

      <StickyCta />
    </FunnelProvider>
  );
}
