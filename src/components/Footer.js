import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Logo or Brand Name */}
        <div>
          <h2 className="text-xl font-bold text-black">Listiva</h2>
          <p className="text-sm mt-1 text-gray-500">Connecting you with India’s finest local brands.</p>
          <p className="text-sm mt-1 text-gray-500">Join 100s of Brands Growing with Listiva</p>
          <p className="text-sm mt-1 text-gray-500">The Premium Home for Indian Startups & Local Brands</p>
          <p className="text-sm mt-1 text-gray-500">List Smarter. Grow Faster.</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link href="/" className="block hover:underline">Home</Link>
          <Link href="/explore" className="block hover:underline">Explore Brands</Link>
          <Link href="/contact" className="block hover:underline">Contact Us</Link>
        </div>

        {/* WhatsApp CTA */}
        <div>
          <p className="text-sm font-medium mb-2">Have questions?</p>
          <a
            href="https://wa.me/919971686542?text=Hi%20👋%2C%20I%27m%20interested%20in%20listing%20my%20brand%20on%20Listiva.%20Please%20share%20the%20next%20steps%3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            📞 Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
        © {new Date().getFullYear()} Listiva • All rights reserved.
      </div>
    </footer>
  );
}
