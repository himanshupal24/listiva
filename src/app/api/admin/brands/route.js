import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET() {
  await connectDB();
  const brands = await Brand.find({}).sort({ createdAt: -1 });
  return Response.json(brands);
}
