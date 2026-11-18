import MeetingsHero from "@/components/MeetingsHero";
import { DoorButtons, StickyCta } from "@/components/DoorButtons";
import type { Door } from "@/components/PlaybookForm";

// The SDR funnel page. Default promise: a trained SDR cold calling your offer.
// Two doors into one form: book a call with Connor now (?door=book) or take the
// free playbook first (?door=playbook); with no door set, the visitor picks.
// Claims are limited to the ones Dan confirmed on 18 Nov 2026: 20+ meetings a
// month on average, 2M+ calls, 100+ callers hired, 30+ live reps, 50 on the
// bench, 25–35% pick-up, ~10 in 500 applicants, we replace the rep, rolling
// monthly with no recruiter fee, set up in a day. Prices: $2,500 US, £2,000 UK.

type Market = "uk" | "us";

const PRICE: Record<Market, string> = { uk: "£2,000", us: "$2,500" };
const PER_MEETING: Record<Market, string> = { uk: "£100", us: "$125" };

const HEADLINES = {
  get: {
    call: "For founders, sales leaders and agencies",
    a: "Get a trained SDR",
    b: "cold calling your offer.",
    sub: "We hire, train and manage the rep. They call your market and book meetings straight into your calendar. Our SDRs average 20+ booked meetings a month.",
  },
  rep: {
    call: "Free playbook for founders and sales leaders",
    a: "How one rep books",
    b: "20+ sales meetings a month.",
    sub: "Why cold calling still works, what 20 meetings a month are worth, and how we put a trained SDR on the phones for you.",
  },
  agency: {
    call: "For agency owners",
    a: "Book 20+ meetings a month",
    b: "with one trained rep.",
    sub: "Put a trained SDR on the phones for your agency. We hire, train and manage them; you take the meetings. Set up in a day.",
  },
  calendar: {
    call: "For founders doing their own sales",
    a: "Want a calendar",
    b: "full of sales meetings?",
    sub: "From 1–2 meetings a week to 1–2 a day. A trained SDR calls your market and books the meetings for you.",
  },
} as const;

type Key = keyof typeof HEADLINES;

const AD_WORDS: [string, Key][] = [
  ["AGENCY", "agency"],
  ["CLIENT", "agency"],
  ["CALENDAR", "calendar"],
  ["FULL", "calendar"],
  ["ONE REP", "rep"],
  ["PLAYBOOK", "rep"],
  ["SDR", "get"],
];

function pickHeadline(params: Record<string, string | string[] | undefined>): Key {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const forced = one(params.h).toLowerCase();
  if (forced in HEADLINES) return forced as Key;
  const ad = one(params.utm_content).toUpperCase().replace(/[_+-]+/g, " ");
  return AD_WORDS.find(([w]) => ad.includes(w))?.[1] ?? "get";
}

function pickDoor(params: Record<string, string | string[] | undefined>): Door | null {
  const d = (Array.isArray(params.door) ? params.door[0] : params.door) ?? "";
  return d === "book" || d === "playbook" ? d : null;
}

const CHIPS = ["2M+ calls made", "100+ callers hired", "Rolling monthly", "We replace the rep"];

const STEPS = [
  {
    n: "01",
    title: "We pick your rep",
    body: "About 10 in every 500 applicants make it through our vetting. You get a vetted rep, not a pile of CVs.",
    img: "funnel",
    alt: "",
  },
  {
    n: "02",
    title: "Trained and calling in a day",
    body: "Your rep learns your offer and calls from Leadey: dialer, CRM, sequences and recordings in one place. Every call is recorded.",
    img: "/meetings/cockpit.jpg",
    alt: "The Leadey calling cockpit",
  },
  {
    n: "03",
    title: "Meetings land in your calendar",
    body: "Qualified prospects booked straight into your calendar. You show up and sell. If the rep isn't right, we replace them.",
    img: "",
    alt: "",
  },
];

