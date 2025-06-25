"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ExplorePage() {
  const [brands, setBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getCategoryEmoji = (category) => {
    switch (category) {
      case "fashion":
        return "👗";
      case "food":
        return "🍔";
      case "local":
        return "🏬";
      case "service":
        return "🧴";
      default:
        return "🏷️";
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/brands?page=${page}`);
        const data = await res.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setBrands((prev) => {
            const existingIds = new Set(prev.map((b) => b._id));
            const newItems = data.filter((b) => !existingIds.has(b._id));
            return [...prev, ...newItems];
          });
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [page]);

  const filtered = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase()) &&
      (category ? brand.category === category : true)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Brands</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
          <option value="local">Local</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No brands found.
          </p>
        ) : (
          filtered.map((brand) => (
            <Link
              key={brand._id}
              href={`/brand/${brand.slug}`}
              className="border p-4 rounded bg-white text-center shadow hover:shadow-md transition"
            >
              <img
                src={brand.logoUrl || "/placeholder-logo.png"}
                alt={brand.name}
                className="w-16 h-16 mx-auto object-contain mb-2 rounded"
              />
              <h3 className="font-bold text-sm sm:text-base">{brand.name}</h3>
              <p className="text-xs text-gray-500">
                {getCategoryEmoji(brand.category)} {brand.category}
              </p>
            </Link>
          ))
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
