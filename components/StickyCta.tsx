"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./Funnel";

// Mobile only. Price + one button, hidden at the top (the hero has its own
// button) and over the final CTA band, so two identical buttons never stack.
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const final = document.getElementById("final");
    const onScroll = () => {
      const r = final?.getBoundingClientRect();
      const finalInView = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setShow(window.scrollY > 280 && !finalInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[var(--border-subtle)] bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="text-[12px] leading-tight">
        <p className="font-semibold text-navy-900">3 profiles in 48h</p>
        <p className="text-[var(--text-faint)]">No placement fee</p>
      </div>
      <CtaButton className="flex-1 rounded-2xl bg-navy-900 px-5 py-3.5 text-center font-display text-[16px] font-medium text-white shadow-cta">
        Get engineers now
      </CtaButton>
    </div>
  );
}
