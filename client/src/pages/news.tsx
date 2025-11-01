import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { newsService } from "@/services";
import type { News } from "@/types";

export default function NewsPage() {
  const [, setLocation] = useLocation();

  const { data: news, isLoading, error } = useQuery<News[]>({
    queryKey: ["news", "all"],
    queryFn: () => newsService.getLatestNews(20),
  });

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center text-gray-600">
            Không thể tải tin tức. Vui lòng thử lại sau.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-futa-red" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Tin tức</h1>
            <p className="text-lg text-gray-600">
              Cập nhật thông tin mới nhất về dịch vụ và khuyến mãi
            </p>
          </div>

          {/* News Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news?.map((article) => (
              <Card
                key={article.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                onClick={() => setLocation(`/news/${article.id}`)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <time>
                      {format(new Date(article.date), "dd MMMM yyyy", {
                        locale: vi,
                      })}
                    </time>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-futa-red transition-colors group-hover:text-futa-red/80">
                    Xem thêm
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {news?.length === 0 && (
            <div className="py-16 text-center text-gray-500">
              Chưa có tin tức nào
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

