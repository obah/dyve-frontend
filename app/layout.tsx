import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryClientWrapper } from "@/providers/QueryClientWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dyve - The Entire Prediction Market. One Interface.",
  description:
    "Stop switching tabs. Discover, analyze, and trade across Polymarket, Kalshi, and Crypto.com from a single, unified dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} bg-background text-foreground font-sans antialiased`}
      >
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
