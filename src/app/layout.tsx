import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURIC Studio",
  description:
    "Online presence setup, cleanup, modernization, QR contact systems, and reporting support for local businesses.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
