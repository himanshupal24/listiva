import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function POST(req) {
  await connectDB();
  const { id, action } = await req.json();

  const brand = await Brand.findById(id);
  if (!brand) return Response.json({ error: "Not found" }, { status: 404 });

  if (action === "approve") {
    brand.isApproved = true;
  } else if (action === "reject") {
    brand.isApproved = false;
  } else if (action === "toggleFeatured") {
    brand.isFeatured = !brand.isFeatured;
  } else if (action === "makeBrandOfTheDay") {
    // Unset previous Brand of the Day
    await Brand.updateMany({}, { $set: { isBrandOfTheDay: false } });
    brand.isBrandOfTheDay = true;
  }

  await brand.save();

  const updated = await Brand.find({}).sort({ createdAt: -1 });
  return Response.json(updated);
}
