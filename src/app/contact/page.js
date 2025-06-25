"use client";

export default function ContactAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">About Listiva & Contact</h1>

      {/* Intro */}
      <div className="text-gray-800 leading-relaxed text-center mb-10 space-y-4">
        <p>
          Welcome to <strong>Listiva</strong> — a global brand directory built to showcase and
          support emerging brands across Fashion, Food, Lifestyle, Local Businesses, and Services.
        </p>
        <p>
          We believe every brand deserves a spotlight. With a one-time fee, your brand gets a permanent home on the internet —
          no monthly payments, no renewal charges.
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-center">🚀 Benefits of Getting Listed</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left md:text-center">
          <li>Permanent listing on a premium global brand directory</li>
          <li>High visibility among potential customers, clients, and partners</li>
          <li>Dedicated landing page that feels like your own website</li>
          <li>Chance to be featured as “Brand of the Day” or “Featured Brand”</li>
          <li>SEO-optimized — searchable via Google and other search engines</li>
          <li>Clickable website and Instagram links to drive real traffic</li>
          <li>Professional backlink to increase your online trust score</li>
        </ul>
      </div>

      {/* Scope */}
      <div className="text-gray-700 mb-10 text-center space-y-4">
        <h2 className="text-xl font-semibold">📈 Our Mission & Reach</h2>
        <p>
          At Listiva, our mission is to list and empower 1,000+ global brands by 2025 —
          from small town gems to fast-growing e-commerce ventures.
        </p>
        <p>
          We are creating the internet’s cleanest and most elegant place to discover trustworthy, modern, and original brands from around the world.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <div className="text-center mt-8">
        <p className="mb-4 text-lg font-semibold">
          Interested in getting listed or have questions?
        </p>
        <a
          href="https://wa.me/919971686542?text=Hi%20👋%2C%20I%27m%20interested%20in%20listing%20my%20brand%20on%20Listiva.%20Please%20share%20the%20next%20steps%3A"
          target="_blank"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition"
        >
          💬 Chat With Us on WhatsApp
        </a>
      </div>
    </div>
  );
}
