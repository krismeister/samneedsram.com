"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function LetterDetailsPage({ params }) {
  const { slug } = use(params);
  const [letter, setLetter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/letters/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Mailer not found.");
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then(setLetter)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <>
        <p>
          <Link href="/">← All mailers</Link>
        </p>
        <p>{error}</p>
      </>
    );
  }
  if (!letter) return <p>Loading mailer…</p>;

  return (
    <>
      <p>
        <Link href="/">← All mailers</Link>
      </p>
      <h1>
        {letter.name} — {letter.gb}GB {letter.ram_type}
      </h1>
      <p>
        {letter.date} · Template: {letter.template}
      </p>

      <h2>Cover letter</h2>
      <p className="prose">{letter.cover_letter}</p>

      <h2>Eulogy</h2>
      <p className="prose">{letter.eulogy}</p>

      <div className="button-row">
        <a href={letter.pdf} target="_blank" rel="noreferrer">
          View PDF
        </a>
        <a href={letter.pdf} download>
          Download PDF
        </a>
      </div>
      <iframe
        className="pdf-frame"
        src={letter.pdf}
        title={`${letter.name} mailer PDF`}
      />
    </>
  );
}
