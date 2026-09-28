import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

// Leadey inbound webhook for the "Landing Page (try.octoglehire.com)" campaign
// (funnel_mulcjxi1uponf3). Set in Vercel, never in code: the repo is public
// and the URL carries the token. The previous campaign was deleted in Leadey
// on ~2026-09-27, which silently 401'd every lead until this was repointed.
const WEBHOOK_URL = process.env.LEADEY_LP_WEBHOOK_URL;

// If Leadey refuses a lead, keep enough in the logs to recover it by hand.
function logLostLead(reason: string, p: Record<string, unknown>) {
  console.error(
    "[lead] LOST LEAD, recover manually:",
    reason,
    JSON.stringify({
      name: p.name,
      email: p.email,
      phone: p.phone,
      company: p.company,
      build: p.build,
      status: p.status,
      submitted_at: p.submitted_at,
    }),
  );
}

// Meta Conversions API. Inactive until META_CAPI_TOKEN is set in Vercel
// (Events Manager > dataset 1614640659743336 > Settings > Generate access
// token). META_CAPI_TEST_CODE routes events to Test Events while checking.
const META_PIXEL_ID = "1614640659743336";
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const META_CAPI_TEST_CODE = process.env.META_CAPI_TEST_CODE;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function readCookie(header: string | null, name: string) {
  const m = header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Server-side twin of the browser Lead event. Same event_id as the pixel's
 * Lead (the funnel's eventId), so Meta keeps one and discards the other, but
 * it survives ad blockers, iOS tracking limits and in-app browsers that drop
 * the pixel. Never throws: tracking must not break lead capture.
 */
async function sendCapiLead(
  req: Request,
  body: Record<string, unknown>,
  user: { email: string; firstName?: string; lastName?: string; phone: string },
) {
  if (!META_CAPI_TOKEN) return;
  const eventId = typeof body.event_id === "string" ? body.event_id : undefined;
  if (!eventId) return;

  const cookies = req.headers.get("cookie");
  const page = typeof body.page === "string" ? body.page : undefined;
  let fbc = readCookie(cookies, "_fbc");
  if (!fbc && page) {
    const fbclid = new URL(page).searchParams.get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const phone = user.phone.replace(/\D/g, "");

  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp: readCookie(cookies, "_fbp"),
    fbc,
  };
  if (user.email) userData.em = [sha256(user.email.toLowerCase())];
  if (phone) userData.ph = [sha256(phone)];
  if (user.firstName) userData.fn = [sha256(user.firstName.toLowerCase())];
  if (user.lastName) userData.ln = [sha256(user.lastName.toLowerCase())];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: page,
        user_data: userData,
        custom_data: { content_category: body.build },
      },
    ],
  };
  if (META_CAPI_TEST_CODE) payload.test_event_code = META_CAPI_TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );
    if (!res.ok) console.error("[lead] CAPI rejected", res.status, await res.text());
  } catch (err) {
    console.error("[lead] CAPI unreachable", err);
  }
}

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

  // The browser Lead fires at the contact step, which is the "partial" post.
  const capi =
    body.status === "partial"
      ? sendCapiLead(req, body, {
          email,
          firstName: firstName || undefined,
          lastName: rest.join(" ") || undefined,
          phone: str(body.phone),
        })
      : Promise.resolve();

  if (!WEBHOOK_URL) {
    logLostLead("LEADEY_LP_WEBHOOK_URL not set", payload);
    await capi;
    return NextResponse.json({ ok: false }, { status: 500 });
  }

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
      logLostLead(`Leadey ${res.status}`, payload);
      await capi;
      return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    }
    await capi;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Leadey unreachable", err);
    logLostLead("Leadey unreachable", payload);
    await capi;
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
