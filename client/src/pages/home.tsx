import { Header } from "@/components/Header";
import { HeroSearch } from "@/components/HeroSearch";
import { PromoCarousel } from "@/components/PromoCarousel";
import { PopularRoutes } from "@/components/PopularRoutes";
import { StatsSection } from "@/components/StatsSection";
import { AboutUs } from "@/components/AboutUs";
import { CustomerFeedback } from "@/components/CustomerFeedback";
import { NewsSection } from "@/components/NewsSection";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";
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
        <AboutUs />
        <CustomerFeedback />
        <NewsSection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
