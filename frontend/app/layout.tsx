import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import Navbar from "../components/Navbar";
import CompareBar from "../components/CompareBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduDiscover - Find Your Dream College",
  description: "Discover, compare, and get insights on top colleges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}
