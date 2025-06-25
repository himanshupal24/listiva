"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApprovedPreview() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await fetch("/api/brands/preview");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Failed to load approved brands preview");
      }
    };
    fetchApproved();
  }, []);

  if (!brands || brands.length === 0) return null;

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">✅ Approved Brands</h3>
        <Link href="/explore" className="text-sm text-blue-600 hover:underline">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brand/${brand.slug}`}
            className="border rounded-lg p-4 text-center bg-white shadow hover:shadow-md transition"
          >
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <h4 className="font-bold">{brand.name}</h4>
            <p className="text-sm text-gray-500">{brand.category}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
