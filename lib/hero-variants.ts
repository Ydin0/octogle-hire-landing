// Ad-matched heroes. The headline has to repeat the promise of the ad that was
// clicked, so the first three seconds confirm the visitor is in the right
// place. Everything below the hero is identical, so a variant test only ever
// changes the one thing.
//
// Picked by ?v=<key>, or failing that by matching utm_content (the ad name,
// sent as utm_content={{ad.name}}), so existing ads match without new links.

export type HeroVariant = {
  key: string;
  /** Who it's for, above the headline. */
  call: string;
  head: string;
  sub: string;
};

// "About £61k" is the calculator's own output for the default mid-level case:
// £44,851 salary + employer NI + pension + a 20% recruiter fee.
const COST: HeroVariant = {
  key: "cost",
  call: "For UK founders paying UK rates for engineering",
  head: "A full-time engineer for a fraction of a UK hire.",
  sub: "A UK mid-level developer costs about £61k in year one with NI, pension and a recruiter fee. Ours is £2,500 a month, full time, in your standups.",
};

export const HERO_VARIANTS: Record<string, HeroVariant> = {
  cost: COST,
  quality: {
    key: "quality",
    call: "For founders burned by offshore or freelance code",
    head: "Offshore dev that doesn't fall apart in month three.",
    sub: "One full-time engineer, one client, managed in person in our own office. Work lands as pull requests your team reviews and merges, in your repo.",
  },
  speed: {
    key: "speed",
    call: "For teams with a dev role that's been open too long",
    head: "Three engineers to interview within 48 hours.",
    sub: "Skip the advert, the agency and the notice period. Full time, rolling monthly. Pick one and they join your standup.",
  },
  quote: {
    key: "quote",
    call: "For UK companies already building a product",
    head: "Quoted £200k to build it? Put an engineer on it from £1,500 a month.",
    sub: "Full time in your repo, building with Claude Code. Your product changes as you build, and that's just the next task, not a new invoice.",
  },
  timeline: {
    key: "timeline",
    call: "For UK companies already building a product",
    head: "Brief us Monday. Three engineer profiles by Wednesday.",
    sub: "A full-time engineer in your repo the week after, from £1,500 a month. No placement fee.",
  },
  available: {
    key: "available",
    call: "Engineers available to start now",
    head: "Full-time engineers, ready to start.",
    sub: "Full time in your repo, building with Claude Code. See three profiles within 48 hours, then pick who starts.",
  },
  prototype: {
    key: "prototype",
    call: "For founders who built it with Claude Code or Cursor",
    head: "Built it yourself? Now make it hold up.",
    sub: "A full-time engineer makes it secure, tested and ready for real users. From £1,500 a month.",
  },
};

// Ad name fragments → variant. Lower-cased substring match on utm_content.
const AD_NAME_HINTS: [string, string][] = [
  ["200k", "quote"],
  ["quote", "quote"],
  ["timeliner", "timeline"],
  ["timeline", "timeline"],
  ["available", "available"],
  ["prototype", "prototype"],
  ["quality", "quality"],
  ["speed", "speed"],
  ["cost", "cost"],
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
  return COST;
}
