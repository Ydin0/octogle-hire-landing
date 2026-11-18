import type { Metadata } from "next";
import MeetingsLanding from "@/components/MeetingsLanding";

export const metadata: Metadata = {
  title: "The one-rep meeting machine | Octogle Hire",
  description: "Free playbook: how one sales rep books 20+ meetings a month on the phone.",
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <MeetingsLanding market="uk" params={await searchParams} />;
}
