

import { connectDB } from "@/db/mongoose";
import Brand from "@/db/models/Brand";

export async function GET() {
  await connectDB();
  const count = await Brand.countDocuments({ isApproved: true });
  return Response.json({ count });
}