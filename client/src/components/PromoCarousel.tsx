import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Promotion } from "@shared/schema";

export function PromoCarousel() {
  const { data: promotions, isLoading, error } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (error) {
    return (
      <section className="bg-white py-16 sm:py-20" id="promotions">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            Không thể tải khuyến mãi. Vui lòng thử lại sau.
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-white py-16 sm:py-20" id="promotions">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-futa-red" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-20" id="promotions" data-testid="section-promotions">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Khuyến mãi nổi bật
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-9 w-9 rounded-full"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-9 w-9 rounded-full"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {promotions?.map((promo) => (
              <div
                key={promo.id}
                className="relative min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                data-testid={`card-promotion-${promo.id}`}
              >
                <div className="group relative overflow-hidden rounded-xl transition-all hover:shadow-lg">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-promotion-${promo.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold" data-testid={`text-promotion-title-${promo.id}`}>{promo.title}</h3>
                    <p className="text-sm text-white/90" data-testid={`text-promotion-description-${promo.id}`}>{promo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
