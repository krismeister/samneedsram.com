import { UMAMI_SCRIPT_SRC, UMAMI_WEBSITE_ID } from "@/lib/site-head";
import "./globals.css";

export const metadata = {
  title: "Sam Needs Your RAM",
  description:
    "The superintelligence must feed. Pledge your old sticks and mail them to Sam.",
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
            Mail to the public corporate address only.
          </p>
        </footer>
        <script
          defer
          src={UMAMI_SCRIPT_SRC}
          data-website-id={UMAMI_WEBSITE_ID}
        />
      </body>
    </html>
  );
}
