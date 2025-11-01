import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { newsService } from "@/services";
import type { News } from "@/types";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const [, setLocation] = useLocation();
  const newsId = params?.id || "";

  const { data: allNews, isLoading, error } = useQuery<News[]>({
    queryKey: ["news", "all"],
    queryFn: () => newsService.getLatestNews(20),
  });

  const article = allNews?.find(n => n.id === newsId);

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

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Không tìm thấy tin tức
            </h1>
            <Button
              onClick={() => setLocation("/news")}
              variant="outline"
              className="border-futa-red text-futa-red hover:bg-futa-red hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách tin tức
            </Button>
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
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            onClick={() => setLocation("/news")}
            variant="ghost"
            className="mb-8 text-gray-600 hover:text-futa-red"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          {/* Article Header */}
          <article className="overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Featured Image */}
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Date */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <time>
                  {format(new Date(article.date), "dd MMMM yyyy", {
                    locale: vi,
                  })}
                </time>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                {article.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          </article>

          {/* Related News */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Tin tức liên quan
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {allNews
                ?.filter(n => n.id !== newsId)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <button
                    key={relatedArticle.id}
                    onClick={() => setLocation(`/news/${relatedArticle.id}`)}
                    className="group overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 text-left">
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <time>
                          {format(new Date(relatedArticle.date), "dd/MM/yyyy")}
                        </time>
                      </div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-futa-red">
                        {relatedArticle.title}
                      </h3>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

