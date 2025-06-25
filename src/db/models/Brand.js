import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  tagline: String,
  category: String,
  logoUrl: String,
  bannerUrl: String, // New field for brand header/hero image
  website: String,
  instagram: String,
  city: String,
  email: String,
  phone: String,
  founderName: String,
  founderBio: String,
  highlights: [String], // Key USPs or features
  faq: String,           // Raw text or JSON later

  isFeatured: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isBrandOfTheDay: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);
