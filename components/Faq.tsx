"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Why is it so much cheaper than a local hire?",
    a: "Our engineers work from our own office in India, so you're not paying UK payroll, NI, benefits, and overhead on top of a salary. Same senior work, embedded in your team. You do the maths on the two numbers above.",
  },
  {
    q: "Is this outsourcing or freelancers?",
    a: "Neither. It's one full time engineer working on one client at a time, from our office, on your standups. Your product, your repo, your ownership. Not a marketplace, not a project handed back on completion.",
  },
  {
    q: "What if the engineer isn't the right fit?",
    a: "You see three profiles before anything starts, so you choose. If it isn't working, we swap them. No placement fee either way.",
  },
  {
    q: "How fast can someone actually start?",
    a: "Profiles in 48 hours. Once you pick, they're embedded in your team from week one.",
  },
  {
    q: "I already paid an agency and got burned.",
    a: "A build quote runs £50,000 to £200,000, they hand you a repo, then they're gone. Here the engineer just works for you, ongoing, and everything stays yours.",
  },
];

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
