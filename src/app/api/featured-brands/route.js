import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET() {
  try {
    await connectDB();
    const brands = await Brand.find({ isApproved: true, isFeatured: true }).limit(8);
    return Response.json({ brands });
  } catch (err) {
    console.error("Error fetching featured brands:", err);
    return Response.json({ brands: [] }, { status: 500 });
  }
}
