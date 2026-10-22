import { FunnelProvider, CtaButton, InlineStart } from "@/components/Funnel";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Engineers from "@/components/Engineers";
import Pricing from "@/components/Pricing";
import { TrustBadges, LogoStrip } from "@/components/Proof";
import StickyCta from "@/components/StickyCta";
import { pickHero } from "@/lib/hero-variants";

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

// What changes when the build changes. Every Octogle claim here is one the
// page already makes (pricing, risk reversal, FAQ), so nothing new is asserted.
const AGENCY_VS_US: { row: string; agency: string; us: string }[] = [
  {
    row: "Cost",
    agency: "A fixed quote, often six figures, much of it up front",
    us: "From £1,500 a month",
  },
  {
    row: "When scope changes",
    agency: "A new quote and a new invoice",
    us: "It's just the next task",
  },
  {
    row: "When the build's done",
    agency: "They hand over the repo and leave",
    us: "They stay on your roadmap, or you stop with 14 days' notice",
  },
  {
    row: "Who owns the code",
    agency: "Check the contract",
    us: "You do, in your repo, from day one",
  },
  {
    row: "Placement fee",
    agency: "n/a",
    us: "None",
  },
];

const NOT_FOR_YOU = [
  {
    t: "You want a fixed-price build from a single quote.",
    b: "We put an engineer in your team. An agency is the better fit for a one-off handover.",
  },
  {
    t: "It's still an idea you aren't ready to start on.",
    b: "Come back when you are. Tap \u201cJust an idea\u201d above and we'll send you how it works.",
  },
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const hero = pickHero(await searchParams);

  return (
    <FunnelProvider variant={hero.key}>
      {/* Header */}
      <header className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
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
        {/* Hero: headline, the first question and third-party proof all on
            the first mobile screen. Detail moves below. */}
        <section className="mx-auto max-w-content px-5 pt-2 sm:px-8 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-white/70 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-[14px] font-medium text-steel-700">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.3rem,7.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy-900">
            {hero.lead}{" "}
            <span className="headline-gradient">{hero.punch}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-[clamp(1.02rem,2.3vw,1.3rem)] leading-relaxed text-steel-700">
            {hero.sub}
          </p>

          {/* Embedded first question: one tap starts the funnel */}
          <div
            id="start"
            className="mt-6 rounded-3xl border border-[var(--border-default)] bg-ice-100/50 p-5 shadow-card sm:p-6"
          >
            <InlineStart />
            <p className="mt-4 text-[14px] text-[var(--text-faint)]">
              One tap to start. Free, no placement fee, no commitment to view
              the profiles. Not right? We swap them.
            </p>
          </div>

          <div className="mt-5">
            <TrustBadges />
          </div>
        </section>

        {/* Client logos */}
        <section className="mx-auto mt-14 max-w-content px-5 sm:px-8">
          <LogoStrip />
        </section>

        {/* What happens next: the Timeliner ad, as a page */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>What happens after you tap</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            From &ldquo;still building it&rdquo; to shipping, in a week.
          </h2>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                d: "Monday",
                t: "Tell us what you're building",
                b: "Where it's at and what's left to ship. Two minutes, right here.",
              },
              {
                d: "Wednesday",
                t: "Three engineer profiles in your inbox",
                b: "Each with their stack and what they've shipped. You look, no commitment, no fee.",
              },
              {
                d: "The week after",
                t: "Your engineer starts",
                b: "In your repo, at your standups, shipping. You go and run the business.",
              },
            ].map((s, i) => (
              <li
                key={s.d}
                className="relative rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card sm:p-7"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-steel-600">
                  <span className="text-sky-600">0{i + 1}</span> {s.d}
                </span>
                <h3 className="mt-4 font-display text-[19px] font-semibold text-navy-900">
                  {s.t}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* The engineers */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Who you&apos;d get</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            Real engineers. You see them before you commit.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-steel-700">
            Full time, from our own office, on one client at a time. Every
            engineer is a graduate of one of India&apos;s top tech universities
            and builds with Claude Code. Here are a few of the team right now.
          </p>
          <Engineers />
        </section>

        {/* Agency quote vs your own engineer */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Agency quote vs your own engineer</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            Your product will change while you build it.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-steel-700">
            That&apos;s normal. You shouldn&apos;t pay a penalty every time it
            does.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
            <div className="grid grid-cols-2 border-b border-[var(--border-subtle)] bg-ice-100/60 sm:grid-cols-[180px_1fr_1fr]">
              <span className="hidden sm:block" />
              <p className="px-4 py-4 text-[13px] font-semibold text-steel-600 sm:px-6">
                Agency build
              </p>
              <p className="bg-navy-900 px-4 py-4 text-[13px] font-semibold text-white sm:px-6">
                Octogle Hire engineer
              </p>
            </div>
            {AGENCY_VS_US.map((r) => (
              <div
                key={r.row}
                className="grid grid-cols-2 border-b border-[var(--border-subtle)] last:border-b-0 sm:grid-cols-[180px_1fr_1fr]"
              >
                <p className="col-span-2 px-4 pt-4 font-display text-[14px] font-semibold text-navy-900 sm:col-span-1 sm:px-6 sm:py-5">
                  {r.row}
                </p>
                <p className="px-4 pb-4 pt-1.5 text-[14px] leading-snug text-steel-600 sm:px-6 sm:py-5">
                  {r.agency}
                </p>
                <p className="bg-sky-500/[0.07] px-4 pb-4 pt-1.5 text-[14px] font-medium leading-snug text-navy-900 sm:px-6 sm:py-5">
                  {r.us}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Client proof */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>What clients say</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            Founders who stopped building it alone.
          </h2>
          <Testimonials />
          <div className="mt-6">
            <TrustBadges />
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>What it costs</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            One monthly price. No placement fee.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-steel-700">
            Pick the level you need. Same engineer, full time, for a fraction of
            what the same level costs to hire in the UK.
          </p>
          <Pricing />
        </section>

        {/* The company */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            A real company, with a real office.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-steel-700">
            Not a marketplace and not a middleman. Our engineers are our team,
            working together from our own office every day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "60-person engineering office",
                b: "Our own delivery office in India. Managed, in person, every day.",
              },
              {
                t: "Headquartered in Dubai",
                b: "Office 2020, Parklane Tower, Business Bay.",
              },
              {
                t: "ISO 27001 certified",
                b: "Independently audited information security. Your code and data are handled to that standard.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card"
              >
                <h3 className="font-display text-[17px] font-semibold text-navy-900">
                  {c.t}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-steel-700">
                  {c.b}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/proof/yaseen.jpg"
              alt="Yaseen Deen, founder of Octogle"
              className="h-20 w-20 shrink-0 rounded-2xl object-cover"
            />
            <div>
              <p className="font-display text-[17px] font-semibold text-navy-900">
                Yaseen Deen, Founder
              </p>
              <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-steel-700">
                From the UK, with deep ties in India. Yaseen built our 60-person
                engineering office in India and runs Octogle from Dubai, helping
                companies around the world get better development for less.
              </p>
              <a
                href="https://www.linkedin.com/in/yaseen-deen-52249219b/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[14px] font-medium text-steel-600 underline underline-offset-4 transition hover:text-navy-900"
              >
                Yaseen on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Risk reversal */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Before you assume the catch</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            Nothing to lose by looking.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "See three profiles first",
                b: "You choose who you work with. No commitment to view them.",
              },
              {
                t: "Not right? We swap them, no fee",
                b: "If the fit is wrong, we put someone else on it.",
              },
              {
                t: "Your repo, your ownership",
                b: 'Everything they build is yours. No handover, no lock-in, no "then they were gone".',
              },
              {
                t: "One client at a time",
                b: "Not a freelancer juggling five clients. Full time, your product, on your standups.",
              },
              {
                t: "Monthly, no lock-in",
                b: "Rolling monthly contract with 14 days' notice.",
              },
              {
                t: "IP and NDA in writing",
                b: "All IP is yours, confirmed in our NDA and standard contract.",
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

        {/* Disqualify out loud */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <Eyebrow>Honestly</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-900">
            This isn&apos;t for you if&hellip;
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {NOT_FOR_YOU.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card"
              >
                <h3 className="font-display text-[17px] font-semibold text-navy-900">
                  {c.t}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-steel-700">
                  {c.b}
                </p>
              </div>
            ))}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card">
              <h3 className="font-display text-[17px] font-semibold text-navy-900">
                You&apos;re looking for a job.
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-steel-700">
                This page is for companies hiring.{" "}
                <a
                  href="https://www.octoglehire.com/apply"
                  className="font-medium text-steel-600 underline underline-offset-4 hover:text-navy-900"
                >
                  Apply to join the team here
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto mt-24 max-w-content px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-default)] bg-navy-900 px-6 py-14 text-center sm:px-10 sm:py-20">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
              Your quote isn&apos;t the only way to build it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-[#B7D2E1]">
              Tell us what you&apos;re building. We&apos;ll show you three
              engineers we&apos;d put on it, within 48 hours. No placement fee,
              no commitment to hire.
            </p>
            <div className="mt-8">
              <CtaButton className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-display text-[17px] font-medium text-navy-900 shadow-cta transition hover:bg-ice-100">
                Get 3 engineer profiles <span aria-hidden>→</span>
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
