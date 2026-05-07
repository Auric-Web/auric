import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURIC Studio",
  description:
    "Online presence, modernization, monthly advertising, and reporting systems.",
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