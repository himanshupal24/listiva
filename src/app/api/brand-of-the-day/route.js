import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET() {
  try {
    await connectDB();

    // First try to find a manually assigned brand of the day
    const featured = await Brand.findOne({ isApproved: true, isBrandOfTheDay: true });

    if (featured) {
      return Response.json({ brand: featured });
    }

    // Fallback: pick a random approved brand
    const count = await Brand.countDocuments({ isApproved: true });
    const random = Math.floor(Math.random() * count);
    const brand = await Brand.findOne({ isApproved: true }).skip(random);

    return Response.json({ brand });
  } catch (err) {
    console.error("Brand of the Day API error:", err);
    return Response.json({ brand: null }, { status: 500 });
  }
}
