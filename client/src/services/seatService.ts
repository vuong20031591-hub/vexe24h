import type { Seat, RouteSchedule } from "@/types";
import { getSeatsForSchedule, updateSeatStatus, getSelectedSeats, clearSeatSelection } from "@/data";

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const seatService = {
  /**
   * Lấy sơ đồ ghế cho một lịch trình
   */
  async getSeats(schedule: RouteSchedule): Promise<Seat[]> {
    await delay(300);
    const seats = getSeatsForSchedule(schedule.id, schedule.busType);
    
    // Cập nhật giá ghế từ schedule
    return seats.map(seat => ({
      ...seat,
      price: schedule.price,
    }));
  },

  /**
   * Chọn/bỏ chọn ghế
   */
  async toggleSeat(scheduleId: string, seatId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    await delay(100);
    
    const seats = getSeatsForSchedule(scheduleId, "Giường nằm"); // Sẽ lấy từ cache
    const seat = seats.find(s => s.id === seatId);

    if (!seat) {
      return {
        success: false,
        message: "Không tìm thấy ghế",
      };
    }

    if (seat.status === "booked") {
      return {
        success: false,
        message: "Ghế đã được đặt",
      };
    }

    // Toggle status
    const newStatus = seat.status === "selected" ? "available" : "selected";
    updateSeatStatus(scheduleId, seatId, newStatus);

    return {
      success: true,
      message: newStatus === "selected" ? "Đã chọn ghế" : "Đã bỏ chọn ghế",
    };
  },

  /**
   * Lấy danh sách ghế đã chọn
   */
  async getSelectedSeats(scheduleId: string, price?: number): Promise<Seat[]> {
    await delay(100);
    const selectedSeats = getSelectedSeats(scheduleId);

    // Update price if provided
    if (price !== undefined) {
      return selectedSeats.map(seat => ({
        ...seat,
        price,
      }));
    }

    return selectedSeats;
  },

  /**
   * Xóa tất cả ghế đã chọn
   */
  async clearSelection(scheduleId: string): Promise<void> {
    await delay(100);
    clearSeatSelection(scheduleId);
  },

  /**
   * Kiểm tra ghế có khả dụng không
   */
  async checkSeatAvailability(scheduleId: string, seatIds: string[]): Promise<{
    available: boolean;
    unavailableSeats: string[];
  }> {
    await delay(200);
    
    const seats = getSeatsForSchedule(scheduleId, "Giường nằm");
    const unavailableSeats: string[] = [];

    for (const seatId of seatIds) {
      const seat = seats.find(s => s.id === seatId);
      if (!seat || seat.status === "booked") {
        unavailableSeats.push(seatId);
      }
    }

    return {
      available: unavailableSeats.length === 0,
      unavailableSeats,
    };
  },
};

