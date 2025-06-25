import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.formData();

    const name = data.get("name");
    const tagline = data.get("tagline");
    const description = data.get("description");
    const category = data.get("category");
    const city = data.get("city");
    const website = data.get("website");
    const instagram = data.get("instagram");
    const email = data.get("email");
    const phone = data.get("phone");
    const paymentProof = data.get("paymentProof");
    const founderName = data.get("founderName");
    const founderBio = data.get("founderBio");
    const highlights = data.get("highlights")?.split(",").map((item) => item.trim());
    const faq = data.get("faq");

    const logo = data.get("logo");
    const banner = data.get("banner");

    if (!name || !logo) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert logo to base64
    const logoBuffer = Buffer.from(await logo.arrayBuffer());
    const base64Logo = `data:${logo.type};base64,${logoBuffer.toString("base64")}`;

    // Convert banner (optional)
    let base64Banner = "";
    if (banner && banner.name) {
      const bannerBuffer = Buffer.from(await banner.arrayBuffer());
      base64Banner = `data:${banner.type};base64,${bannerBuffer.toString("base64")}`;
    }

    // Handle multiple gallery images (gallery[])
    const galleryFiles = data.getAll("gallery[]");
    const gallery = [];

    for (const file of galleryFiles) {
      if (file && file.name) {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        gallery.push(`data:${file.type};base64,${fileBuffer.toString("base64")}`);
      }
    }

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const newBrand = new Brand({
      name,
      slug,
      tagline,
      description,
      category,
      city,
      website,
      instagram,
      email,
      phone,
      founderName,
      founderBio,
      highlights,
      faq,
      logoUrl: base64Logo,
      bannerUrl: base64Banner,
      gallery,
      paymentProof,
      isApproved: false,
      isFeatured: false,
    });

    await newBrand.save();

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error submitting brand:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
