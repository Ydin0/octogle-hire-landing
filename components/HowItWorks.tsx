"use client";

import { useEffect, useRef, useState } from "react";

// Three steps that play in sequence when the section scrolls into view: the
// timeline draws, each node lands, then its card and mini visual animate.
// Everything is CSS (see .hiw-* in globals.css) and switches off under
// prefers-reduced-motion. Engineer photos are the real, signed-off ones.

const STEPS = [
  {
    when: "Today",
    title: "Tell us what you need",
    body: "Two taps and your email. Then a 15-minute call with Connor.",
  },
  {
    when: "Within 48 hours",
    title: "Three real profiles",
    body: "In your inbox. Interview the ones you like.",
  },
  {
    when: "The week after",
    title: "They start shipping",
    body: "In your repo and standups. One monthly invoice.",
  },
];

// Step 1: the actual two-tap brief from the popup, as a mini UI.
function BriefVisual() {
  return (
    <div className="flex h-36 items-center justify-center px-3">
      <div className="w-full max-w-[230px] rounded-2xl border border-[var(--border-subtle)] bg-white p-3 shadow-card">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-steel-500">Level</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {["Junior", "Mid", "Senior"].map((l) => (
            <span
              key={l}
              className={
                "rounded-md px-1 py-1 text-center text-[11px] font-medium " +
                (l === "Mid" ? "hiw-pick bg-navy-900 text-white" : "bg-ice-100 text-steel-700")
              }
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-wide text-steel-500">Start</p>
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          {["ASAP", "This month"].map((l) => (
            <span
              key={l}
              className={
                "rounded-md px-1 py-1 text-center text-[11px] font-medium " +
                (l === "ASAP" ? "hiw-pick hiw-pick-2 bg-navy-900 text-white" : "bg-ice-100 text-steel-700")
              }
            >
              {l}
            </span>
          ))}
        </div>
        <span className="hiw-pop mt-2.5 block rounded-lg bg-good py-1.5 text-center text-[11px] font-semibold text-white">
          Sent ✓
        </span>
      </div>
    </div>
  );
}

const FACES = ["/engineers/priya.jpg", "/engineers/rohit.jpg", "/engineers/prasanna.jpg"];

function ProfilesVisual() {
  return (
    <div className="relative flex h-36 items-center justify-center">
      {FACES.map((src, i) => (
        <div
          key={src}
          className={`hiw-card hiw-card-${i} absolute w-[88px] rounded-2xl border border-[var(--border-subtle)] bg-white p-1.5 shadow-card`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={62}
            height={62}
            loading="lazy"
            className="aspect-square w-full rounded-xl object-cover object-[center_35%]"
          />
          <span className="mx-auto mt-1.5 block h-1.5 w-10 rounded-full bg-ice-300" />
          <span className="mx-auto mt-1 block h-1.5 w-7 rounded-full bg-ice-200" />
        </div>
      ))}
      <span className="hiw-pop hiw-pop-late absolute -top-1 right-[14%] grid h-7 w-7 place-items-center rounded-full bg-good text-[12px] font-bold text-white shadow-card">
        3
      </span>
    </div>
  );
}

function ShipVisual() {
  return (
    <div className="flex h-36 flex-col justify-center gap-2 px-2">
      {[
        { msg: "feat: checkout flow", w: "w-[78%]" },
        { msg: "fix: auth redirect", w: "w-[64%]" },
        { msg: "test: billing webhooks", w: "w-[86%]" },
      ].map((c, i) => (
        <div
          key={c.msg}
          className={`hiw-commit hiw-commit-${i} flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-white px-2.5 py-1.5 shadow-card`}
        >
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-good/15 text-good">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={`truncate font-mono text-[11px] text-navy-900 ${c.w}`}>{c.msg}</span>
          <span className="ml-auto shrink-0 rounded-full bg-[#8250df]/12 px-1.5 py-0.5 text-[10px] font-semibold text-[#8250df]">
            merged
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = [BriefVisual, ProfilesVisual, ShipVisual];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hiw relative mt-8 ${on ? "hiw-on" : ""}`}>
      {/* Timeline: horizontal on desktop, vertical on mobile. */}
      <div className="absolute left-[19px] top-2 bottom-2 w-[3px] rounded-full bg-ice-300 md:left-[calc(16.66%)] md:right-[calc(16.66%)] md:top-[19px] md:bottom-auto md:h-[3px] md:w-auto">
        <div className="hiw-line h-full w-full rounded-full bg-gradient-to-b from-sky-400 to-navy-900 md:bg-gradient-to-r" />
      </div>

      <ol className="relative grid gap-6 md:grid-cols-3 md:gap-5">
        {STEPS.map((s, i) => {
          const Visual = VISUALS[i];
          return (
            <li key={s.title} className={`hiw-step hiw-step-${i} flex min-w-0 gap-4 md:flex-col md:items-center md:gap-5`}>
              <span className="hiw-node relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-[15px] font-semibold text-white ring-[6px] ring-ice-100">
                {i + 1}
              </span>
              <div className="hiw-body w-full min-w-0 rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card transition-shadow hover:shadow-glow">
                <div className="rounded-2xl bg-ice-100/70">
                  <Visual />
                </div>
                <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-sky-600">
                  {s.when}
                </p>
                <p className="mt-1 font-display text-[19px] font-semibold text-navy-900">{s.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-steel-700">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
