import type { Route, RouteSchedule, SearchQuery, SearchResult } from "@/types";
import { mockRoutes, mockSchedules, getSchedulesByRoute } from "@/data";

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const routeService = {
  /**
   * Lấy tất cả tuyến xe
   */
  async getAllRoutes(): Promise<Route[]> {
    await delay(300);
    return [...mockRoutes];
  },

  /**
   * Lấy thông tin tuyến xe theo ID
   */
  async getRouteById(id: string): Promise<Route | null> {
    await delay(200);
    const route = mockRoutes.find(r => r.id === id);
    return route || null;
  },

  /**
   * Tìm kiếm tuyến xe theo điểm đi và điểm đến
   */
  async searchRoutes(from: string, to: string): Promise<Route[]> {
    await delay(400);
    return mockRoutes.filter(r => 
      r.from.toLowerCase().includes(from.toLowerCase()) && 
      r.to.toLowerCase().includes(to.toLowerCase())
    );
  },

  /**
   * Tìm kiếm lịch trình chi tiết
   */
  async searchSchedules(query: SearchQuery): Promise<SearchResult> {
    await delay(500);
    
    const schedules = getSchedulesByRoute(query.from, query.to);
    
    // Filter theo ngày nếu cần
    const filteredSchedules = schedules.map(schedule => ({
      ...schedule,
      departureDate: query.departureDate,
    }));

    return {
      schedules: filteredSchedules,
      query,
    };
  },

  /**
   * Lấy lịch trình theo ID
   */
  async getScheduleById(id: string): Promise<RouteSchedule | null> {
    await delay(200);
    const schedule = mockSchedules.find(s => s.id === id);
    return schedule || null;
  },

  /**
   * Lấy các tuyến phổ biến (top routes)
   */
  async getPopularRoutes(limit: number = 6): Promise<Route[]> {
    await delay(300);
    return mockRoutes.slice(0, limit);
  },
};

