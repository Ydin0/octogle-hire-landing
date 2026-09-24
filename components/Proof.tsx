// Third-party trust signals: Clutch, ISO 27001, client logos. These carry more
// weight than anything we say about ourselves, so they sit right under the
// first question in the hero.

const CLUTCH_URL = "https://clutch.co/profile/octogle-technologies";
const ISO_URL =
  "https://www.iafcertsearch.org/certified-entity/YgnCzSQq4p76plJ5hUNVNd5C";

// Client logos, same set as octoglehire.com minus our own portfolio brands.
export const CLIENT_LOGOS = [
  { src: "/logos/1VA.svg", alt: "1VA" },
  { src: "/logos/Beekey.svg", alt: "Beekey" },
  { src: "/logos/Hireflow.svg", alt: "Hireflow" },
  { src: "/logos/Solidus.svg", alt: "Solidus" },
  { src: "/logos/SquareLogik.svg", alt: "SquareLogik" },
  { src: "/logos/thecareapp.svg", alt: "The Care App" },
  { src: "/logos/DNO-Investments.svg", alt: "DNO Investments" },
  { src: "/logos/Unichats.svg", alt: "Unichats" },
  { src: "/logos/Workchats.svg", alt: "Workchats" },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#E41E2E]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href={CLUTCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[14px] text-steel-700 transition hover:text-navy-900"
      >
        <Stars />
        <span className="font-semibold text-navy-900">5.0</span>
        <span>on</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/proof/clutch.svg" alt="Clutch" className="h-[14px] w-auto text-navy-900" />
        <span className="text-[var(--text-faint)]">12 reviews</span>
      </a>
      <a
        href={ISO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-steel-700 transition hover:text-navy-900"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l7 3v5.5c0 4.3-3 8.2-7 9.5-4-1.3-7-5.2-7-9.5V6l7-3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ISO 27001 certified
      </a>
    </div>
  );
}

export function LogoStrip() {
  return (
    <div>
      <p className="mb-4 text-[13px] font-medium text-steel-600">
        Engineers embedded at
      </p>
      <div className="grid grid-cols-3 items-center gap-x-6 gap-y-5 sm:grid-cols-5 lg:grid-cols-9">
        {CLIENT_LOGOS.map((l) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={l.src}
            src={l.src}
            alt={l.alt}
            // Solid silhouettes: several logos are white/light and vanish
            // under a plain grayscale on this background.
            className="h-6 w-auto max-w-full object-contain opacity-55 brightness-0"
          />
        ))}
      </div>
    </div>
  );
}
