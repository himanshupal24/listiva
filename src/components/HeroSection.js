"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        Discover & Promote the World’s Brightest Brands
      </h1>

      <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-2xl mx-auto">
        Give your brand the spotlight it deserves — be seen by thousands of real people discovering amazing businesses every day.
      </p>

      <a
        href="https://wa.me/919971686542?text=Hi%20👋%2C%20I%27m%20interested%20in%20listing%20my%20brand%20on%20Listiva.%20Please%20share%20the%20next%20steps%3A"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition shadow-md">
          💬 Enquire on WhatsApp
        </button>
      </a>

      <p className="mt-4 text-sm text-gray-500">
        50+ brands onboarded • One-time listing • No renewals, no hassle
      </p>
    </section>
  );
}
