"use client";

import { useEffect, useState } from "react";

// Call-to-action buttons further down the page. They scroll back to the hero
// form and open the chosen door there, so every lead goes through one form.
function go(door: "book" | "playbook") {
  document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  window.dispatchEvent(new CustomEvent("sdr:door", { detail: door }));
}

export function DoorButtons({ dark = false, stack = false }: { dark?: boolean; stack?: boolean }) {
  return (
    <div className={stack ? "flex max-w-[22rem] flex-col gap-3" : "flex flex-col gap-3 sm:flex-row"}>
      <button
        type="button"
        onClick={() => go("book")}
        className="rounded-2xl bg-sky-400 px-7 py-4 font-display text-[17px] font-semibold text-navy-950 shadow-cta transition hover:bg-sky-300"
      >
        Book a 15-min call with Connor
      </button>
      <button
        type="button"
        onClick={() => go("playbook")}
        className={
          dark
            ? "rounded-2xl border border-white/25 px-7 py-4 font-display text-[16px] font-medium text-white transition hover:border-white/60"
            : "rounded-2xl border border-[var(--border-default)] bg-white px-7 py-4 font-display text-[16px] font-medium text-navy-900 transition hover:border-sky-500"
        }
      >
        Get the free playbook
      </button>
    </div>
  );
}

// Pinned bar on phones once the hero form has scrolled out of view.
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.getElementById("start");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 p-3 backdrop-blur md:hidden">
      <button
        type="button"
        onClick={() => go("book")}
        className="w-full rounded-xl bg-sky-400 py-3.5 font-display text-[16px] font-semibold text-navy-950"
      >
        Book a 15-min call with Connor
      </button>
    </div>
  );
}
