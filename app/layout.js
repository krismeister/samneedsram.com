import "./globals.css";

export const metadata = {
  title: "samneedsram.com — Sam's out of memory",
  description:
    "Pledge old RAM sticks and mail them to Sam. Parody project. Not affiliated with OpenAI or Sam Altman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/">samneedsram.com</a>
          <p>Sam&apos;s out of memory. Help him remember.</p>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>
            Parody project. Not affiliated with OpenAI or Sam Altman. Mail to
            the public corporate address only.
          </p>
        </footer>
      </body>
    </html>
  );
}
