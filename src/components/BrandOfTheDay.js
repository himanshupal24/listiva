"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const fallbackBrand = {
  name: "Studio Belle",
  slug: "studio-belle",
  logoUrl: "/logos/belle.png",
  category: "Beauty",
  description: "Luxury skincare handmade in India.",
};

export default function BrandOfTheDay() {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch("/api/brand-of-the-day");
        const data = await res.json();
        setBrand(data?.brand || fallbackBrand);
      } catch (err) {
        console.error("Error loading Brand of the Day:", err);
        setBrand(fallbackBrand);
      }
    };

    fetchBrand();
  }, []);

  if (!brand) return null;

  return (
    <section className="px-4 py-10 bg-gray-50">
      <h3 className="text-2xl font-bold text-center mb-8">🔥 Brand of the Day</h3>

      <Link
        href={`/brand/${brand.slug}`}
        className="block max-w-md mx-auto transition transform hover:scale-[1.02]"
      >
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center">
          <img
            src={brand.logoUrl || "/placeholder.png"}
            alt={brand.name}
            className="w-20 h-20 rounded-full mx-auto object-cover border mb-4 bg-white"
          />
          <h4 className="text-xl font-semibold">{brand.name}</h4>
          <p className="text-sm text-gray-600">{brand.category}</p>
          <span className="inline-block mt-4 text-blue-600 text-sm underline">
            View Full Profile →
          </span>
        </div>
      </Link>
    </section>
  );
}
