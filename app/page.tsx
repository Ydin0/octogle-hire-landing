import { BookForm } from "@/components/Funnel";
import CostCalculator from "@/components/CostCalculator";
import StickyCta from "@/components/StickyCta";
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
    answer: "Work happens in your repo,",
    detail: "where your team can see and review every change.",
  },
  {
    said: "herding cats 16 hours/day",
    answer: "Managed in person",
    detail: "in our own office, every day. You set priorities, we handle the rest.",
  },
  {
    said: "exorbitant markup (~50% ...)",
    answer: "One published monthly price.",
    detail: "No placement fee, no hidden extras.",
  },
  {
    said: "Nobody owns your delivery",
    answer: "One engineer, one client.",
    detail: "Full time on your product, not juggling five others.",
  },
  {
    said: "3-6 month contracts minimum",
    answer: "Rolling monthly,",
    detail: "14 days' notice. Your code and IP, confirmed in writing.",
  },
];

const ENGINEERS = [
  { photo: "/engineers/priya.jpg", name: "Priya", role: "Full-stack · 7 yrs", stack: "TypeScript, React, Node.js, AWS" },
  { photo: "/engineers/rohit.jpg", name: "Rohit", role: "Backend · 5 yrs", stack: "Python, Django, PostgreSQL, AWS" },
  { photo: "/engineers/prasanna.jpg", name: "Prasanna", role: "AI / ML · 17 yrs", stack: "Python, LLMs, RAG, FastAPI" },
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
  "15-minute call: your stack, the level you need, your start date.",
  "Three real profiles within 48 hours. Interview who you like.",
  "They join your repo and standups. One monthly invoice.",
];

const FAQS = [
  {
    q: "Is this outsourcing?",
    a: "No. Your engineer joins your team, full time on your product, and takes direction from you. We handle employment and day-to-day management.",
  },
  {
    q: "Why is it cheaper than a UK hire?",
    a: "Our engineers work from our own office in India, and you pay no UK employer NI, pension or recruiter fee. The calculator at the top shows the maths.",
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
    <>
      <header className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/octogle-logo.svg" alt="Octogle Hire" width={128} height={30} className="h-[28px] w-auto" />
        <a href="#book" className="hidden rounded-xl bg-navy-900 px-4 py-2.5 text-[14px] font-medium text-white md:inline-block">
          Book a call
        </a>
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

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-steel-600">
              <span className="rounded-full border border-[var(--border-default)] bg-white px-3 py-1 font-semibold text-navy-900">
                From £1,500/mo
              </span>
              Junior £1,500 · Mid £2,500 · Senior £4,500
            </p>

            <a href="#book" className={btn + " mt-6 w-full md:w-auto"}>
              Book a 15-minute call <span aria-hidden>→</span>
            </a>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-steel-700">
              {["No placement fee", "See 3 profiles first", "Free swap", "14 days' notice"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>

            <figure className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white/70 p-4">
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

        {/* 2. Objections in buyer words */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <H2>What founders say goes wrong, and what we do instead.</H2>
            <p className="mt-2 text-[13px] text-[var(--text-faint)]">
              Quotes are from public posts by founders about offshore and freelance dev. Not our clients.
            </p>
            <div className="mt-7 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-3xl border border-[var(--border-subtle)]">
              {OBJECTIONS.map((o) => (
                <div key={o.said} className="grid gap-1.5 p-5 md:grid-cols-2 md:gap-6">
                  <p className="text-[15px] italic text-steel-600">&ldquo;{o.said}&rdquo;</p>
                  <p className="text-[15px] text-navy-900">
                    <b className="font-semibold">{o.answer}</b> {o.detail}
                  </p>
                </div>
              ))}
            </div>
            <a href="#book" className={btn + " mt-7 w-full md:w-auto"}>
              See three engineers in 48 hours <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* 3. Proof where doubt peaks */}
        <section className="mx-auto max-w-content px-5 py-14 sm:px-8">
          <H2>Real engineers, real clients, a real office.</H2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="divide-y divide-[var(--border-subtle)] rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
              {ENGINEERS.map((e) => (
                <div key={e.name} className="flex items-center gap-3 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.photo} alt={e.name} width={52} height={52} loading="lazy" className="h-[52px] w-[52px] shrink-0 rounded-2xl object-cover object-[center_35%]" />
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold text-navy-900">
                      {e.name} <span className="font-normal text-steel-600">· {e.role}</span>
                    </p>
                    <p className="truncate text-[13px] text-steel-700">{e.stack}</p>
                  </div>
                </div>
              ))}
              <p className="p-4 text-[13px] text-steel-600">
                Full time, one client at a time. Every engineer builds with Claude Code.
              </p>
            </div>

            {QUOTES.slice(1).map((q) => (
              <figure key={q.name} className="flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-navy-900">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.photo} alt={q.name} width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-[14px] font-semibold text-navy-900">{q.name}</p>
                    <p className="text-[13px] text-[var(--text-faint)]">{q.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}

            <figure className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/office/floor.jpg" alt="The Octogle engineering office in India" width={768} height={1024} loading="lazy" className="h-56 w-full object-cover md:h-[calc(100%-56px)]" />
              <figcaption className="p-4 text-[13px] text-steel-600">
                Our own engineering office in India. Managed in person, every day.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. How it works */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <H2>How it works</H2>
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-4 text-[15px] text-navy-900">
                <span className="font-display font-semibold text-sky-600">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </section>

        {/* 5. The form */}
        <section id="book" className="scroll-mt-4 bg-navy-900 py-14 text-white">
          <div className="mx-auto max-w-xl px-5">
            <h2 className="font-display text-[clamp(1.6rem,4.5vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.015em]">
              Book a call. See three engineers within 48 hours.
            </h2>
            <div className="mt-6">
              <BookForm variant={hero.key} />
            </div>
            <p className="mt-5 text-[14px] text-[#B7D2E1]">
              Need SDRs instead? Dedicated SDRs from £1,900 a month. Ask on the call.
            </p>
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
    </>
  );
}
