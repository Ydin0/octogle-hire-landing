import { CtaButton } from "./Funnel";

// Straight pricing by level. The old hero implied a senior for £1,500 while the
// small print said "from interns to senior"; anyone who booked expecting a
// £1,500 senior felt baited on the call. Showing the real number per level
// converts fewer tyre-kickers and more buyers.
//
// Prices confirmed by Dan, 2026-09-24. `local` is the typical monthly cost of
// a UK hire at the same level; `localPlus` marks it as a floor ("£8,500+").
type Tier = {
  level: string;
  blurb: string;
  octogle: number;
  local: number;
  localPlus?: boolean;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    level: "Junior",
    blurb: "1 to 3 years. Features, fixes and tests, under a lead.",
    octogle: 1500,
    local: 3000,
  },
  {
    level: "Mid-level",
    blurb: "3 to 6 years. Owns features end to end.",
    octogle: 2500,
    local: 5000,
    featured: true,
  },
  {
    level: "Senior",
    blurb: "6+ years. Architecture, leads the build.",
    octogle: 4500,
    local: 8500,
    localPlus: true,
  },
];

const gbp = (n: number) => "£" + n.toLocaleString("en-GB");

export default function Pricing() {
  return (
    <div>
      {/* Subgrid: each card's rows (title, blurb, price block) share tracks
          with its neighbours, so prices line up however long the blurb is. */}
      <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_1fr]">
        {TIERS.map((t) => {
          const plus = t.localPlus ? "+" : "";
          const monthly = t.local - t.octogle;
          return (
            <div
              key={t.level}
              className={
                "relative grid overflow-hidden rounded-3xl bg-white p-6 sm:p-7 md:row-span-3 md:grid-rows-subgrid " +
                (t.featured
                  ? "border border-sky-500/45 shadow-glow"
                  : "border border-[var(--border-subtle)] shadow-card")
              }
            >
              {/* Diagonal savings ribbon, top-right corner */}
              <div
                className="pointer-events-none absolute right-[-50px] top-[38px] w-[210px] rotate-45 bg-good py-1.5 text-center text-[12px] font-semibold text-white shadow-card"
                aria-hidden
              >
                Save {gbp(monthly)}
                {plus}/mo
              </div>

              <p className="pr-24 font-display text-[18px] font-semibold text-navy-900">
                {t.level}
              </p>

              <p className="mt-1 pr-20 text-[14px] leading-relaxed text-steel-600">
                {t.blurb}
              </p>

              <div className="mt-6 self-end">
                <p className="text-[14px] text-steel-600">
                  UK hire:{" "}
                  <span className="font-medium text-[#c2414b] line-through decoration-[#c2414b]/70 decoration-2">
                    {gbp(t.local)}
                    {plus}/mo
                  </span>
                </p>
                <p className="mt-1.5 font-display text-[40px] font-semibold leading-none text-navy-900">
                  {gbp(t.octogle)}
                  <span className="text-[18px] font-medium text-steel-600">/mo</span>
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-good/10 px-3 py-1.5 text-[13px] font-semibold text-good">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You save {gbp(monthly * 12)}
                  {plus} a year
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-[14px] text-[var(--text-faint)]">
        Full time, one client at a time. Monthly, no placement fee. UK figures
        are the typical monthly cost of a local hire at the same level.
      </p>
      <div className="mt-8">
        <CtaButton className="inline-flex items-center gap-3 rounded-2xl bg-navy-900 px-7 py-4 font-display text-[16px] font-medium text-white shadow-cta transition hover:bg-navy-800">
          Get profiles at your level <span aria-hidden>→</span>
        </CtaButton>
      </div>
    </div>
  );
}
