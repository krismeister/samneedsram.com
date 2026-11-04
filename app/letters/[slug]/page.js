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
          <Link href="/letters">← All mailers</Link>
        </p>
        <p>{error}</p>
      </>
    );
  }
  if (!letter) return <p>Loading mailer…</p>;

  return (
    <>
      <p>
        <Link href="/letters">← All mailers</Link>
      </p>
      <h1>
        {letter.name} — {letter.gb}GB {letter.ram_type}
      </h1>
      <p>
        {letter.date} · Template: {letter.template}
      </p>
      {letter.donation_says ? (
        <p>
          <em>Donation: {letter.donation_says}</em>
        </p>
      ) : null}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="letter-image"
        src={letter.image}
        alt={`${letter.name} letter image`}
      />
      <div className="button-row">
        <a href={letter.image} target="_blank" rel="noreferrer">
          View full size
        </a>
        <a href={letter.image} download>
          Download image
        </a>
      </div>

      <h2>Cover letter</h2>
      <p className="prose">{letter.cover_letter}</p>

      <h2>Eulogy</h2>
      <p className="prose">{letter.eulogy}</p>

      <footer className="letter-footer">
        {letter.photos?.length ? (
          <ul>
            {letter.photos.map((credit) => (
              <li key={credit}>{credit}</li>
            ))}
          </ul>
        ) : null}
        <p>Powered by Muse.</p>
      </footer>
    </>
  );
}
