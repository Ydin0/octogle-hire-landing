import { NextResponse } from "next/server";

// Leadey inbound webhook for the "OctogleHire — Inbound — Landing Page" campaign.
// Env override so the token can be rotated without a code change.
const WEBHOOK_URL =
  process.env.LEADEY_LP_WEBHOOK_URL ??
  "https://backend.leadey.ai/webhooks/funnels/funnel_mtukds7fvcp7yz/leads?token=whk_mtukds7l2028s9";

/**
 * Server-side relay from the funnel to Leadey.
 *
 * The browser used to POST straight to Leadey with `mode: "no-cors"`, which
 * forces a text/plain body. Leadey only parses JSON, so every lead came back
 * 422 "payload empty" and the opaque no-cors response hid the failure: the
 * campaign sat at 0 leads while visitors saw a success screen. Relaying here
 * lets us send real JSON and see Leadey's answer.
 *
 * Leadey does not split a full name, so we send firstName/lastName, and it
 * blanks `company` when it equals the person's name, so we disambiguate that.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const email = str(body.email);
  if (!name && !email) {
    return NextResponse.json({ ok: false, error: "name or email required" }, { status: 422 });
  }

  const [firstName, ...rest] = name.split(/\s+/);
  let company = str(body.company);
  if (company && company.toLowerCase() === name.toLowerCase()) {
    company = `${company} (Lead)`;
  }

  const payload: Record<string, unknown> = {
    ...body,
    firstName: firstName || undefined,
    lastName: rest.join(" ") || undefined,
    company: company || undefined,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[lead] Leadey rejected lead", res.status, detail);
      return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Leadey unreachable", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
