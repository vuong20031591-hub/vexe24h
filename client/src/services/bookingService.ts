import type { Booking, BookingRequest, BookingResponse } from "@/types";
import { promotionService } from "./promotionService";

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage keys
const BOOKINGS_KEY = "datve360_bookings";

/**
 * Generate booking code
 * Format: DV360-YYYYMMDD-XXXX
 */
function generateBookingCode(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DV360-${dateStr}-${random}`;
}

export const bookingService = {
  /**
   * Tạo đặt vé mới
   */
  async createBooking(request: BookingRequest): Promise<BookingResponse> {
    // Simulate validation
    await delay(500);

    // Validate promo code nếu có
    let finalPrice = request.totalPrice;
    if (request.promoCode) {
      const validation = await promotionService.validatePromoCode(request.promoCode);
      
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      if (validation.promotion) {
        const discount = promotionService.calculateDiscount(
          request.totalPrice,
          validation.promotion
        );
        finalPrice = request.totalPrice - discount;
      }
    }

    // Simulate payment processing
    await delay(2000);

    // Generate booking
    const bookingCode = generateBookingCode();
    const booking: Booking = {
      ...request,
      id: crypto.randomUUID(),
      code: bookingCode,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      totalPrice: finalPrice,
    };

    // Save to localStorage
    bookingService.saveBookingToStorage(booking);

    return {
      success: true,
      bookingCode,
      message: "Đặt vé thành công!",
      booking,
    };
  },

  /**
   * Lấy thông tin đặt vé theo mã
   */
  async getBookingByCode(code: string): Promise<Booking | null> {
    await delay(300);

    const bookings = bookingService.getBookingsFromStorage();
    const booking = bookings.find(b => b.code === code);

    return booking || null;
  },

  /**
   * Lấy tất cả đặt vé của user (từ localStorage)
   */
  async getAllBookings(): Promise<Booking[]> {
    await delay(300);
    return bookingService.getBookingsFromStorage();
  },

  /**
   * Hủy đặt vé
   */
  async cancelBooking(code: string): Promise<{
    success: boolean;
    message: string;
  }> {
    await delay(500);

    const bookings = bookingService.getBookingsFromStorage();
    const bookingIndex = bookings.findIndex(b => b.code === code);
    
    if (bookingIndex === -1) {
      return {
        success: false,
        message: "Không tìm thấy đặt vé",
      };
    }

    const booking = bookings[bookingIndex];
    
    // Kiểm tra thời gian hủy (ví dụ: chỉ được hủy trước 24h)
    const createdAt = new Date(booking.createdAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      return {
        success: false,
        message: "Không thể hủy vé sau 24 giờ đặt",
      };
    }

    // Update status
    bookings[bookingIndex].status = "cancelled";
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

    return {
      success: true,
      message: "Hủy vé thành công",
    };
  },

  /**
   * Helper: Save booking to localStorage
   */
  saveBookingToStorage(booking: Booking): void {
    const bookings = bookingService.getBookingsFromStorage();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },

  /**
   * Helper: Get bookings from localStorage
   */
  getBookingsFromStorage(): Booking[] {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Helper: Clear all bookings (for testing)
   */
  clearAllBookings(): void {
    localStorage.removeItem(BOOKINGS_KEY);
  },
};

