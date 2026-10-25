"use client";

import { useEffect, useRef, useState } from "react";

// "What changes" — each benefit is shown as a small product-style graphic
// rather than a line of text, so it reads in a glance on a phone. Graphics
// animate in once (see .bn-* in globals.css). Every claim is one the site
// already makes: profiles in 48 hours, agencies 6–12 weeks (octoglehire.com
// FAQ), your repo + IP in writing, one client at a time, 14 days' notice,
// free swap.

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function SpeedGraphic() {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-[12px] text-steel-600">
          <span>Agency or job advert</span>
          <span className="font-medium">6–12 weeks</span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-ice-200">
          <div className="bn-bar bn-bar-slow h-full rounded-full bg-[#c2414b]/70" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[12px] text-steel-600">
          <span className="font-semibold text-navy-900">Octogle Hire</span>
          <span className="font-semibold text-good">48 hours</span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-ice-200">
          <div className="bn-bar bn-bar-fast h-full rounded-full bg-good" />
        </div>
      </div>
      <p className="font-mono text-[11px] text-[var(--text-faint)]">to see three engineer profiles</p>
    </div>
  );
}

function RepoGraphic() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-white font-mono text-[11px] shadow-card">
      <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] bg-ice-100/70 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-steel-600">your-company / product</span>
        <span className="bn-pop ml-auto shrink-0 rounded-full bg-good/15 px-2 py-0.5 text-[10px] font-semibold text-good">
          Owner: you
        </span>
      </div>
      {["feat: onboarding flow", "fix: payment retries", "test: api coverage"].map((c, i) => (
        <div
          key={c}
          className={`bn-line bn-line-${i} flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2 last:border-b-0`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
          <span className="truncate text-navy-900">{c}</span>
          <span className="ml-auto shrink-0 text-[var(--text-faint)]">your engineer</span>
        </div>
      ))}
    </div>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function FocusGraphic() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1.5">
        {DAYS.map((d, i) => (
          <div key={d} className="text-center">
            <p className="text-[11px] text-steel-600">{d}</p>
            <div
              className={`bn-day bn-day-${i} mt-1 h-16 rounded-lg bg-gradient-to-b from-sky-400 to-navy-900`}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-steel-700">
        <b className="font-semibold text-navy-900">Every day, your product.</b> One client at a time,
        at your standups.
      </p>
    </div>
  );
}

function FlexGraphic() {
  return (
    <div className="space-y-2.5">
      {[
        { label: "Rolling monthly", sub: "14 days' notice" },
        { label: "Not the right fit?", sub: "We swap them, no fee" },
        { label: "Placement fee", sub: "None" },
      ].map((r, i) => (
        <div
          key={r.label}
          className={`bn-row bn-row-${i} flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-white px-3 py-2.5 shadow-card`}
        >
          <div>
            <p className="text-[13px] font-semibold text-navy-900">{r.label}</p>
            <p className="text-[12px] text-steel-600">{r.sub}</p>
          </div>
          <span className="relative h-5 w-9 shrink-0 rounded-full bg-good">
            <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
          </span>
        </div>
      ))}
    </div>
  );
}

const TILES = [
  {
    kicker: "Speed",
    title: "See engineers in 48 hours, not 6 to 12 weeks.",
    Graphic: SpeedGraphic,
  },
  {
    kicker: "Ownership",
    title: "Everything they build lives in your repo.",
    Graphic: RepoGraphic,
  },
  {
    kicker: "Focus",
    title: "Full time on your product. Nobody else's.",
    Graphic: FocusGraphic,
  },
  {
    kicker: "No risk",
    title: "No lock-in, no placement fee, free swap.",
    Graphic: FlexGraphic,
  },
];

export default function Benefits() {
  const { ref, on } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`mt-8 grid gap-4 sm:grid-cols-2 ${on ? "bn-on" : ""}`}>
      {TILES.map(({ kicker, title, Graphic }, i) => (
        <div
          key={kicker}
          className={`bn-tile bn-tile-${i} flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card sm:p-6`}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-sky-600">
            {kicker}
          </p>
          <p className="mt-1.5 font-display text-[20px] font-semibold leading-snug text-navy-900">
            {title}
          </p>
          <div className="mt-5 flex-1 rounded-2xl bg-ice-100/70 p-4">
            <Graphic />
          </div>
        </div>
      ))}
    </div>
  );
}
