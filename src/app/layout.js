import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Listiva – Global Brand Directory",
  description:
    "Listiva is a curated platform to discover and promote brands from around the world. Get your business listed forever and reach thousands of real users looking for trusted brands across fashion, food, local, and service categories.",
  openGraph: {
    title: "Listiva – Discover & Promote Brands",
    description:
      "Join 100+ brands on Listiva – a trusted directory for global local businesses. One-time listing. No renewals.",
    url: "https://listiva.vercel.app", // Update with your actual domain
    siteName: "Listiva",
    images: [
      {
        url: "/og-image.png", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Listiva – Global Brand Directory",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listiva – Discover & Promote Brands",
    description:
      "Join 100+ brands on Listiva – a trusted directory for global local businesses. One-time listing. No renewals.",
    images: ["/og-image.png"], // Replace with your OG image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
