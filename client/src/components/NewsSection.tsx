import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { News } from "@/types";
import { newsService } from "@/services";

export function NewsSection() {
  const [, setLocation] = useLocation();

  const { data: news, isLoading, error } = useQuery<News[]>({
    queryKey: ["news", "latest"],
    queryFn: () => newsService.getLatestNews(3),
  });

  if (error) {
    return (
      <section className="bg-white py-16 sm:py-20" id="news">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            Không thể tải tin tức. Vui lòng thử lại sau.
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-white py-16 sm:py-20" id="news">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-futa-red" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-20" id="news" data-testid="section-news">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Tin tức & thông tin mới nhất
          </h2>
          <p className="text-gray-600">
            Cập nhật thông tin về tuyến đường mới và chương trình khuyến mãi
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news?.map((article) => (
            <Card
              key={article.id}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
              data-testid={`card-news-${article.id}`}
              onClick={() => setLocation(`/news/${article.id}`)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-testid={`img-news-${article.id}`}
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date} data-testid={`text-news-date-${article.id}`}>
                    {format(new Date(article.date), "dd/MM/yyyy", { locale: vi })}
                  </time>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2" data-testid={`text-news-title-${article.id}`}>
                  {article.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-3" data-testid={`text-news-description-${article.id}`}>
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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => setLocation("/news")}
            variant="outline"
            className="border-futa-red text-futa-red hover:bg-futa-red hover:text-white"
          >
            Xem tất cả tin tức
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
