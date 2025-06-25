// /app/api/brands/route.js
import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({ isApproved: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return Response.json(brands);
}
