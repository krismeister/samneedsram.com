import Link from "next/link";

export default function LetterCard({ letter }) {
  return (
    <li className="letter-card">
      <Link href={`/letters/${letter.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={letter.thumbnail}
          alt={`${letter.name} mailer thumbnail`}
          width={200}
          height={200}
          loading="lazy"
        />
        <div>
          <h2>
            {letter.name} — {letter.gb}GB {letter.ram_type}
          </h2>
          <p className="meta">{letter.date}</p>
          <p>{letter.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
