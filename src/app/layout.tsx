import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Guardian AI — Student Safety Map",
  description:
    "Real-time campus safety map for students. Report incidents, navigate safe routes, and stay informed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}

