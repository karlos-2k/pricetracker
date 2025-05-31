// Import necessary dependencies
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Initialize Geist Sans font with Latin subset
// This font will be used as the primary sans-serif font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Initialize Geist Mono font for monospace text
// This font will be used for code or monospaced content
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for the application
// This will be used for SEO and browser tab information
export const metadata: Metadata = {
  title: "Price-Tracker",
  description: "Save money by tracking prices on your favorite products."
};

// Root layout component that wraps all pages
// This component provides the basic HTML structure and global styling
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Apply font variables and anti-aliasing for better text rendering
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Main container with maximum width and auto margins */}
        <main className="max-w-10xl mx-auto">
          {/* Global navigation bar */}
          <Navbar />
          {/* Render page content */}
          {children}
        </main>
      </body>
    </html>
  );
}
