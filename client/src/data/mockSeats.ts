import type { Seat } from "@/types";

function generateId(): string {
  return crypto.randomUUID();
}

// Helper để tạo seat layout cho xe giường nằm 40 chỗ (2 tầng)
export function generateSeatLayout(scheduleId: string, bookedSeats: string[] = []): Seat[] {
  const seats: Seat[] = [];
  const rows = 5;
  const columnsPerFloor = 4;
  const floors = 2;

  let seatNumber = 1;

  for (let floor = 1; floor <= floors; floor++) {
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columnsPerFloor; col++) {
        const seatId = generateId();
        const label = `${String.fromCharCode(64 + row)}${col}${floor === 2 ? "-T2" : ""}`;
        
        // Random một số ghế đã được đặt
        const isBooked = bookedSeats.includes(label) || Math.random() < 0.3;
        
        seats.push({
          id: seatId,
          scheduleId,
          row,
          column: col,
          floor: floor as 1 | 2,
          type: "double",
          status: isBooked ? "booked" : "available",
          price: 0, // Sẽ lấy từ schedule
          label,
        });
        
        seatNumber++;
      }
    }
  }

  return seats;
}

// Helper để tạo seat layout cho xe ghế ngồi 45 chỗ
export function generateSittingSeatLayout(scheduleId: string, bookedSeats: string[] = []): Seat[] {
  const seats: Seat[] = [];
  const rows = 11;
  const seatsPerRow = [2, 2]; // 2 bên, mỗi bên 2 ghế

  let seatNumber = 1;

  for (let row = 1; row <= rows; row++) {
    // Bên trái (2 ghế)
    for (let col = 1; col <= 2; col++) {
      const seatId = generateId();
      const label = `${row}${String.fromCharCode(64 + col)}`;
      const isBooked = bookedSeats.includes(label) || Math.random() < 0.25;
      
      seats.push({
        id: seatId,
        scheduleId,
        row,
        column: col,
        floor: 1,
        type: "single",
        status: isBooked ? "booked" : "available",
        price: 0,
        label,
      });
      
      seatNumber++;
    }

    // Bên phải (2 ghế)
    for (let col = 3; col <= 4; col++) {
      const seatId = generateId();
      const label = `${row}${String.fromCharCode(64 + col)}`;
      const isBooked = bookedSeats.includes(label) || Math.random() < 0.25;
      
      seats.push({
        id: seatId,
        scheduleId,
        row,
        column: col,
        floor: 1,
        type: "single",
        status: isBooked ? "booked" : "available",
        price: 0,
        label,
      });
      
      seatNumber++;
    }
  }

  return seats;
}

// Cache seats theo scheduleId
const seatCache = new Map<string, Seat[]>();

export function getSeatsForSchedule(scheduleId: string, busType: "Giường nằm" | "Ghế ngồi"): Seat[] {
  // Kiểm tra cache
  if (seatCache.has(scheduleId)) {
    return seatCache.get(scheduleId)!;
  }

  // Tạo mới nếu chưa có
  const seats = busType === "Giường nằm" 
    ? generateSeatLayout(scheduleId)
    : generateSittingSeatLayout(scheduleId);
  
  // Lưu vào cache
  seatCache.set(scheduleId, seats);
  
  return seats;
}

// Helper để update trạng thái ghế
export function updateSeatStatus(scheduleId: string, seatId: string, status: Seat["status"]): void {
  const seats = seatCache.get(scheduleId);
  if (seats) {
    const seat = seats.find(s => s.id === seatId);
    if (seat) {
      seat.status = status;
    }
  }
}

// Helper để lấy ghế đã chọn
export function getSelectedSeats(scheduleId: string): Seat[] {
  const seats = seatCache.get(scheduleId);
  return seats ? seats.filter(s => s.status === "selected") : [];
}

// Helper để clear selection
export function clearSeatSelection(scheduleId: string): void {
  const seats = seatCache.get(scheduleId);
  if (seats) {
    seats.forEach(seat => {
      if (seat.status === "selected") {
        seat.status = "available";
      }
    });
  }
}

