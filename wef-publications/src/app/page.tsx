import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedPublications } from "@/components/FeaturedPublications";
import { FeaturedSeries } from "@/components/FeaturedSeries";
import { AllPublications } from "@/components/AllPublications";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedPublications />
      <FeaturedSeries />
      <AllPublications />
      <Footer />
    </div>
  );
}
