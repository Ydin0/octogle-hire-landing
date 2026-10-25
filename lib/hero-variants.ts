// Ad-matched heroes. The headline repeats the promise of the ad that was
// clicked, so the first three seconds confirm the visitor is in the right
// place. Everything below the hero is identical, so a variant test only ever
// changes the one thing.
//
// The Oct 2026 test ads never mention price, so no hero opens on price either.
// Price lives further down the page (tiers + calculator).
//
// Picked by ?v=<key>, or failing that by matching utm_content (the ad name),
// so ads match without bespoke links.

export type HeroVariant = {
  key: string;
  head: string;
  sub: string;
};

const PROFILES: HeroVariant = {
  key: "profiles",
  head: "Pick the engineer, not the pitch.",
  sub: "See three real engineer profiles, with their stack and experience, within 48 hours. Interview the ones you like. No placement fee.",
};

export const HERO_VARIANTS: Record<string, HeroVariant> = {
  profiles: PROFILES,
  prototype: {
    key: "prototype",
    head: "Your v1 works. Now it needs an engineer.",
    sub: "A full-time engineer joins your repo and standups to make it secure, tested and ready for real users. Three profiles within 48 hours.",
  },
  // Only true while at least three engineers are genuinely free this month;
  // check with the India office before each flight (UPGRADES-TODO §3).
  available: {
    key: "available",
    head: "Three engineers free to start this month.",
    sub: "Full time, in your repo and at your standups. See their profiles within 48 hours and pick who starts.",
  },
  burned: {
    key: "burned",
    head: "An engineer who stays after launch.",
    sub: "Not a project handed back and gone. One full-time engineer on your product, month after month, rolling monthly with 14 days' notice.",
  },
  founder: {
    key: "founder",
    head: "You built it. Someone else can ship it.",
    sub: "Hand the build to a full-time engineer in your repo and get back to running the business. Three profiles within 48 hours.",
  },
  control: {
    key: "control",
    head: "Your repo. Your code. Your call.",
    sub: "Your engineer works in your repo, at your standups, on your priorities. All IP is yours, confirmed in writing.",
  },
};

// Ad name fragments → variant. Lower-cased substring match on utm_content.
const AD_NAME_HINTS: [string, string][] = [
  ["prototype", "prototype"],
  ["available", "available"],
  ["burned", "burned"],
  ["burnt", "burned"],
  ["founder", "founder"],
  ["control", "control"],
  ["profiles", "profiles"],
];

export function pickHero(params: {
  v?: string | string[];
  utm_content?: string | string[];
}): HeroVariant {
  const first = (x?: string | string[]) => (Array.isArray(x) ? x[0] : x);
  const v = first(params.v)?.toLowerCase();
  if (v && HERO_VARIANTS[v]) return HERO_VARIANTS[v];

  const ad = first(params.utm_content)?.toLowerCase() ?? "";
  for (const [hint, key] of AD_NAME_HINTS) {
    if (ad.includes(hint)) return HERO_VARIANTS[key];
  }
  return PROFILES;
}
