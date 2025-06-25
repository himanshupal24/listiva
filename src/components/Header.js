"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [brandCount, setBrandCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const targetCount = 100;

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/brand-count");
        const data = await res.json();
        setBrandCount(data.count || 0);
      } catch (err) {
        console.error("Error fetching brand count", err);
      }
    };
    fetchCount();
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
         Listiva
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/explore" className="hover:text-blue-600">Explore</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
            🎯 {brandCount}/{targetCount} brands listed!
          </span>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <Link href="/" className="block py-2 hover:text-blue-600">Home</Link>
          <Link href="/explore" className="block py-2 hover:text-blue-600">Explore</Link>
          <Link href="/contact" className="block py-2 hover:text-blue-600">Contact</Link>
          <div className="mt-2 text-sm text-center bg-black text-white py-1 rounded">
            🎯 {brandCount}/{targetCount} brands listed!
          </div>
        </div>
      )}
    </header>
  );
}
