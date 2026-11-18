import PlaybookForm from "@/components/PlaybookForm";

// The SDR lead magnet page: "The one-rep meeting machine" PDF in exchange for
// name, email and mobile. The headline matches the ad: ?h=<key>, or a key's
// words in the ad name (utm_content). Everything below the hero is shared.
// Proof is limited to what Dan cleared on 18 Nov 2026: our SDRs average 20+
// meetings a month. Prices: $2,500 US, £2,000 UK.

type Market = "uk" | "us";

const PRICE: Record<Market, string> = { uk: "£2,000", us: "$2,500" };

const HEADLINES = {
  rep: {
    call: "Free playbook for founders and sales leaders",
    a: "How one rep books",
    b: "20+ sales meetings a month.",
    sub: "The whole system, step by step: who to hire, the list, the dial, the call, the follow-up and the five numbers to check every morning.",
  },
  agency: {
    call: "Free playbook for agency owners",
    a: "Book 20+ meetings a month",
    b: "for every client, with one rep.",
    sub: "How agencies run one rep across their clients: a campaign and a calendar per client, the call that books, and the numbers you send them every Monday.",
  },
  calendar: {
    call: "Free playbook for founders doing their own sales",
    a: "Want a calendar",
    b: "full of sales meetings?",
    sub: "The calling system our SDRs run to book 20+ meetings a month, written down so you can copy it, or hand it to a rep.",
  },
} as const;

type Key = keyof typeof HEADLINES;

const AD_WORDS: [string, Key][] = [
  ["AGENCY", "agency"],
  ["CLIENT", "agency"],
  ["CALENDAR", "calendar"],
  ["FULL", "calendar"],
  ["ONE REP", "rep"],
  ["20", "rep"],
];

function pickHeadline(params: Record<string, string | string[] | undefined>): Key {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const forced = one(params.h).toLowerCase();
  if (forced in HEADLINES) return forced as Key;
  const ad = one(params.utm_content).toUpperCase().replace(/[_+-]+/g, " ");
  return AD_WORDS.find(([w]) => ad.includes(w))?.[1] ?? "rep";
}

const INSIDE = [
  "Who to hire, and the three questions that tell you they can run a phone day",
  "The list: mobiles, not switchboards, and one market per list",
  "The opener our reps adapt, and how to book the meeting on the call",
  "How to make sure booked meetings actually turn up",
  "The five numbers to check every morning, and what to fix when one drops",
  "For agencies: running one rep across several clients",
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
      <header className="mx-auto max-w-content px-5 py-4 sm:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/octogle-logo.svg" alt="Octogle Hire" width={128} height={30} className="h-[28px] w-auto" />
      </header>

      <main className="overflow-x-hidden">
        <section className="mx-auto grid max-w-content items-start gap-8 px-5 pb-14 pt-4 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:gap-x-10 md:gap-y-6 md:pt-10">
          <div>
            <p className="eyebrow text-[11px] text-steel-600">{h.call}</p>
            <h1 className="mt-3 font-display text-[clamp(2.1rem,5.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              {h.a} <span className="headline-gradient">{h.b}</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-steel-700">{h.sub}</p>
          </div>

          {/* Form beside the headline on desktop, straight under it on a phone. */}
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card sm:p-6 md:col-start-2 md:row-span-2 md:row-start-1">
            <PlaybookForm market={market} pdf={pdf} headline={key} />
          </div>

          <div className="md:col-start-1 md:row-start-2">
            <div className="flex items-start gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/playbook/cover-${market}.png`}
                alt="The one-rep meeting machine playbook"
                width={150}
                height={212}
                className="hidden w-[132px] shrink-0 rounded-lg shadow-card sm:block"
              />
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold">What&apos;s inside</p>
                <ul className="mt-2 space-y-2 text-[15px] text-navy-900">
                  {INSIDE.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-1 shrink-0 text-good">
                        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-[13.5px] text-steel-600">From the OctogleHire team. Our SDRs average 20+ booked meetings a month.</p>
          </div>
        </section>

        <section className="bg-navy-900 text-white">
          <div className="mx-auto grid max-w-content gap-6 px-5 py-12 sm:px-8 md:grid-cols-3">
            <div>
              <p className="font-display text-[34px] font-semibold text-sky-300">20+</p>
              <p className="mt-1 text-[15px] text-white/75">Meetings a month, the average for our SDRs</p>
            </div>
            <div>
              <p className="font-display text-[34px] font-semibold text-sky-300">{PRICE[market]}</p>
              <p className="mt-1 text-[15px] text-white/75">A month for a full-time OctogleHire SDR, if you&apos;d rather we ran it</p>
            </div>
            <div>
              <p className="font-display text-[34px] font-semibold text-sky-300">Monthly</p>
              <p className="mt-1 text-[15px] text-white/75">Rolling contract. If the rep isn&apos;t right, we replace them</p>
            </div>
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
