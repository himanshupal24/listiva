"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem("admin-auth");
    if (!isAuthed) router.push("/admin");

    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const handleAction = async (id, action) => {
    setLoading(true);
    const res = await fetch("/api/admin/update-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });

    if (res.ok) {
      const updated = await res.json();
      setBrands(updated);
    } else {
      alert("Failed to update brand.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {brands.length === 0 ? (
        <p className="text-gray-500">No brand submissions yet.</p>
      ) : (
        <div className="grid gap-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="border p-4 rounded-lg bg-white shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{brand.name}</h2>
                <p className="text-sm text-gray-600">
                  {brand.category} • {new Date(brand.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{brand.city}</p>
                <div className="mt-2 space-x-2">
                  {brand.isApproved && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Approved
                    </span>
                  )}
                  {brand.isFeatured && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {brand.isBrandOfTheDay && (
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      Brand of the Day
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {!brand.isApproved ? (
                  <button
                    onClick={() => handleAction(brand._id, "approve")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(brand._id, "reject")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Unapprove
                  </button>
                )}

                <button
                  onClick={() => handleAction(brand._id, "toggleFeatured")}
                  className={`${
                    brand.isFeatured ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-3 py-1 rounded`}
                >
                  {brand.isFeatured ? "Unfeature" : "Feature"}
                </button>

                <button
                  onClick={() => handleAction(brand._id, "makeBrandOfTheDay")}
                  className={`${
                    brand.isBrandOfTheDay
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-purple-500 hover:bg-purple-600"
                  } text-white px-3 py-1 rounded`}
                >
                  {brand.isBrandOfTheDay ? "Brand of the Day ✅" : "Make Brand of the Day"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-center text-sm text-gray-400 mt-4">Updating brand status...</p>
      )}
    </div>
  );
}
