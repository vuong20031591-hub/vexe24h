import type { News } from "@/types";
import { mockNews } from "@/data";

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const newsService = {
  /**
   * Lấy tất cả tin tức
   */
  async getAllNews(): Promise<News[]> {
    await delay(300);
    // Sắp xếp theo ngày mới nhất
    return [...mockNews].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  /**
   * Lấy chi tiết tin tức theo ID
   */
  async getNewsById(id: string): Promise<News | null> {
    await delay(200);
    const news = mockNews.find((n: News) => n.id === id);
    return news || null;
  },

  /**
   * Lấy tin tức mới nhất
   */
  async getLatestNews(limit: number = 3): Promise<News[]> {
    await delay(300);
    const sortedNews = [...mockNews].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedNews.slice(0, limit);
  },

  /**
   * Tìm kiếm tin tức theo từ khóa
   */
  async searchNews(keyword: string): Promise<News[]> {
    await delay(400);
    const lowerKeyword = keyword.toLowerCase();
    return mockNews.filter(news =>
      news.title.toLowerCase().includes(lowerKeyword) ||
      news.description.toLowerCase().includes(lowerKeyword)
    );
  },
};

