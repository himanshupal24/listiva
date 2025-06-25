"use client";
import { useEffect, useState } from "react";

export default function BrandCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/brand-count");
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch brand count:", err);
        setCount(40); // fallback
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="text-center py-10 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold">
        🎉 {count !== null ? count.toLocaleString() : "Loading..."}+ Brands Already Listed!
      </h2>
      <p className="text-gray-600 mt-2">Join the fastest-growing directory of Indian businesses.</p>
    </div>
  );
}
