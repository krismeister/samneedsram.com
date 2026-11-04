import { NextResponse } from "next/server";
import { getLetterBySlug } from "@/lib/letters";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const letter = await getLetterBySlug(slug);
  if (!letter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(letter);
}
