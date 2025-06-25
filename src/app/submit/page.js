"use client";
import React, { useState } from "react";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: "", tagline: "", description: "",
    website: "", instagram: "", email: "", phone: "",
    category: "", city: "",
    logo: null, banner: null,
    founderName: "", founderBio: "", highlights: "", faq: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? (files.length > 1 ? files : files[0]) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      const value = formData[key];
      if (Array.isArray(value)) {
        value.forEach((file) => data.append(`${key}[]`, file));
      } else {
        data.append(key, value);
      }
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("✅ Brand submitted successfully!");
        window.location.reload();
      } else {
        const { error } = await res.json();
        alert("❌ Submission failed: " + (error || "Unknown error"));
      }
    } catch (err) {
      console.error("Client error:", err);
      alert("❌ Network/server issue.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Submit Your Brand</h1>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">📌 Brand Basics</h2>
          <input name="name" required placeholder="Brand Name *" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <input name="tagline" placeholder="Short Tagline" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <textarea name="description" placeholder="About Your Brand" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Category & Location */}
        <div>
          <h2 className="text-lg font-semibold mb-2">📍 Category & Location</h2>
          <select name="category" required onChange={handleChange} className="w-full p-2 border rounded mb-3">
            <option value="">-- Select Category --</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="local">Local Business</option>
            <option value="service">Service</option>
          </select>
          <input name="city" placeholder="City" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Media Upload */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🖼️ Media Upload</h2>
          <label className="block text-sm font-medium">Logo (square preferred)</label>
          <input type="file" name="logo" accept="image/*" required onChange={handleChange} className="mb-3" />
          <label className="block text-sm font-medium">Banner Image (wide)</label>
          <input type="file" name="banner" accept="image/*" onChange={handleChange} className="mb-3" />
          {/* <label className="block text-sm font-medium">Gallery Images (2–4)</label>
          <input type="file" name="gallery" accept="image/*" multiple onChange={handleChange} /> */}
        </div>

        {/* Founder Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">👤 Founder Details</h2>
          <input name="founderName" placeholder="Founder Name" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <textarea name="founderBio" placeholder="Founder Bio" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Highlights and FAQ */}
        <div>
          <h2 className="text-lg font-semibold mb-2">✨ Highlights & FAQs</h2>
          <textarea name="highlights" placeholder="Top 3 things about your brand (comma-separated)" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <textarea name="faq" placeholder="FAQ (Use Q: and A: format)" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Social & Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🌐 Links & Contact</h2>
          <input name="website" placeholder="Website URL" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <input name="instagram" placeholder="Instagram URL" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <input name="email" placeholder="Business Email" onChange={handleChange} className="w-full p-2 border rounded mb-3" />
          <input name="phone" placeholder="Business Phone (optional)" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Submit Brand
          </button>
        </div>
      </form>
    </div>
  );
}
