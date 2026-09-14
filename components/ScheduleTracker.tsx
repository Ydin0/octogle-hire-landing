"use client";

import { useEffect } from "react";

// Fires the Meta "Schedule" conversion when the booking-confirmed page loads,
// mirroring the original booked.html. PageView is already fired by the root layout.
export default function ScheduleTracker() {
  useEffect(() => {
    const fire = () => {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (typeof fbq !== "function") return false;
      const lid =
        new URLSearchParams(window.location.search).get("lid") ||
        String(Date.now());
      fbq(
        "track",
        "Schedule",
        { content_name: "Octogle Hire - Connor" },
        { eventID: "sched_" + lid },
      );
      return true;
    };
    if (fire()) return;
    // fbq may load a beat after hydration; retry briefly.
    const id = setInterval(() => {
      if (fire()) clearInterval(id);
    }, 400);
    const stop = setTimeout(() => clearInterval(id), 5000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, []);
  return null;
}
