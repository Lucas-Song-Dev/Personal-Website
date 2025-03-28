import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