const VS: [string, string, string][] = [
  ["Finding the rep", "Weeks of job posts, interviews or recruiter fees", "About 10 in 500 applicants make it. No recruiter fee"],
  ["Getting started", "Weeks to onboard and ramp", "Set up in a day"],
  ["Tools", "Buy and stitch together a dialer, CRM and sequencer", "Calls from Leadey, all in one"],
  ["If it doesn't work out", "Notice periods and starting again", "We replace the rep, with 50 on the bench"],
  ["Commitment", "Employment contract", "Rolling monthly"],
];

const FAQ: [string, string][] = [
  [
    "What does the SDR actually do?",
    "They prospect, cold call your market and book qualified meetings into your calendar. You take the meetings and close.",
  ],
  [
    "What do I need to give them?",
    "Your offer, who you sell to and access to your calendar. We set the rest up with you in a day.",
  ],
  ["What does it cost?", "From $2,500 a month for a full-time SDR. Rolling monthly, no recruiter fee."],
  ["What if the rep isn't working out?", "We replace them. We keep 50 trained reps on the bench for exactly that."],
  ["Do you work with agencies?", "Yes. Agencies use our SDRs to book meetings for their own pipeline."],
];

// Step 3: what lands in the client's calendar (US Eastern, illustrative).
const BOOKED = [
  ["Mon", "10:00 AM", "Discovery call", "Booked by your SDR"],
  ["Mon", "2:30 PM", "Intro call", "Booked by your SDR"],
  ["Tue", "11:00 AM", "Discovery call", "Booked by your SDR"],
  ["Wed", "9:30 AM", "Demo", "Booked by your SDR"],
  ["Thu", "1:00 PM", "Discovery call", "Booked by your SDR"],
];

// Step 1: how few applicants make it (about 10 in 500).
const FUNNEL: [string, string, number][] = [
  ["Applied", "500", 100],
  ["Screened", "", 38],
  ["Interviewed", "", 14],
  ["Hired and trained", "~10", 4],
];

