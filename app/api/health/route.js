import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Proves app -> Firestore connectivity and IAM. Reading a possibly-missing
// doc still succeeds when connected, so no seed data is required.
export async function GET() {
  try {
    const snap = await getDb().doc("meta/ping").get();
    return NextResponse.json({
      ok: true,
      firestore: "connected",
      pingExists: snap.exists,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, firestore: "unreachable", error: err.message },
      { status: 500 },
    );
  }
}
