import MeetingsHero from "@/components/MeetingsHero";
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

const GET = [
  "A vetted SDR: about 10 in every 500 applicants make it",
  "Trained on your offer and calling in a day",
  "Meetings booked straight into your calendar",
  "From $2,500 a month, rolling monthly, no recruiter fee",
];

const PROOF: [string, string][] = [
  ["20+", "meetings a month, our SDR average"],
  ["2M+", "calls made by our reps"],
  ["100+", "callers hired"],
  ["30+", "reps live right now"],
  ["25–35%", "pick-up rate"],
  ["~10 in 500", "applicants make it"],
  ["1 day", "to set up"],
  ["50", "trained reps on the bench"],
];

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
        <div className="mx-auto flex max-w-content justify-center px-5 pb-2 pt-7 sm:px-8 md:pt-9">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/octogle-darkmode.svg" alt="Octogle Hire" width={200} height={47} className="h-[38px] w-auto md:h-[46px]" />
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
          after={
            <div className="mt-8 max-w-[30rem]">
              <p className="font-display text-[15px] font-semibold text-white">What you get</p>
              <ul className="mt-3 space-y-2.5">
                {GET.map((g) => (
                  <li key={g} className="flex gap-2.5 text-[15px] text-white/80">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0 text-good">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/people/connor.jpg" alt="Connor" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <p className="text-[13.5px] text-white/60">Your 15 minutes are with Connor at OctogleHire.</p>
              </div>
            </div>
          }
          visual={
            <div className="relative mx-auto hidden w-full max-w-[420px] md:sticky md:top-10 md:mt-10 md:block">
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

        {/* Proof strip */}
        <section className="border-t border-white/10 bg-navy-950 py-6 text-white">
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track flex w-max gap-4">
              {[...PROOF, ...PROOF].map(([n, l], i) => (
                <div key={i} className="flex shrink-0 items-baseline gap-2.5 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-3">
                  <span className="font-display text-[24px] font-semibold text-sky-300">{n}</span>
                  <span className="text-[14px] text-white/65">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-950 px-5 py-8 text-center text-[12.5px] text-white/45">
        © {new Date().getFullYear()} Octogle Hire ·{" "}
        <a href="https://www.octoglehire.com/privacy" className="underline underline-offset-2 hover:text-white/80">
          Privacy
        </a>
      </footer>
    </>
  );
}
