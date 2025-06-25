"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const fallbackBrands = [
  {
    name: "SugarCo",
    slug: "sugarco",
    logo: "/logos/sugarco.png",
    category: "Fashion",
  },
  {
    name: "Tandoori Treats",
    slug: "tandoori-treats",
    logo: "/logos/tandoori.png",
    category: "Food",
  },
];

export default function FeaturedBrands() {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/featured-brands");
        const data = await res.json();
        setBrands(data?.brands || fallbackBrands);
      } catch (err) {
        console.error("Error fetching featured brands:", err);
        setBrands(fallbackBrands);
      }
    };

    fetchFeatured();
  }, []);

  if (!brands) return null;

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">🌟 Featured Brands</h3>
        <Link
          href="/explore"
          className="text-sm text-blue-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Grid for desktop + scroll on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 overflow-x-auto scrollbar-hide">
        {brands.map((brand, index) => (
          <Link
            href={`/brand/${brand.slug}`}
            key={index}
            className="group bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 min-w-[150px]"
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden group-hover:scale-105 transition">
              <img
                src={brand.logoUrl || brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="font-semibold text-gray-800 group-hover:text-black">
              {brand.name}
            </h4>
            <p className="text-xs text-gray-500">{brand.category}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
