"use client";

import { useEffect, useState } from "react";
import LetterCard from "@/components/LetterCard";

export default function HomePage() {
  const [letters, setLetters] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/letters")
      .then((res) => {
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then(setLetters)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Could not load mailers: {error}</p>;
  if (!letters) return <p>Loading mailers…</p>;
  if (letters.length === 0) {
    return (
      <>
        <h1>Mailers</h1>
        <p>
          No mailers yet — the generator hasn&apos;t written{" "}
          <code>public/static-mailers/letters.json</code> into this repo.
        </p>
      </>
    );
  }

  const totalGb = letters.reduce((sum, item) => sum + (item.gb ?? 0), 0);

  return (
    <>
      <h1>Mailers</h1>
      <p>
        {letters.length} {letters.length === 1 ? "donation" : "donations"} ·{" "}
        {totalGb}GB pledged
      </p>
      <ul className="letter-list">
        {letters.map((letter) => (
          <LetterCard key={letter.slug} letter={letter} />
        ))}
      </ul>
    </>
  );
}
