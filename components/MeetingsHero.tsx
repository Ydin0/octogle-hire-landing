"use client";

import { useState, type ReactNode } from "react";
import PlaybookForm, { type Door } from "@/components/PlaybookForm";

// The hero grid: headline and "what's inside" on the left, the form on the
// right. Once the visitor opts in, the left side drops away and the calendar
// gets the full width.
export default function MeetingsHero({
  intro,
  inside,
  market,
  pdf,
  headline,
  initialDoor,
  agencyHeadline,
}: {
  intro: ReactNode;
  inside: ReactNode;
  market: "uk" | "us";
  pdf: string;
  headline: string;
  initialDoor: Door | null;
  agencyHeadline: boolean;
}) {
  const [done, setDone] = useState(false);

  const form = (
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
  );

  // One tree for both states, so the form keeps its answers when it flips to the thank-you screen.
  return (
    <section
      className={
        done
          ? "mx-auto max-w-content px-5 pb-14 pt-4 sm:px-8 md:pt-8"
          : "mx-auto grid max-w-content items-start gap-8 px-5 pb-14 pt-4 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:gap-x-10 md:gap-y-6 md:pt-10"
      }
    >
      {!done && intro}
      {/* Form beside the headline on desktop, straight under it on a phone. */}
      <div
        className={
          done
            ? "rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card sm:p-8"
            : "rounded-3xl border border-[var(--border-subtle)] bg-white p-5 shadow-card sm:p-6 md:col-start-2 md:row-span-2 md:row-start-1"
        }
      >
        {form}
      </div>
      {!done && <div className="md:col-start-1 md:row-start-2">{inside}</div>}
    </section>
  );
}
