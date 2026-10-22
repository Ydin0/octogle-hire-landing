// Ad-matched heroes. The headline has to repeat the promise of the ad that was
// clicked, so someone who tapped "Quoted £200k?" sees £200k in the first
// three seconds. Everything below the hero stays the same, so a variant test
// only ever changes the one thing.
//
// Picked by ?v=<key>, or failing that by matching utm_content (the ad name,
// sent as utm_content={{ad.name}}), so existing ads match without new links.

export type HeroVariant = {
  key: string;
  eyebrow: string;
  /** Plain lead-in, then the gradient punchline. */
  lead: string;
  punch: string;
  sub: string;
};

const DEFAULT: HeroVariant = {
  key: "default",
  eyebrow: "For UK founders building their own software",
  lead: "A full-time engineer, embedded in your team.",
  punch: "From £1,500 a month.",
  sub: "In your repo, on your standups. See three profiles within 48 hours.",
};

export const HERO_VARIANTS: Record<string, HeroVariant> = {
  default: DEFAULT,
  quote: {
    key: "quote",
    eyebrow: "For UK companies already building a product",
    lead: "Quoted £200k to build it?",
    punch: "Put an AI engineer on it from £1,500 a month.",
    sub: "Full time in your repo, building with Claude Code. See three profiles within 48 hours.",
  },
  available: {
    key: "available",
    eyebrow: "Engineers available to start now",
    lead: "Vetted AI engineers, ready to start.",
    punch: "From £1,500 a month.",
    sub: "Full time in your repo, building with Claude Code. See three profiles within 48 hours.",
  },
  timeline: {
    key: "timeline",
    eyebrow: "For UK companies already building a product",
    lead: "Brief us Monday.",
    punch: "Three engineer profiles by Wednesday.",
    sub: "A full-time AI engineer in your repo the week after. From £1,500 a month.",
  },
  prototype: {
    key: "prototype",
    eyebrow: "For founders who built it with Claude Code or Cursor",
    lead: "Built it yourself?",
    punch: "Now make it hold up.",
    sub: "A full-time AI engineer makes it secure, tested and ready for real users. From £1,500 a month.",
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
  return DEFAULT;
}
