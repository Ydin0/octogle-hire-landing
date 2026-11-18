"use client";

import { useState, type ReactNode } from "react";
import PlaybookForm, { type Door } from "@/components/PlaybookForm";

// The dark hero: headline and form on the left, the product on the right. Once
// the visitor opts in, the headline and visual drop away and the calendar gets
// the full width. One tree for both states, so the form keeps its answers.
export default function MeetingsHero({
  intro,
  after,
  visual,
  market,
  pdf,
  headline,
  initialDoor,
  agencyHeadline,
}: {
  intro: ReactNode;
  after: ReactNode;
  visual: ReactNode;
  market: "uk" | "us";
  pdf: string;
  headline: string;
  initialDoor: Door | null;
  agencyHeadline: boolean;
}) {
  const [done, setDone] = useState(false);

  return (
    <section id="start" className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(102,184,214,.28),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgba(74,141,181,.22),transparent_70%)]"
      />
      <div
        className={
          done
            ? "relative mx-auto max-w-content px-5 pb-16 pt-4 sm:px-8 md:pt-6"
            : "relative mx-auto grid max-w-content items-start gap-10 px-5 pb-16 pt-2 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:pb-24 md:pt-8"
        }
      >
        <div>
          {!done && intro}
          <div
            className={
              done
                ? "rounded-3xl bg-white p-5 text-navy-900 shadow-cta sm:p-8"
                : "mt-7 max-w-[30rem] rounded-3xl bg-white p-5 text-navy-900 shadow-cta sm:p-6"
            }
          >
            <PlaybookForm
              market={market}
              pdf={pdf}
              headline={headline}
              initialDoor={initialDoor}
              agencyHeadline={agencyHeadline}
              onDone={() => {
                setDone(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
          {!done && after}
        </div>
        {!done && visual}
      </div>
    </section>
  );
}
