import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Loader2, Tag, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import type { Promotion, PromotionDetail } from "@/types";
import { promotionService } from "@/services";

export function PromoCarousel() {
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);

  const { data: promotions, isLoading, error } = useQuery<Promotion[]>({
    queryKey: ["promotions"],
    queryFn: () => promotionService.getAllPromotions(),
  });

  const { data: promoDetail } = useQuery<PromotionDetail | null>({
    queryKey: ["promotion-detail", selectedPromo],
    queryFn: () => selectedPromo ? promotionService.getPromotionById(selectedPromo) : null,
    enabled: !!selectedPromo,
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
        <div className="mb-8 relative">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl text-center">
            Khuyến mãi nổi bật
          </h2>
          <div className="absolute right-0 top-0 flex gap-2">
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
                <button
                  onClick={() => setSelectedPromo(promo.id)}
                  className="group relative w-full overflow-hidden rounded-xl transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-futa-red focus:ring-offset-2"
                >
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-promotion-${promo.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold text-left" data-testid={`text-promotion-title-${promo.id}`}>{promo.title}</h3>
                    <p className="text-sm text-white/90 text-left" data-testid={`text-promotion-description-${promo.id}`}>{promo.description}</p>
                    <p className="mt-3 text-xs text-white/80 text-left">Nhấn để xem chi tiết →</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotion Detail Dialog */}
      <Dialog open={!!selectedPromo} onOpenChange={(open) => !open && setSelectedPromo(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {promoDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{promoDetail.title}</DialogTitle>
                <DialogDescription>{promoDetail.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Image */}
                <img
                  src={promoDetail.image}
                  alt={promoDetail.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Promo Code */}
                <div className="flex items-center gap-3 rounded-lg bg-futa-red/10 p-4">
                  <Tag className="h-6 w-6 text-futa-red" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Mã khuyến mãi:</p>
                    <p className="text-xl font-bold text-futa-red">{promoDetail.code}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(promoDetail.code);
                    }}
                  >
                    Sao chép
                  </Button>
                </div>

                {/* Discount Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="h-5 w-5 text-futa-red" />
                      <p className="text-sm font-medium text-gray-600">Giảm giá</p>
                    </div>
                    <p className="text-lg font-bold">
                      {promoDetail.discountType === "percentage"
                        ? `${promoDetail.discountValue}%`
                        : `${promoDetail.discountValue.toLocaleString("vi-VN")}đ`}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-futa-red" />
                      <p className="text-sm font-medium text-gray-600">Thời gian áp dụng</p>
                    </div>
                    <p className="text-sm">
                      {new Date(promoDetail.validFrom).toLocaleDateString("vi-VN")} - {new Date(promoDetail.validTo).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: promoDetail.content }} />

                {/* CTA Button */}
                <Button
                  className="w-full bg-futa-red hover:bg-futa-red/90"
                  onClick={() => setSelectedPromo(null)}
                >
                  Đặt vé ngay
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
