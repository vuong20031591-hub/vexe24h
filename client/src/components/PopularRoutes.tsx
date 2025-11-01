import { Bus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Route } from "@/types";
import { routeService } from "@/services";

export function PopularRoutes() {
  const [, setLocation] = useLocation();

  const { data: routes, isLoading, error } = useQuery<Route[]>({
    queryKey: ["routes", "popular"],
    queryFn: () => routeService.getPopularRoutes(8),
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleBookRoute = (route: Route) => {
    const today = new Date().toISOString().split("T")[0];
    const params = new URLSearchParams({
      from: route.from,
      to: route.to,
      date: today,
    });
    setLocation(`/search?${params.toString()}`);
  };

  if (error) {
    return (
      <section className="bg-gray-50 py-16 sm:py-20" id="routes">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            Không thể tải tuyến đường. Vui lòng thử lại sau.
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-16 sm:py-20" id="routes">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-futa-red" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20" id="routes" data-testid="section-routes">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Tuyến xe phổ biến
          </h2>
          <p className="text-gray-600">
            Các tuyến đường được yêu thích nhất
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {routes?.map((route) => (
            <Card
              key={route.id}
              className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              data-testid={`card-route-${route.id}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.from} - ${route.to}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  data-testid={`img-route-${route.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 p-2">
                  <Bus className="h-4 w-4 text-futa-red" />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-medium text-gray-900" data-testid={`text-route-name-${route.id}`}>
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-xl font-bold text-futa-red" data-testid={`text-route-price-${route.id}`}>
                    Từ {formatPrice(route.price)}
                  </p>
                </div>
                <Button
                  className="w-full bg-futa-red hover:bg-futa-red/90"
                  data-testid={`button-book-route-${route.id}`}
                  onClick={() => handleBookRoute(route)}
                >
                  Đặt vé ngay
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
