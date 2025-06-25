import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function generateStaticParams() {
  await connectDB();
  const brands = await Brand.find({ isApproved: true }).select("slug");
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandProfile({ params }) {
  await connectDB();
  const brand = await Brand.findOne({ slug: params.slug, isApproved: true });

  if (!brand) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Brand not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner */}
      <div
        className="w-full h-60 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${brand.bannerUrl || "/download.jpeg"})`,
          backgroundColor: brand.bannerUrl ? "transparent" : "#f3f4f6",
        }}
        title={`${brand.name} banner`}
      ></div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow rounded-lg -mt-20 relative z-10">
        <div className="text-center">
          <img
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            className="w-24 h-24 mx-auto rounded-full object-contain shadow border bg-white"
          />
          <h1 className="text-4xl font-bold mt-4">{brand.name}</h1>
          {brand.tagline && <p className="text-lg italic text-gray-600">{brand.tagline}</p>}
          <p className="text-sm text-gray-400 mt-1">
            Joined on {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        {brand.description && (
          <div className="mt-6 text-gray-700 leading-relaxed text-center">
            <p>{brand.description}</p>
          </div>
        )}

        {/* Founder */}
        {(brand.founderName || brand.founderBio) && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">👤 Founder</h3>
            {brand.founderName && <p className="font-bold">{brand.founderName}</p>}
            {brand.founderBio && <p className="text-gray-600 mt-1">{brand.founderBio}</p>}
          </div>
        )}

        {/* Highlights */}
        {brand.highlights?.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">✨ Highlights</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {brand.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {brand.gallery?.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">📸 Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {brand.gallery.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Gallery image ${idx + 1}`}
                  className="rounded-lg object-cover w-full h-40"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {brand.faq && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">❓ FAQ</h3>
            <p className="text-gray-700 whitespace-pre-line">{brand.faq}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {brand.website && (
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              🌐 Visit Website
            </a>
          )}
          {brand.instagram && (
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition"
            >
              📸 Instagram
            </a>
          )}
        </div>

        {/* Contact Info */}
        {(brand.city || brand.phone || brand.email) && (
          <div className="mt-8 text-center text-sm text-gray-500 border-t pt-6">
            {brand.city && <p>📍 {brand.city}</p>}
            {brand.phone && <p>📞 {brand.phone}</p>}
            {brand.email && <p>📧 {brand.email}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  await connectDB();
  const brand = await Brand.findOne({ slug: params.slug, isApproved: true });

  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "This brand does not exist in our directory.",
    };
  }

  return {
    title: brand.name,
    description: brand.tagline || "Explore brand profile on India's largest brand directory - Listiva.",
    openGraph: {
      title: brand.name,
      description: brand.tagline || brand.description || "Listed brand on Listiva",
      images: [brand.logoUrl || "/default-og-image.jpg"],
    },
  };
}
