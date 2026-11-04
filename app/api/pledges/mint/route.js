import { NextResponse } from "next/server";
import { validatePledge, signPledge } from "@/lib/pledges";
import { getPledgeSecret } from "@/lib/pledge-pages";
import { PLEDGE_TEMPLATES } from "@/lib/pages.generated";

// POST /api/pledges/mint — validate a pledge, sign it, return its page URL.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errors: ["body must be JSON"] }, { status: 400 });
  }

  const secret = getPledgeSecret();
  if (!secret) {
    return NextResponse.json(
      { errors: ["server misconfigured: set PLEDGE_JWT_SECRET (see .env.example)"] },
      { status: 500 },
    );
  }

  const checked = validatePledge(body);
  if (!checked.ok) {
    return NextResponse.json({ errors: checked.errors }, { status: 400 });
  }
  if (!PLEDGE_TEMPLATES[checked.value.theme]) {
    return NextResponse.json(
      { errors: [`theme "${checked.value.theme}" has no page yet — pick another`] },
      { status: 400 },
    );
  }

  const jwt = signPledge(checked.value, secret);
  return NextResponse.json({
    url: `/pledges/${checked.value.theme}?content=${jwt}`,
  });
}
