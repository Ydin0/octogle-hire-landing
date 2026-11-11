import type { Metadata } from "next";
import HireForm from "@/components/HireForm";

// US search page. One job: get the shortlist form filled. The headline repeats
// the searched keyword (?kw={keyword} in the ad's final URL suffix). Prices are
// the US ones already on /us and the US forms ($2k / $3.5k / $5k). The cost
// table uses the BLS median software developer salary, May 2025: $135,980/yr.

export const metadata: Metadata = {
  title: "Hire vetted AI developers from $2,000 a month | Octogle Hire",
  description:
    "Vetted full-time AI developers working US hours, from $2,000 a month. Shortlist in 48 hours, no placement fee, free replacement if it's not a fit.",
  alternates: { canonical: "https://try.octoglehire.com/hire" },
  robots: { index: false, follow: false },
};

const CLUTCH_URL = "https://clutch.co/profile/octogle-technologies";
const ISO_URL = "https://www.iafcertsearch.org/certified-entity/YgnCzSQq4p76plJ5hUNVNd5C";

const LOGOS = [
  "Beekey", "1VA", "Hireflow", "SquareLogik", "Solidus",
  "DNO-Investments", "Unichats", "Workchats", "thecareapp",
];

// Real engineers from our India office. score: vetting score out of 100,
// shown only once filled in with the real number.
const ENGINEERS: { photo: string; name: string; role: string; years: string; stack: string; score?: number }[] = [
  { photo: "/engineers/priya.jpg", name: "Priya", role: "Full-stack engineer", years: "7 years", stack: "TypeScript, React, Node.js, AWS" },
  { photo: "/engineers/rohit.jpg", name: "Rohit", role: "Backend engineer", years: "5 years", stack: "Python, Django, PostgreSQL, AWS" },
  { photo: "/engineers/prasanna.jpg", name: "Prasanna", role: "AI / ML engineer", years: "17 years", stack: "Python, LLMs, RAG, FastAPI" },
];

// $135,980 / 12 = $11,330. Mid-level is the like-for-like comparison.
const US_MONTHLY = 11330;
const OCTO_MONTHLY = 3500;
const SAVING = Math.round((1 - OCTO_MONTHLY / US_MONTHLY) * 100);

const COMPARE = [
  { k: "Monthly cost", us: "$11,330 salary, before benefits and payroll tax", octo: "$3,500 all-in, mid-level" },
  { k: "Placement fee", us: "Recruiter or job-board costs", octo: "None" },
  { k: "Time to a shortlist", us: "Weeks of sourcing and interviews", octo: "48 hours" },
  { k: "Payroll and compliance", us: "Yours to run", octo: "One monthly invoice" },
  { k: "If it's not a fit", us: "Start the search again", octo: "Free replacement" },
  { k: "Commitment", us: "Notice, severance, rehiring", octo: "Rolling monthly, 14 days' notice" },
];

const STEPS = [
  { when: "Monday", t: "Brief us in 15 minutes", d: "Your stack, the role and when you need them." },
  { when: "Wednesday", t: "Your shortlist arrives", d: "Three vetted profiles within 48 hours. Interview the ones you like." },
  { when: "The week after", t: "First merge", d: "Your developer is in your repo and standups, on US hours." },
];

const FAQS = [
  {
    q: "What does it cost?",
    a: "$2,000 a month for a junior, $3,500 for mid-level and $5,000 for a senior developer. One monthly price that covers salary, equipment and management. No placement fee.",
  },
  {
    q: "How are developers vetted?",
    a: "Every developer is assessed and interviewed before they join our team, and you interview your shortlist yourself before anyone starts. You only take on someone you've chosen.",
  },
  {
    q: "Will they work our hours?",
    a: "Yes. Your developer works US hours, joins your standups and is online when your team is.",
  },
  {
    q: "What are the contract terms?",
    a: "Rolling monthly with 14 days' notice. No minimum term. Your code and IP are yours from day one, confirmed in writing.",
  },
  {
    q: "What if it isn't working?",
    a: "Tell us and we replace your developer at no cost. You don't pay a new fee or start the search again.",
  },
];

