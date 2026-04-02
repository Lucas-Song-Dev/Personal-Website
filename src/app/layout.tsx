import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** Bundled from `public/fonts` — avoids runtime fetch to fonts.googleapis.com. */
const inter = localFont({
  src: "../../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lucas Song- Full Stack Developer",
  description:
    "Computer Engineering@UBC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} select-none bg-background font-main text-text text-responsive-h5`}
      >
        {children}
      </body>
    </html>
  );
}
