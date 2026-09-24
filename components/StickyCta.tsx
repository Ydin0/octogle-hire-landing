"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./Funnel";

export default function StickyCta() {
  const [show, setShow] = useState(false);

  // Visible whenever the hero's first question is off screen, so there is
  // always one tap to start the funnel. (Previously only after 560px of
  // scroll, which left mobile visitors with no action at all.)
  useEffect(() => {
    const start = document.getElementById("start");
    if (!start) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(start);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[rgba(255,255,255,.82)] px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <CtaButton className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-900 px-6 py-4 font-display text-[16px] font-medium text-white shadow-cta">
        See 3 engineers <span aria-hidden>→</span> 48 hours
      </CtaButton>
      <p className="mt-2 text-center text-[12px] text-[var(--text-faint)]">
        No placement fee · No commitment to view
      </p>
    </div>
  );
}
