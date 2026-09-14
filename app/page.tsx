import Image from "next/image";
import { FunnelProvider, CtaButton } from "@/components/Funnel";
import Faq from "@/components/Faq";
import StickyCta from "@/components/StickyCta";
import before from "@/public/before.jpg";
import after from "@/public/after.jpg";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-3 text-[12px] font-medium text-steel-500">
      {children}
    </p>
  );
}

function Check() {
  return (
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-sky-500/15 text-steel-600">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Page() {
  return (
    <FunnelProvider>
      {/* Header */}
      <header className="mx-auto flex max-w-content items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/octogle-logo.svg"
            alt="Octogle Hire"
            width={128}
            height={30}
            className="h-[30px] w-auto"
          />
        </div>
      </header>

      <main className="overflow-x-hidden pb-28 lg:pb-0">
        {/* Hero */}
        <section className="mx-auto max-w-content px-5 pt-6 sm:px-8 sm:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-white/70 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-[14px] font-medium text-steel-700">
              For founders building their own software
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,8vw,5.1rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy-900">
            One UK senior dev is{" "}
            <span className="strike">£99,768</span> a year.
            <br />
            <span className="headline-gradient">
              Ours start at £1,500 a month.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2.4vw,1.35rem)] leading-relaxed text-steel-700">
            Same work. Your product, your repo, your ownership. An embedded
            engineer inside your team, not a project you hand off.
          </p>

          {/* Compare cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card sm:p-7">
              <p className="text-[14px] font-medium text-steel-600">
                Local UK senior, fully loaded
              </p>
              <p className="mt-3 font-display text-[40px] font-semibold leading-none text-navy-900">
                £8,314
                <span className="text-[20px] font-medium text-steel-600">
                  /mo
                </span>
              </p>
              <p className="mt-2 text-[14px] text-[var(--text-faint)]">
                £99,768 a year
              </p>
            </div>
            <div className="relative rounded-3xl border border-sky-500/45 bg-white p-6 shadow-glow sm:p-7">
              <p className="text-[14px] font-medium text-steel-600">
                Octogle engineer, embedded
              </p>
              <p className="mt-3 font-display text-[40px] font-semibold leading-none text-navy-900">
                £1,500
                <span className="text-[20px] font-medium text-steel-600">
                  /mo
                </span>
              </p>
              <p className="mt-2 text-[14px] text-[var(--text-faint)]">
                from £18,000 a year
              </p>
            </div>
          </div>

          <p className="mt-6 text-[15px] font-medium text-steel-700">
            Save up to{" "}
            <span className="text-navy-900">£81,768 a year</span>. No placement
            fee.
          </p>

          <div className="mt-6">
            <CtaButton className="inline-flex items-center gap-3 rounded-2xl bg-navy-900 px-8 py-4 font-display text-[17px] font-medium text-white shadow-cta transition hover:bg-navy-800">
              See 3 engineers we&apos;d put on it{" "}
              <span aria-hidden>→</span>
            </CtaButton>
            <p className="mt-3 text-[14px] text-[var(--text-faint)]">
              Profiles in 48 hours. No commitment to view them.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["48h profiles", "No placement fee", "One client at a time"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--border-subtle)] bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-steel-700"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </section>

        {/* The two ways this goes */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>The two ways this goes</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            You can keep building it yourself. Or you can ship it.
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* BEFORE */}
            <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={before}
                  alt="A founder coding alone late at night"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                  placeholder="blur"
                />
                <span className="eyebrow absolute left-4 top-4 rounded-full bg-navy-900/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                  Before
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-[20px] font-semibold text-navy-900">
                  You, at 1am, prompting Claude Code.
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
                  Every bug is yours. Every deploy is yours. The roadmap waits
                  while you debug. Customers wait while you build.
                </p>
                <ul className="mt-4 space-y-2 text-[14px] text-steel-700">
                  {[
                    "One person",
                    "Nights and weekends",
                    "Nothing ships while you sell",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AFTER */}
            <div className="overflow-hidden rounded-3xl border border-sky-500/40 bg-white shadow-glow">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={after}
                  alt="A founder running the business while an engineer ships"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                  placeholder="blur"
                />
                <span className="eyebrow absolute left-4 top-4 rounded-full bg-sky-500/90 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                  After
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-[20px] font-semibold text-navy-900">
                  You, running the business. An engineer shipping it.
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
                  A senior developer embedded in your team from week one, on
                  your standups, in your repo. You scale the SaaS. They build
                  it.
                </p>
                <ul className="mt-4 space-y-2 text-[14px] text-steel-700">
                  {[
                    "From £1,500 a month",
                    "Profiles in 48 hours",
                    "Your repo, your ownership",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Not a marketplace */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Before you assume the catch</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            It&apos;s not a marketplace, and it&apos;s not a gamble.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-steel-700">
            This is one engineer from our own office, working inside your
            company, on your standups, on one client at a time.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "They work from our office, every day",
                b: "Not a freelancer juggling five clients. Full time, your product, your hours.",
              },
              {
                t: "Your repo, your ownership",
                b: 'Everything they build is yours. No handover, no lock-in, no "then they were gone".',
              },
              {
                t: "On your standups, in your timezone",
                b: "Embedded in your team, not emailing a spec across the world and hoping.",
              },
              {
                t: "Not right? Swap them, no fee",
                b: "You see three profiles first. You decide. Nothing to lose by looking.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="flex gap-4 rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card"
              >
                <Check />
                <div>
                  <h3 className="font-display text-[18px] font-semibold text-navy-900">
                    {c.t}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-steel-700">
                    {c.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            From &ldquo;still building it&rdquo; to shipping.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Tell us the role",
                b: "What you're building and what's left to ship. Two minutes.",
              },
              {
                n: "02",
                t: "Get three profiles in 48 hours",
                b: "Real engineers we'd put on it. You look, no commitment, no fee.",
              },
              {
                n: "03",
                t: "Pick one, they start",
                b: "Embedded in your team from week one. You go and run the business.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card sm:p-7"
              >
                <span className="font-mono text-[15px] font-medium text-sky-600">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-[19px] font-semibold text-navy-900">
                  {s.t}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-default)] bg-navy-900 px-6 py-14 text-center sm:px-10 sm:py-20">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
              Send us what you&apos;re building.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-[#B7D2E1]">
              We&apos;ll show you three people we&apos;d put on it, in 48 hours.
              No placement fee, no commitment to hire.
            </p>
            <div className="mt-8">
              <CtaButton className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-display text-[17px] font-medium text-navy-900 shadow-cta transition hover:bg-ice-100">
                Get started <span aria-hidden>→</span>
              </CtaButton>
              <p className="mt-3 text-[14px] text-[#7F9BB4]">
                Takes two minutes. Profiles back within 48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Straight answers</Eyebrow>
          <h2 className="mb-8 max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            The questions everyone asks first.
          </h2>
          <Faq />
        </section>
      </main>

      <footer className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <p className="text-[14px] text-[var(--text-faint)]">
          Octogle Hire · Embedded engineers from £1,500 a month · UK
        </p>
      </footer>

      <StickyCta />
    </FunnelProvider>
  );
}