function FunnelCard() {
  return (
    <div className="p-5 sm:p-6">
      <p className="font-display text-[16px] font-semibold text-white">Every 500 applicants</p>
      <div className="mt-4 space-y-3">
        {FUNNEL.map(([l, n, w], i) => (
          <div key={l}>
            <div className="flex justify-between text-[13px]">
              <span className="text-white/75">{l}</span>
              <span className={i === FUNNEL.length - 1 ? "font-semibold text-good" : "text-white/55"}>{n}</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-white/[.06]">
              <div
                className={i === FUNNEL.length - 1 ? "h-2.5 rounded-full bg-good" : "h-2.5 rounded-full bg-sky-500/70"}
                style={{ width: `${Math.max(w, 4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookedCard() {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-[16px] font-semibold text-white">This week</p>
        <span className="rounded-full bg-good/20 px-2.5 py-1 text-[11.5px] font-medium text-good">5 booked · ET</span>
      </div>
      <ul className="mt-4 space-y-2">
        {BOOKED.map(([d, t, title, by]) => (
          <li key={d + t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-3.5 py-3">
            <span className="w-10 shrink-0 font-mono text-[11px] uppercase tracking-wider text-sky-300">{d}</span>
            <span className="w-[70px] shrink-0 text-[13px] text-white/60">{t}</span>
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white">{title}</span>
            <span className="hidden shrink-0 items-center gap-1.5 text-[12px] text-good sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-good" /> {by}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Before and after: a working week of sales meetings, Monday to Friday.
const BEFORE = [[], [11], [], [], [15]];
const AFTER = [
  [10, 14],
  [9, 11, 15],
  [10, 13],
  [9, 12, 16],
  [11, 14],
];

function Week({ days, accent }: { days: number[][]; accent: boolean }) {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
        <div key={d} className="min-w-0">
          <p className="mb-1.5 text-center font-mono text-[10.5px] uppercase tracking-wider text-steel-600">{d}</p>
          <div className="grid gap-1">
            {hours.map((h) => {
              const on = days[i].includes(h);
              return (
                <div
                  key={h}
                  className={
                    on
                      ? accent
                        ? "h-6 truncate rounded-md bg-good/90 px-1.5 text-[10px] font-medium leading-6 text-white"
                        : "h-6 truncate rounded-md bg-steel-600/70 px-1.5 text-[10px] font-medium leading-6 text-white"
                      : "h-6 rounded-md bg-ice-200"
                  }
                >
                  {on ? "Sales call" : ""}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MeetingsLanding({
  market,
  params,
}: {
  market: Market;
  params: Record<string, string | string[] | undefined>;
}) {
  const key = pickHeadline(params);
  const h = HEADLINES[key];
  const pdf = `/playbook/one-rep-meeting-machine-${market}.pdf`;

  return (
    <>
      <header className="bg-navy-950">
        <div className="mx-auto max-w-content px-5 py-4 sm:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/octogle-darkmode.svg" alt="Octogle Hire" width={128} height={30} className="h-[28px] w-auto" />
        </div>
      </header>

      <main className="overflow-x-hidden">
        <MeetingsHero
          market={market}
          pdf={pdf}
          headline={key}
          initialDoor={pickDoor(params)}
          agencyHeadline={key === "agency"}
          intro={
            <>
              <p className="eyebrow text-[11px] text-sky-300">{h.call}</p>
              <h1 className="mt-3 font-display text-[clamp(2.3rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                {h.a} <span className="text-sky-300">{h.b}</span>
              </h1>
              <p className="mt-5 max-w-[34rem] text-[17.5px] leading-relaxed text-white/75">{h.sub}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {CHIPS.map((c) => (
                  <li key={c} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] text-white/85">
                    {c}
                  </li>
                ))}
              </ul>
            </>
          }
          visual={
            <div className="relative mx-auto hidden w-full max-w-[420px] md:block">
              <div className="relative mx-auto w-[270px] rotate-[2deg] overflow-hidden rounded-[2.4rem] border-[7px] border-navy-800 bg-navy-900 shadow-[0_30px_80px_rgba(0,0,0,.55)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/meetings/livecall-us.jpg" alt="A live call on the Leadey dialer" width={416} height={900} className="block w-full" />
              </div>
              <div className="absolute -left-4 top-16 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-cta">
                <p className="flex items-center gap-2 text-[13px] font-semibold">
                  <span className="h-2 w-2 rounded-full bg-good" /> Meeting booked
                </p>
                <p className="mt-0.5 text-[12px] text-steel-600">Discovery call · Tue 2:00 PM</p>
              </div>
              <div className="absolute -right-2 top-56 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-cta">
                <p className="font-display text-[22px] font-semibold leading-none">20+</p>
                <p className="mt-1 text-[12px] text-steel-600">meetings a month, our SDR average</p>
              </div>
              <div className="absolute -left-2 bottom-14 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-cta">
                <p className="flex items-center gap-2 text-[13px] font-semibold">
                  <span className="h-2 w-2 rounded-full bg-good" /> Meeting booked
                </p>
                <p className="mt-0.5 text-[12px] text-steel-600">Intro call · Thu 11:00 AM</p>
              </div>
            </div>
          }
        />

        {/* Before and after */}
        <section className="bg-white">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 md:py-24">
            <p className="eyebrow text-[11px] text-steel-600">What changes</p>
            <h2 className="mt-3 max-w-[40rem] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              From 1–2 meetings a week <span className="headline-gradient">to 1–2 a day.</span>
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border-subtle)] bg-ice-050 p-5 sm:p-6">
                <p className="font-display text-[15px] font-semibold">Your week now</p>
                <p className="mb-4 text-[13.5px] text-steel-600">You book your own meetings, between everything else.</p>
                <Week days={BEFORE} accent={false} />
              </div>
              <div className="rounded-3xl border border-good/30 bg-ice-050 p-5 shadow-card sm:p-6">
                <p className="font-display text-[15px] font-semibold">Your week with an SDR</p>
                <p className="mb-4 text-[13.5px] text-steel-600">They make the calls. You take the meetings.</p>
                <Week days={AFTER} accent />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-ice-100">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 md:py-24">
            <p className="eyebrow text-[11px] text-steel-600">How it works</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              A trained rep on your phones, <span className="headline-gradient">without the hiring.</span>
            </h2>
            <div className="mt-12 space-y-14 md:space-y-20">
              {STEPS.map((s, i) => (
                <div key={s.n} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={i % 2 ? "md:order-2" : ""}>
                    <p className="font-mono text-[13px] text-sky-600">{s.n}</p>
                    <h3 className="mt-2 font-display text-[26px] font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-3 max-w-[30rem] text-[16.5px] leading-relaxed text-steel-700">{s.body}</p>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-navy-950 shadow-card">
                    {s.img === "funnel" ? (
                      <FunnelCard />
                    ) : s.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.img} alt={s.alt} loading="lazy" className="block w-full" />
                    ) : (
                      <BookedCard />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="bg-navy-950 text-white">
          <div className="mx-auto grid max-w-content grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
            {[
              ["2M+", "calls made by our reps"],
              ["100+", "callers hired"],
              ["30+", "reps live right now"],
              ["25–35%", "pick-up rate"],
            ].map(([n, l]) => (
              <div key={n}>
                <p className="font-display text-[clamp(2rem,4vw,2.8rem)] font-semibold text-sky-300">{n}</p>
                <p className="mt-1 text-[14.5px] text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The math and the comparison */}
        <section className="bg-white">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 md:py-24">
            <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-14">
              <div>
                <p className="eyebrow text-[11px] text-steel-600">The math</p>
                <p className="mt-3 font-display text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
                  {PRICE[market]}
                  <span className="text-[18px] font-medium text-steel-600"> /month</span>
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-steel-700">
                  A full-time SDR. At our 20-meeting average, that&apos;s about{" "}
                  <b className="text-navy-900">{PER_MEETING[market]} a booked meeting</b>. Set that against what one new customer is worth to you.
                </p>
                <div className="mt-7">
                  <DoorButtons stack />
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)]">
                <div className="grid grid-cols-[1fr_1fr_1fr] bg-ice-100 px-4 py-3 text-[12.5px] font-semibold uppercase tracking-wider text-steel-600 sm:px-5">
                  <span />
                  <span>Hiring in-house</span>
                  <span className="text-navy-900">OctogleHire SDR</span>
                </div>
                {VS.map(([k, a, b]) => (
                  <div key={k} className="grid grid-cols-[1fr_1fr_1fr] gap-3 border-t border-[var(--border-subtle)] px-4 py-4 text-[14px] sm:px-5">
                    <span className="font-medium text-navy-900">{k}</span>
                    <span className="text-steel-600">{a}</span>
                    <span className="font-medium text-navy-900">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connor */}
        <section className="bg-ice-100">
          <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:gap-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/people/connor.jpg" alt="Connor" width={120} height={120} className="h-[104px] w-[104px] rounded-full object-cover shadow-card" />
            <div className="max-w-[40rem]">
              <h2 className="font-display text-[26px] font-semibold leading-tight">Your 15 minutes are with Connor.</h2>
              <p className="mt-2 text-[16.5px] leading-relaxed text-steel-700">
                No deck, no pressure. You&apos;ll leave knowing who we&apos;d call for you, the angle of the script and how many meetings to expect.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 md:py-20">
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.3rem)] font-semibold tracking-[-0.02em]">Questions</h2>
            <div className="mt-6 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[17px] font-medium">
                    {q}
                    <span className="text-[22px] text-steel-600 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-steel-700">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(102,184,214,.25),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-content px-5 py-16 text-center sm:px-8 md:py-24">
            <h2 className="mx-auto max-w-[42rem] font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
              Get your SDR calling <span className="text-sky-300">this month.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[34rem] text-[17px] text-white/70">
              15 minutes with Connor, or start with the free playbook. {PRICE[market]} a month, rolling monthly.
            </p>
            <div className="mt-8 flex justify-center">
              <DoorButtons dark />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-950 px-5 pb-24 pt-2 text-center text-[12.5px] text-white/45 md:pb-8">
        © {new Date().getFullYear()} Octogle Hire ·{" "}
        <a href="https://www.octoglehire.com/privacy" className="underline underline-offset-2 hover:text-white/80">
          Privacy
        </a>
      </footer>
      <StickyCta />
    </>
  );
}
