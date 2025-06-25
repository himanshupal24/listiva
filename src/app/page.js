import HeroSection from "@/components/HeroSection";
import BrandCounter from "@/components/BrandCounter";
import FeaturedBrands from "@/components/FeaturedBrands";
import BrandOfTheDay from "@/components/BrandOfTheDay";
import ApprovedPreview from "@/components/ApprovedPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <BrandCounter />
      <FeaturedBrands />
      <ApprovedPreview />
      <BrandOfTheDay />
    </main>
  );
}