/** Turns the searched keyword into headline text, e.g. "hire python developers" -> "Python Developers". */
function keywordHeadline(raw: string | string[] | undefined) {
  const kw = (Array.isArray(raw) ? raw[0] : raw ?? "")
    .replace(/[^a-zA-Z0-9 +#./-]/g, " ")
    .replace(/^\s*(hire|hiring|find|outsource|outsourced|offshore|remote)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  if (kw.length < 3) return "AI Developers";
  return kw
    .split(" ")
    .map((w) => (/[A-Z]/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

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

const card = "rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card sm:p-6";

export default async function HirePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const role = keywordHeadline((await searchParams).kw);

  return (
    <>
      {/* 1. Header: logo only */}
      <header className="mx-auto max-w-content px-5 py-4 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/octogle-logo.svg" alt="Octogle Hire" width={128} height={30} className="h-[28px] w-auto" />
      </header>

      <main className="overflow-x-hidden">
        {/* 2 + 3. Headline with the form beside it */}
        <section className="mx-auto grid max-w-content items-start gap-8 px-5 pb-12 pt-4 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:pt-10">
          <div>
            <h1 className="font-display text-[clamp(2.1rem,5.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              Hire vetted <span className="headline-gradient">{role}</span>. Shortlist in 48 hours, from $2,000 a
              month.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-steel-700">
              Up to {SAVING}% below a US developer&apos;s salary. No placement fee. Free replacement if it&apos;s
              not a fit.
            </p>
            <ul className="mt-6 space-y-2.5 text-[15px] text-navy-900">
              <li className="flex items-center gap-2.5"><Tick /> Full time, working US hours</li>
              <li className="flex items-center gap-2.5"><Tick /> In your repo, your standups and your tools</li>
              <li className="flex items-center gap-2.5"><Tick /> Rolling monthly, 14 days&apos; notice</li>
            </ul>
          </div>
          <div id="get-shortlist" className={card}>
            <HireForm id="top" />
          </div>
        </section>

        {/* 4. Proof strip */}
        {/* Client logos are white SVGs, so this band is dark. */}
        <section className="bg-navy-900 text-white">
          <div className="mx-auto max-w-content px-5 py-8 sm:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px] text-white/75">
              <a href={CLUTCH_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <span className="text-[#FF5A5F]" aria-hidden>★★★★★</span>
                <span><b className="font-semibold text-white">5.0 on Clutch</b> from 12 reviews</span>
              </a>
              <a href={ISO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <b className="font-semibold text-white">ISO 27001</b> certified
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-5">
              {LOGOS.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l} src={`/logos/${l}.svg`} alt={l.replace("-", " ")} className="h-6 w-auto max-w-[120px] opacity-80" />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Cost comparison */}
        <section className="mx-auto max-w-content px-5 py-14 sm:px-8">
          <H2>A US hire vs. Octogle, side by side.</H2>
          <p className="mt-3 max-w-[40rem] text-[15.5px] text-steel-700">
            Mid-level, like for like. The US figure is the median software developer salary from the Bureau
            of Labor Statistics ($135,980 a year, May 2025), before benefits and payroll tax.
          </p>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white text-left text-[15px] shadow-card">
              <thead>
                <tr className="text-[13px] text-steel-600">
                  <th className="px-5 py-4 font-medium" />
                  <th className="px-5 py-4 font-medium">Hiring in the US</th>
                  <th className="bg-navy-900 px-5 py-4 font-medium text-white">Octogle</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k}>
                    <td className="border-t border-[var(--border-subtle)] px-5 py-4 font-semibold">{r.k}</td>
                    <td className="border-t border-[var(--border-subtle)] px-5 py-4 text-steel-700">{r.us}</td>
                    <td className="border-t border-white/10 bg-navy-900 px-5 py-4 font-medium text-white">{r.octo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. How it works */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <H2>Monday brief to first merge.</H2>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className={card}>
                <p className="eyebrow text-[11px] text-steel-600">
                  {i + 1} · {s.when}
                </p>
                <p className="mt-3 font-display text-[19px] font-semibold">{s.t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-steel-700">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. Real engineer profiles */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <H2>Developers on our team today.</H2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {ENGINEERS.map((e) => (
              <div key={e.name} className={card}>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.photo} alt={e.name} width={64} height={64} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <p className="font-display text-[18px] font-semibold">{e.name}</p>
                    <p className="text-[14px] text-steel-700">
                      {e.role} · {e.years}
                    </p>
                  </div>
                  {e.score !== undefined && (
                    <div className="ml-auto text-right">
                      <p className="font-display text-[22px] font-semibold leading-none">{e.score}</p>
                      <p className="mt-1 text-[11px] text-steel-600">vetting score</p>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-[14px] text-steel-700">{e.stack}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Customer quote with a number */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <figure className="rounded-3xl bg-navy-900 p-7 text-white shadow-cta sm:p-10">
            <p className="font-display text-[clamp(3rem,8vw,4.5rem)] font-semibold leading-none text-sky-300">60%</p>
            <p className="mt-1 text-[14px] text-white/70">lower monthly cost than hiring locally</p>
            <blockquote className="mt-6 max-w-[44rem] font-display text-[clamp(1.2rem,2.6vw,1.6rem)] leading-snug">
              &ldquo;We were about to commit to three senior frontend engineers… OctogleHire matched us with equally
              talented engineers in under a week.&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/proof/ricardo.jpg" alt="Ricardo Machado" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <span className="text-[14px]">
                <b className="font-semibold">Ricardo Machado</b>
                <span className="text-white/70"> · CEO, Beekey</span>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* 9. Guarantee */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <div className={`${card} flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6`}>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-good/10 text-good">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-[20px] font-semibold">Not the right fit? We replace them, free.</p>
              <p className="mt-1 text-[15px] leading-relaxed text-steel-700">
                No new fee and no new search. Rolling monthly with 14 days&apos; notice, so you&apos;re never locked in.
              </p>
            </div>
          </div>
        </section>

        {/* 10. FAQs */}
        <section className="mx-auto max-w-content px-5 pb-14 sm:px-8">
          <H2>Questions buyers ask first.</H2>
          <div className="mt-6 divide-y divide-[var(--border-subtle)] rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group px-5 py-4 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-semibold">
                  {f.q}
                  <span className="text-steel-600 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-2 text-[15px] leading-relaxed text-steel-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 11. Form again */}
        <section className="mx-auto grid max-w-content items-start gap-8 px-5 pb-16 sm:px-8 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <H2>Get your shortlist in 48 hours.</H2>
            <p className="mt-3 text-[16px] text-steel-700">
              Three vetted {role.toLowerCase()} profiles, from $2,000 a month. Free to ask, no commitment.
            </p>
          </div>
          <div className={card}>
            <HireForm id="bottom" />
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-subtle)] px-5 py-8 text-center text-[12.5px] text-[var(--text-faint)]">
        © {new Date().getFullYear()} Octogle Hire ·{" "}
        <a href="https://www.octoglehire.com/privacy" className="underline underline-offset-2 hover:text-steel-700">
          Privacy
        </a>
      </footer>
    </>
  );
}
