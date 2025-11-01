import {
  type User,
  type InsertUser,
  type Route,
  type InsertRoute,
  type Promotion,
  type InsertPromotion,
  type News,
  type InsertNews,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllRoutes(): Promise<Route[]>;
  getRoute(id: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  
  getAllPromotions(): Promise<Promotion[]>;
  getPromotion(id: string): Promise<Promotion | undefined>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  
  getAllNews(): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private routes: Map<string, Route>;
  private promotions: Map<string, Promotion>;
  private news: Map<string, News>;

  constructor() {
    this.users = new Map();
    this.routes = new Map();
    this.promotions = new Map();
    this.news = new Map();
    
    this.seedData();
  }

  private seedData() {
    const mockRoutes: Route[] = [
      {
        id: randomUUID(),
        from: "Hồ Chí Minh",
        to: "Đà Lạt",
        price: 350000,
        image: "/generated_images/Da_Lat_destination_eba62cc7.png",
      },
      {
        id: randomUUID(),
        from: "Hồ Chí Minh",
        to: "Nha Trang",
        price: 420000,
        image: "/generated_images/Nha_Trang_beach_d14efeaa.png",
      },
      {
        id: randomUUID(),
        from: "Hà Nội",
        to: "Sapa",
        price: 400000,
        image: "/generated_images/Sapa_rice_terraces_23f85514.png",
      },
      {
        id: randomUUID(),
        from: "Hồ Chí Minh",
        to: "Vũng Tàu",
        price: 180000,
        image: "/generated_images/Nha_Trang_beach_d14efeaa.png",
      },
      {
        id: randomUUID(),
        from: "Hà Nội",
        to: "Hạ Long",
        price: 320000,
        image: "/generated_images/Sapa_rice_terraces_23f85514.png",
      },
      {
        id: randomUUID(),
        from: "Hồ Chí Minh",
        to: "Cần Thơ",
        price: 250000,
        image: "/generated_images/Da_Lat_destination_eba62cc7.png",
      },
    ];

    const mockPromotions: Promotion[] = [
      {
        id: randomUUID(),
        title: "Giảm 10% vé khứ hồi",
        description: "Áp dụng tuyến Hồ Chí Minh - Đà Lạt",
        image: "/generated_images/Promotion_banner_discount_5ad575d9.png",
      },
      {
        id: randomUUID(),
        title: "Khuyến mãi tháng 11",
        description: "Giảm 50.000đ cho tất cả tuyến nội địa",
        image: "/generated_images/November_promotion_banner_06751e3f.png",
      },
      {
        id: randomUUID(),
        title: "Ưu đãi cuối tuần",
        description: "Giảm 15% cho chuyến đi thứ 7 & Chủ nhật",
        image: "/generated_images/Promotion_banner_discount_5ad575d9.png",
      },
    ];

    const mockNews: News[] = [
      {
        id: randomUUID(),
        title: "Mở tuyến mới Hồ Chí Minh - Phan Thiết",
        description:
          "DatVe360 khai trương tuyến Hồ Chí Minh - Phan Thiết phục vụ du lịch biển. Chuyến xe chất lượng cao với ghế massage và WiFi miễn phí.",
        date: "2025-10-28",
        image: "/generated_images/New_route_announcement_980be27a.png",
      },
      {
        id: randomUUID(),
        title: "Khuyến mãi tháng 11",
        description:
          "Giảm 10% cho tất cả tuyến từ Hồ Chí Minh trong tháng 11. Áp dụng cho cả vé một chiều và khứ hồi. Đặt ngay để nhận ưu đãi.",
        date: "2025-10-30",
        image: "/generated_images/Promotion_banner_discount_5ad575d9.png",
      },
      {
        id: randomUUID(),
        title: "Ứng dụng DatVe360",
        description:
          "Trải nghiệm đặt vé nhanh chóng, tiện lợi trên ứng dụng DatVe360. Tải app ngay để nhận voucher 50.000đ cho lần đặt đầu tiên.",
        date: "2025-10-20",
        image: "/generated_images/Mobile_app_showcase_8eb0f977.png",
      },
    ];

    mockRoutes.forEach((route) => this.routes.set(route.id, route));
    mockPromotions.forEach((promo) => this.promotions.set(promo.id, promo));
    mockNews.forEach((newsItem) => this.news.set(newsItem.id, newsItem));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async getRoute(id: string): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = { ...insertRoute, id };
    this.routes.set(id, route);
    return route;
  }

  async getAllPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }

  async getPromotion(id: string): Promise<Promotion | undefined> {
    return this.promotions.get(id);
  }

  async createPromotion(insertPromotion: InsertPromotion): Promise<Promotion> {
    const id = randomUUID();
    const promotion: Promotion = { ...insertPromotion, id };
    this.promotions.set(id, promotion);
    return promotion;
  }

  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = randomUUID();
    const news: News = { ...insertNews, id };
    this.news.set(id, news);
    return news;
  }
}

export const storage = new MemStorage();
