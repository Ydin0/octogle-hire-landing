"use client";

import { useState } from "react";
import { FAQS } from "./faqData";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
      {FAQS.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[19px] font-medium leading-snug text-navy-900 sm:text-[21px]">
                {item.q}
              </span>
              <span
                className={`mt-1 shrink-0 text-steel-500 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-steel-700">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
