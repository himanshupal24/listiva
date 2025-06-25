import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET() {
  try {
    await connectDB();
    const brands = await Brand.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(8);

    return Response.json(brands);
  } catch (err) {
    return Response.json({ error: "Failed to fetch preview brands" }, { status: 500 });
  }
}
