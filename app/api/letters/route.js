import { NextResponse } from "next/server";
import { readLetters } from "@/lib/letters";

export async function GET() {
  const letters = await readLetters();
  return NextResponse.json(letters);
}
