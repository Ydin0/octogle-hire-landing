import { CtaButton } from "./Funnel";

// Straight pricing by level. The old hero implied a senior for £1,500 while the
// small print said "from interns to senior"; anyone who booked expecting a
// £1,500 senior felt baited on the call. Showing the real number per level
// converts fewer tyre-kickers and more buyers.
//
// Prices confirmed by Dan, 2026-09-24. `local` is the typical monthly cost of
// a UK hire at the same level.
type Tier = {
  level: string;
  blurb: string;
  octogle: string;
  local: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    level: "Junior",
    blurb: "1 to 3 years. Features, fixes, tests, under a lead.",
    octogle: "£1,500",
    local: "£3,000",
  },
  {
    level: "Mid-level",
    blurb: "3 to 6 years. Owns features end to end.",
    octogle: "£2,500",
    local: "£5,000",
    featured: true,
  },
  {
    level: "Senior",
    blurb: "6+ years. Architecture, leads the build.",
    octogle: "£4,500",
    local: "£8,500+",
  },
];

export default function Pricing() {
  return (
    <div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.level}
            className={
              "rounded-3xl bg-white p-6 sm:p-7 " +
              (t.featured
                ? "border border-sky-500/45 shadow-glow"
                : "border border-[var(--border-subtle)] shadow-card")
            }
          >
            <p className="font-display text-[18px] font-semibold text-navy-900">
              {t.level}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-steel-600">
              {t.blurb}
            </p>
            <p className="mt-5 font-display text-[36px] font-semibold leading-none text-navy-900">
              {t.octogle}
              <span className="text-[18px] font-medium text-steel-600">/mo</span>
            </p>
            <p className="mt-3 text-[14px] text-[var(--text-faint)]">
              UK hire at this level: {t.local}/mo
            </p>
          </div>
        ))}
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
