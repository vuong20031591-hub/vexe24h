import { Header } from "@/components/Header";
import { HeroSearch } from "@/components/HeroSearch";
import { PromoCarousel } from "@/components/PromoCarousel";
import { PopularRoutes } from "@/components/PopularRoutes";
import { StatsSection } from "@/components/StatsSection";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSearch />
        <PromoCarousel />
        <PopularRoutes />
        <StatsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
