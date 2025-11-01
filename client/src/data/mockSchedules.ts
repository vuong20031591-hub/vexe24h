import type { RouteSchedule } from "@/types";
import { mockRoutes } from "./mockRoutes";

function generateId(): string {
  return crypto.randomUUID();
}

// Helper để tạo schedules cho một route
function createSchedulesForRoute(
  route: typeof mockRoutes[0],
  times: Array<{ departure: string; arrival: string; duration: string }>
): RouteSchedule[] {
  return times.map((time) => ({
    id: generateId(),
    routeId: route.id,
    from: route.from,
    to: route.to,
    departureTime: time.departure,
    arrivalTime: time.arrival,
    duration: time.duration,
    availableSeats: Math.floor(Math.random() * 20) + 15, // 15-35 ghế trống
    totalSeats: 40,
    busType: Math.random() > 0.5 ? "Giường nằm" : "Ghế ngồi",
    price: route.price,
    amenities: ["WiFi", "Nước uống", "Điều hòa", "Chăn gối"],
    departureDate: new Date().toISOString().split("T")[0], // Hôm nay
  }));
}

// Tạo schedules cho các tuyến phổ biến
const hcmDalatSchedules = createSchedulesForRoute(mockRoutes[0], [
  { departure: "05:00", arrival: "11:30", duration: "6h 30m" },
  { departure: "06:00", arrival: "12:30", duration: "6h 30m" },
  { departure: "07:00", arrival: "13:30", duration: "6h 30m" },
  { departure: "08:00", arrival: "14:30", duration: "6h 30m" },
  { departure: "09:00", arrival: "15:30", duration: "6h 30m" },
  { departure: "10:00", arrival: "16:30", duration: "6h 30m" },
  { departure: "11:00", arrival: "17:30", duration: "6h 30m" },
  { departure: "12:00", arrival: "18:30", duration: "6h 30m" },
  { departure: "14:00", arrival: "20:30", duration: "6h 30m" },
  { departure: "16:00", arrival: "22:30", duration: "6h 30m" },
  { departure: "18:00", arrival: "00:30", duration: "6h 30m" },
  { departure: "20:00", arrival: "02:30", duration: "6h 30m" },
  { departure: "22:00", arrival: "04:30", duration: "6h 30m" },
  { departure: "23:00", arrival: "05:30", duration: "6h 30m" },
]);

const hcmNhatrangSchedules = createSchedulesForRoute(mockRoutes[1], [
  { departure: "05:00", arrival: "14:00", duration: "9h" },
  { departure: "05:30", arrival: "14:30", duration: "9h" },
  { departure: "06:00", arrival: "15:00", duration: "9h" },
  { departure: "07:00", arrival: "16:00", duration: "9h" },
  { departure: "08:00", arrival: "17:00", duration: "9h" },
  { departure: "10:00", arrival: "19:00", duration: "9h" },
  { departure: "12:00", arrival: "21:00", duration: "9h" },
  { departure: "13:00", arrival: "22:00", duration: "9h" },
  { departure: "15:00", arrival: "00:00", duration: "9h" },
  { departure: "17:00", arrival: "02:00", duration: "9h" },
  { departure: "19:00", arrival: "04:00", duration: "9h" },
  { departure: "21:00", arrival: "06:00", duration: "9h" },
  { departure: "22:00", arrival: "07:00", duration: "9h" },
  { departure: "23:00", arrival: "08:00", duration: "9h" },
]);

const hanoiSapaSchedules = createSchedulesForRoute(mockRoutes[2], [
  { departure: "05:00", arrival: "10:30", duration: "5h 30m" },
  { departure: "06:00", arrival: "11:30", duration: "5h 30m" },
  { departure: "07:00", arrival: "12:30", duration: "5h 30m" },
  { departure: "08:00", arrival: "13:30", duration: "5h 30m" },
  { departure: "08:30", arrival: "14:00", duration: "5h 30m" },
  { departure: "10:00", arrival: "15:30", duration: "5h 30m" },
  { departure: "12:00", arrival: "17:30", duration: "5h 30m" },
  { departure: "14:00", arrival: "19:30", duration: "5h 30m" },
  { departure: "16:00", arrival: "21:30", duration: "5h 30m" },
  { departure: "18:00", arrival: "23:30", duration: "5h 30m" },
  { departure: "20:00", arrival: "01:30", duration: "5h 30m" },
  { departure: "21:00", arrival: "02:30", duration: "5h 30m" },
  { departure: "22:00", arrival: "03:30", duration: "5h 30m" },
]);

const hcmVungtauSchedules = createSchedulesForRoute(mockRoutes[3], [
  { departure: "05:00", arrival: "07:30", duration: "2h 30m" },
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "07:00", arrival: "09:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "09:00", arrival: "11:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "11:00", arrival: "13:30", duration: "2h 30m" },
  { departure: "12:00", arrival: "14:30", duration: "2h 30m" },
  { departure: "13:00", arrival: "15:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "15:00", arrival: "17:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
  { departure: "17:00", arrival: "19:30", duration: "2h 30m" },
  { departure: "18:00", arrival: "20:30", duration: "2h 30m" },
  { departure: "19:00", arrival: "21:30", duration: "2h 30m" },
]);

const hanoiHalongSchedules = createSchedulesForRoute(mockRoutes[4], [
  { departure: "05:30", arrival: "09:00", duration: "3h 30m" },
  { departure: "06:30", arrival: "10:00", duration: "3h 30m" },
  { departure: "07:30", arrival: "11:00", duration: "3h 30m" },
  { departure: "08:30", arrival: "12:00", duration: "3h 30m" },
  { departure: "09:00", arrival: "12:30", duration: "3h 30m" },
  { departure: "10:00", arrival: "13:30", duration: "3h 30m" },
  { departure: "11:00", arrival: "14:30", duration: "3h 30m" },
  { departure: "12:00", arrival: "15:30", duration: "3h 30m" },
  { departure: "13:00", arrival: "16:30", duration: "3h 30m" },
  { departure: "14:00", arrival: "17:30", duration: "3h 30m" },
  { departure: "15:00", arrival: "18:30", duration: "3h 30m" },
  { departure: "16:00", arrival: "19:30", duration: "3h 30m" },
]);

const hcmCanthoSchedules = createSchedulesForRoute(mockRoutes[5], [
  { departure: "05:00", arrival: "08:30", duration: "3h 30m" },
  { departure: "06:00", arrival: "09:30", duration: "3h 30m" },
  { departure: "07:00", arrival: "10:30", duration: "3h 30m" },
  { departure: "08:00", arrival: "11:30", duration: "3h 30m" },
  { departure: "09:00", arrival: "12:30", duration: "3h 30m" },
  { departure: "10:00", arrival: "13:30", duration: "3h 30m" },
  { departure: "11:00", arrival: "14:30", duration: "3h 30m" },
  { departure: "12:00", arrival: "15:30", duration: "3h 30m" },
  { departure: "13:00", arrival: "16:30", duration: "3h 30m" },
  { departure: "14:00", arrival: "17:30", duration: "3h 30m" },
  { departure: "15:00", arrival: "18:30", duration: "3h 30m" },
  { departure: "16:00", arrival: "19:30", duration: "3h 30m" },
  { departure: "17:00", arrival: "20:30", duration: "3h 30m" },
]);

const hcmDanangSchedules = createSchedulesForRoute(mockRoutes[6], [
  { departure: "05:00", arrival: "17:00", duration: "12h" },
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "07:00", arrival: "19:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "09:00", arrival: "21:00", duration: "12h" },
  { departure: "10:00", arrival: "22:00", duration: "12h" },
  { departure: "17:00", arrival: "05:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "19:00", arrival: "07:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
  { departure: "21:00", arrival: "09:00", duration: "12h" },
  { departure: "22:00", arrival: "10:00", duration: "12h" },
]);

const hanoiHueSchedules = createSchedulesForRoute(mockRoutes[7], [
  { departure: "05:00", arrival: "17:00", duration: "12h" },
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "07:00", arrival: "19:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "09:00", arrival: "21:00", duration: "12h" },
  { departure: "10:00", arrival: "22:00", duration: "12h" },
  { departure: "17:00", arrival: "05:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "19:00", arrival: "07:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
  { departure: "21:00", arrival: "09:00", duration: "12h" },
  { departure: "22:00", arrival: "10:00", duration: "12h" },
]);

const hcmPhanthietSchedules = createSchedulesForRoute(mockRoutes[8], [
  { departure: "05:00", arrival: "09:00", duration: "4h" },
  { departure: "06:00", arrival: "10:00", duration: "4h" },
  { departure: "07:00", arrival: "11:00", duration: "4h" },
  { departure: "08:00", arrival: "12:00", duration: "4h" },
  { departure: "09:00", arrival: "13:00", duration: "4h" },
  { departure: "10:00", arrival: "14:00", duration: "4h" },
  { departure: "11:00", arrival: "15:00", duration: "4h" },
  { departure: "12:00", arrival: "16:00", duration: "4h" },
  { departure: "13:00", arrival: "17:00", duration: "4h" },
  { departure: "14:00", arrival: "18:00", duration: "4h" },
  { departure: "15:00", arrival: "19:00", duration: "4h" },
  { departure: "16:00", arrival: "20:00", duration: "4h" },
  { departure: "17:00", arrival: "21:00", duration: "4h" },
  { departure: "18:00", arrival: "22:00", duration: "4h" },
]);

const hcmMuineSchedules = createSchedulesForRoute(mockRoutes[9], [
  { departure: "05:30", arrival: "10:00", duration: "4h 30m" },
  { departure: "06:30", arrival: "11:00", duration: "4h 30m" },
  { departure: "07:30", arrival: "12:00", duration: "4h 30m" },
  { departure: "08:30", arrival: "13:00", duration: "4h 30m" },
  { departure: "09:00", arrival: "13:30", duration: "4h 30m" },
  { departure: "10:00", arrival: "14:30", duration: "4h 30m" },
  { departure: "11:00", arrival: "15:30", duration: "4h 30m" },
  { departure: "12:00", arrival: "16:30", duration: "4h 30m" },
  { departure: "13:00", arrival: "17:30", duration: "4h 30m" },
  { departure: "14:00", arrival: "18:30", duration: "4h 30m" },
  { departure: "15:00", arrival: "19:30", duration: "4h 30m" },
  { departure: "16:00", arrival: "20:30", duration: "4h 30m" },
]);

const hanoiNinhbinhSchedules = createSchedulesForRoute(mockRoutes[10], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const hcmBentreSchedules = createSchedulesForRoute(mockRoutes[11], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "12:00", arrival: "14:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const hanoiHaiphongSchedules = createSchedulesForRoute(mockRoutes[12], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const danangHoianSchedules = createSchedulesForRoute(mockRoutes[13], [
  { departure: "06:00", arrival: "06:45", duration: "45m" },
  { departure: "07:00", arrival: "07:45", duration: "45m" },
  { departure: "08:00", arrival: "08:45", duration: "45m" },
  { departure: "09:00", arrival: "09:45", duration: "45m" },
  { departure: "10:00", arrival: "10:45", duration: "45m" },
  { departure: "14:00", arrival: "14:45", duration: "45m" },
  { departure: "16:00", arrival: "16:45", duration: "45m" },
  { departure: "18:00", arrival: "18:45", duration: "45m" },
]);

const hcmHanoiSchedules = createSchedulesForRoute(mockRoutes[14], [
  { departure: "05:00", arrival: "05:00", duration: "24h" },
  { departure: "06:00", arrival: "06:00", duration: "24h" },
  { departure: "07:00", arrival: "07:00", duration: "24h" },
  { departure: "08:00", arrival: "08:00", duration: "24h" },
  { departure: "09:00", arrival: "09:00", duration: "24h" },
  { departure: "10:00", arrival: "10:00", duration: "24h" },
  { departure: "17:00", arrival: "17:00", duration: "24h" },
  { departure: "18:00", arrival: "18:00", duration: "24h" },
  { departure: "19:00", arrival: "19:00", duration: "24h" },
  { departure: "20:00", arrival: "20:00", duration: "24h" },
  { departure: "21:00", arrival: "21:00", duration: "24h" },
  { departure: "22:00", arrival: "22:00", duration: "24h" },
]);

// Routes từ Huế
const hueDanangSchedules = createSchedulesForRoute(mockRoutes[15], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "12:00", arrival: "14:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const hueHoianSchedules = createSchedulesForRoute(mockRoutes[16], [
  { departure: "06:00", arrival: "09:00", duration: "3h" },
  { departure: "09:00", arrival: "12:00", duration: "3h" },
  { departure: "12:00", arrival: "15:00", duration: "3h" },
  { departure: "15:00", arrival: "18:00", duration: "3h" },
]);

const huePhuquocSchedules = createSchedulesForRoute(mockRoutes[17], [
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
]);

const hueNhatrangSchedules = createSchedulesForRoute(mockRoutes[18], [
  { departure: "06:00", arrival: "13:00", duration: "7h" },
  { departure: "08:00", arrival: "15:00", duration: "7h" },
  { departure: "14:00", arrival: "21:00", duration: "7h" },
  { departure: "20:00", arrival: "03:00", duration: "7h" },
]);

// Routes từ Đà Nẵng
const danangNhatrangSchedules = createSchedulesForRoute(mockRoutes[19], [
  { departure: "06:00", arrival: "12:00", duration: "6h" },
  { departure: "08:00", arrival: "14:00", duration: "6h" },
  { departure: "14:00", arrival: "20:00", duration: "6h" },
  { departure: "20:00", arrival: "02:00", duration: "6h" },
]);

const danangDalatSchedules = createSchedulesForRoute(mockRoutes[20], [
  { departure: "06:00", arrival: "13:00", duration: "7h" },
  { departure: "08:00", arrival: "15:00", duration: "7h" },
  { departure: "18:00", arrival: "01:00", duration: "7h" },
  { departure: "20:00", arrival: "03:00", duration: "7h" },
]);

const danangHcmSchedules = createSchedulesForRoute(mockRoutes[21], [
  { departure: "05:00", arrival: "17:00", duration: "12h" },
  { departure: "07:00", arrival: "19:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
]);

// Routes từ Nha Trang
const nhatrangDalatSchedules = createSchedulesForRoute(mockRoutes[22], [
  { departure: "06:00", arrival: "10:30", duration: "4h 30m" },
  { departure: "08:00", arrival: "12:30", duration: "4h 30m" },
  { departure: "10:00", arrival: "14:30", duration: "4h 30m" },
  { departure: "14:00", arrival: "18:30", duration: "4h 30m" },
  { departure: "16:00", arrival: "20:30", duration: "4h 30m" },
]);

const nhatrangPhanthietSchedules = createSchedulesForRoute(mockRoutes[23], [
  { departure: "06:00", arrival: "11:00", duration: "5h" },
  { departure: "09:00", arrival: "14:00", duration: "5h" },
  { departure: "13:00", arrival: "18:00", duration: "5h" },
  { departure: "15:00", arrival: "20:00", duration: "5h" },
]);

const nhatrangHcmSchedules = createSchedulesForRoute(mockRoutes[24], [
  { departure: "05:30", arrival: "14:30", duration: "9h" },
  { departure: "07:00", arrival: "16:00", duration: "9h" },
  { departure: "13:00", arrival: "22:00", duration: "9h" },
  { departure: "19:00", arrival: "04:00", duration: "9h" },
  { departure: "21:00", arrival: "06:00", duration: "9h" },
]);

// Routes từ Cần Thơ
const canthoVungtauSchedules = createSchedulesForRoute(mockRoutes[25], [
  { departure: "06:00", arrival: "10:30", duration: "4h 30m" },
  { departure: "09:00", arrival: "13:30", duration: "4h 30m" },
  { departure: "13:00", arrival: "17:30", duration: "4h 30m" },
  { departure: "15:00", arrival: "19:30", duration: "4h 30m" },
]);

const canthoDalatSchedules = createSchedulesForRoute(mockRoutes[26], [
  { departure: "06:00", arrival: "12:00", duration: "6h" },
  { departure: "08:00", arrival: "14:00", duration: "6h" },
  { departure: "14:00", arrival: "20:00", duration: "6h" },
  { departure: "18:00", arrival: "00:00", duration: "6h" },
]);

const canthoPhuquocSchedules = createSchedulesForRoute(mockRoutes[27], [
  { departure: "06:00", arrival: "14:00", duration: "8h" },
  { departure: "08:00", arrival: "16:00", duration: "8h" },
  { departure: "14:00", arrival: "22:00", duration: "8h" },
  { departure: "18:00", arrival: "02:00", duration: "8h" },
]);

// Routes từ Vũng Tàu
const vungtauDalatSchedules = createSchedulesForRoute(mockRoutes[28], [
  { departure: "06:00", arrival: "11:00", duration: "5h" },
  { departure: "08:00", arrival: "13:00", duration: "5h" },
  { departure: "10:00", arrival: "15:00", duration: "5h" },
  { departure: "14:00", arrival: "19:00", duration: "5h" },
]);

const vungtauNhatrangSchedules = createSchedulesForRoute(mockRoutes[29], [
  { departure: "06:00", arrival: "13:00", duration: "7h" },
  { departure: "08:00", arrival: "15:00", duration: "7h" },
  { departure: "14:00", arrival: "21:00", duration: "7h" },
  { departure: "18:00", arrival: "01:00", duration: "7h" },
]);

// Routes từ Hà Nội
const hanoiDanangSchedules = createSchedulesForRoute(mockRoutes[30], [
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
]);

const hanoiNhatrangSchedules = createSchedulesForRoute(mockRoutes[31], [
  { departure: "06:00", arrival: "00:00", duration: "18h" },
  { departure: "08:00", arrival: "02:00", duration: "18h" },
  { departure: "18:00", arrival: "12:00", duration: "18h" },
  { departure: "20:00", arrival: "14:00", duration: "18h" },
]);

const hanoiHcmSchedules = createSchedulesForRoute(mockRoutes[32], [
  { departure: "05:00", arrival: "05:00", duration: "24h" },
  { departure: "06:00", arrival: "06:00", duration: "24h" },
  { departure: "18:00", arrival: "18:00", duration: "24h" },
  { departure: "20:00", arrival: "20:00", duration: "24h" },
]);

// Routes từ Đà Lạt
const dalatNhatrangSchedules = createSchedulesForRoute(mockRoutes[33], [
  { departure: "06:00", arrival: "10:30", duration: "4h 30m" },
  { departure: "08:00", arrival: "12:30", duration: "4h 30m" },
  { departure: "10:00", arrival: "14:30", duration: "4h 30m" },
  { departure: "14:00", arrival: "18:30", duration: "4h 30m" },
]);

const dalatVungtauSchedules = createSchedulesForRoute(mockRoutes[34], [
  { departure: "06:00", arrival: "11:00", duration: "5h" },
  { departure: "09:00", arrival: "14:00", duration: "5h" },
  { departure: "13:00", arrival: "18:00", duration: "5h" },
  { departure: "15:00", arrival: "20:00", duration: "5h" },
]);

const dalatHcmSchedules = createSchedulesForRoute(mockRoutes[35], [
  { departure: "06:00", arrival: "12:30", duration: "6h 30m" },
  { departure: "08:00", arrival: "14:30", duration: "6h 30m" },
  { departure: "10:00", arrival: "16:30", duration: "6h 30m" },
  { departure: "14:00", arrival: "20:30", duration: "6h 30m" },
  { departure: "20:00", arrival: "02:30", duration: "6h 30m" },
]);

// Routes Phú Quốc
const phuquocHcmSchedules = createSchedulesForRoute(mockRoutes[36], [
  { departure: "06:00", arrival: "16:00", duration: "10h" },
  { departure: "08:00", arrival: "18:00", duration: "10h" },
  { departure: "18:00", arrival: "04:00", duration: "10h" },
  { departure: "20:00", arrival: "06:00", duration: "10h" },
]);

const phuquocCanthoSchedules = createSchedulesForRoute(mockRoutes[37], [
  { departure: "06:00", arrival: "14:00", duration: "8h" },
  { departure: "09:00", arrival: "17:00", duration: "8h" },
  { departure: "14:00", arrival: "22:00", duration: "8h" },
  { departure: "18:00", arrival: "02:00", duration: "8h" },
]);

const hcmPhuquocSchedules = createSchedulesForRoute(mockRoutes[38], [
  { departure: "06:00", arrival: "16:00", duration: "10h" },
  { departure: "08:00", arrival: "18:00", duration: "10h" },
  { departure: "18:00", arrival: "04:00", duration: "10h" },
  { departure: "20:00", arrival: "06:00", duration: "10h" },
]);

// Thêm schedules cho các tuyến ngược còn thiếu
const vungtauHcmSchedules = createSchedulesForRoute(mockRoutes[39], [
  { departure: "05:00", arrival: "07:30", duration: "2h 30m" },
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "07:00", arrival: "09:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "09:00", arrival: "11:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "13:00", arrival: "15:30", duration: "2h 30m" },
  { departure: "15:00", arrival: "17:30", duration: "2h 30m" },
  { departure: "17:00", arrival: "19:30", duration: "2h 30m" },
]);

const canthoHcmSchedules = createSchedulesForRoute(mockRoutes[40], [
  { departure: "05:00", arrival: "08:30", duration: "3h 30m" },
  { departure: "06:00", arrival: "09:30", duration: "3h 30m" },
  { departure: "07:00", arrival: "10:30", duration: "3h 30m" },
  { departure: "08:00", arrival: "11:30", duration: "3h 30m" },
  { departure: "10:00", arrival: "13:30", duration: "3h 30m" },
  { departure: "13:00", arrival: "16:30", duration: "3h 30m" },
  { departure: "15:00", arrival: "18:30", duration: "3h 30m" },
]);

const danangHueSchedules = createSchedulesForRoute(mockRoutes[41], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "12:00", arrival: "14:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const hoianDanangSchedules = createSchedulesForRoute(mockRoutes[42], [
  { departure: "06:00", arrival: "06:45", duration: "45m" },
  { departure: "07:00", arrival: "07:45", duration: "45m" },
  { departure: "08:00", arrival: "08:45", duration: "45m" },
  { departure: "09:00", arrival: "09:45", duration: "45m" },
  { departure: "14:00", arrival: "14:45", duration: "45m" },
  { departure: "16:00", arrival: "16:45", duration: "45m" },
  { departure: "18:00", arrival: "18:45", duration: "45m" },
]);

const hoianHueSchedules = createSchedulesForRoute(mockRoutes[43], [
  { departure: "06:00", arrival: "09:00", duration: "3h" },
  { departure: "09:00", arrival: "12:00", duration: "3h" },
  { departure: "12:00", arrival: "15:00", duration: "3h" },
  { departure: "15:00", arrival: "18:00", duration: "3h" },
]);

const sapaHanoiSchedules = createSchedulesForRoute(mockRoutes[44], [
  { departure: "05:00", arrival: "10:30", duration: "5h 30m" },
  { departure: "06:00", arrival: "11:30", duration: "5h 30m" },
  { departure: "08:00", arrival: "13:30", duration: "5h 30m" },
  { departure: "10:00", arrival: "15:30", duration: "5h 30m" },
  { departure: "14:00", arrival: "19:30", duration: "5h 30m" },
  { departure: "18:00", arrival: "23:30", duration: "5h 30m" },
]);

const halongHanoiSchedules = createSchedulesForRoute(mockRoutes[45], [
  { departure: "06:00", arrival: "09:30", duration: "3h 30m" },
  { departure: "08:00", arrival: "11:30", duration: "3h 30m" },
  { departure: "10:00", arrival: "13:30", duration: "3h 30m" },
  { departure: "12:00", arrival: "15:30", duration: "3h 30m" },
  { departure: "14:00", arrival: "17:30", duration: "3h 30m" },
  { departure: "16:00", arrival: "19:30", duration: "3h 30m" },
]);

const ninhbinhHanoiSchedules = createSchedulesForRoute(mockRoutes[46], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const bentreHcmSchedules = createSchedulesForRoute(mockRoutes[47], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "12:00", arrival: "14:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const haiphongHanoiSchedules = createSchedulesForRoute(mockRoutes[48], [
  { departure: "06:00", arrival: "08:30", duration: "2h 30m" },
  { departure: "08:00", arrival: "10:30", duration: "2h 30m" },
  { departure: "10:00", arrival: "12:30", duration: "2h 30m" },
  { departure: "14:00", arrival: "16:30", duration: "2h 30m" },
  { departure: "16:00", arrival: "18:30", duration: "2h 30m" },
]);

const phanthietHcmSchedules = createSchedulesForRoute(mockRoutes[49], [
  { departure: "05:00", arrival: "09:00", duration: "4h" },
  { departure: "06:00", arrival: "10:00", duration: "4h" },
  { departure: "08:00", arrival: "12:00", duration: "4h" },
  { departure: "10:00", arrival: "14:00", duration: "4h" },
  { departure: "13:00", arrival: "17:00", duration: "4h" },
  { departure: "15:00", arrival: "19:00", duration: "4h" },
  { departure: "17:00", arrival: "21:00", duration: "4h" },
]);

const muineHcmSchedules = createSchedulesForRoute(mockRoutes[50], [
  { departure: "05:30", arrival: "10:00", duration: "4h 30m" },
  { departure: "07:30", arrival: "12:00", duration: "4h 30m" },
  { departure: "09:00", arrival: "13:30", duration: "4h 30m" },
  { departure: "11:00", arrival: "15:30", duration: "4h 30m" },
  { departure: "13:00", arrival: "17:30", duration: "4h 30m" },
  { departure: "15:00", arrival: "19:30", duration: "4h 30m" },
]);

const phuquocHueSchedules = createSchedulesForRoute(mockRoutes[51], [
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
]);

const phanthietNhatrangSchedules = createSchedulesForRoute(mockRoutes[52], [
  { departure: "06:00", arrival: "11:00", duration: "5h" },
  { departure: "09:00", arrival: "14:00", duration: "5h" },
  { departure: "13:00", arrival: "18:00", duration: "5h" },
  { departure: "15:00", arrival: "20:00", duration: "5h" },
]);

const dalatDanangSchedules = createSchedulesForRoute(mockRoutes[53], [
  { departure: "06:00", arrival: "13:00", duration: "7h" },
  { departure: "08:00", arrival: "15:00", duration: "7h" },
  { departure: "18:00", arrival: "01:00", duration: "7h" },
  { departure: "20:00", arrival: "03:00", duration: "7h" },
]);

const dalatCanthoSchedules = createSchedulesForRoute(mockRoutes[54], [
  { departure: "06:00", arrival: "12:00", duration: "6h" },
  { departure: "08:00", arrival: "14:00", duration: "6h" },
  { departure: "14:00", arrival: "20:00", duration: "6h" },
  { departure: "18:00", arrival: "00:00", duration: "6h" },
]);

const nhatrangDanangSchedules2 = createSchedulesForRoute(mockRoutes[55], [
  { departure: "06:00", arrival: "12:00", duration: "6h" },
  { departure: "08:00", arrival: "14:00", duration: "6h" },
  { departure: "14:00", arrival: "20:00", duration: "6h" },
  { departure: "20:00", arrival: "02:00", duration: "6h" },
]);

const nhatrangHueSchedules2 = createSchedulesForRoute(mockRoutes[56], [
  { departure: "06:00", arrival: "13:00", duration: "7h" },
  { departure: "08:00", arrival: "15:00", duration: "7h" },
  { departure: "14:00", arrival: "21:00", duration: "7h" },
  { departure: "20:00", arrival: "03:00", duration: "7h" },
]);

const vungtauCanthoSchedules2 = createSchedulesForRoute(mockRoutes[57], [
  { departure: "06:00", arrival: "10:30", duration: "4h 30m" },
  { departure: "09:00", arrival: "13:30", duration: "4h 30m" },
  { departure: "13:00", arrival: "17:30", duration: "4h 30m" },
  { departure: "15:00", arrival: "19:30", duration: "4h 30m" },
]);

const hueHanoiSchedules2 = createSchedulesForRoute(mockRoutes[58], [
  { departure: "06:00", arrival: "18:00", duration: "12h" },
  { departure: "08:00", arrival: "20:00", duration: "12h" },
  { departure: "18:00", arrival: "06:00", duration: "12h" },
  { departure: "20:00", arrival: "08:00", duration: "12h" },
]);

export const mockSchedules: RouteSchedule[] = [
  ...hcmDalatSchedules,
  ...hcmNhatrangSchedules,
  ...hanoiSapaSchedules,
  ...hcmVungtauSchedules,
  ...hanoiHalongSchedules,
  ...hcmCanthoSchedules,
  ...hcmDanangSchedules,
  ...hanoiHueSchedules,
  ...hcmPhanthietSchedules,
  ...hcmMuineSchedules,
  ...hanoiNinhbinhSchedules,
  ...hcmBentreSchedules,
  ...hanoiHaiphongSchedules,
  ...danangHoianSchedules,
  ...hcmHanoiSchedules,
  ...hueDanangSchedules,
  ...hueHoianSchedules,
  ...huePhuquocSchedules,
  ...hueNhatrangSchedules,
  ...danangNhatrangSchedules,
  ...danangDalatSchedules,
  ...danangHcmSchedules,
  ...nhatrangDalatSchedules,
  ...nhatrangPhanthietSchedules,
  ...nhatrangHcmSchedules,
  ...canthoVungtauSchedules,
  ...canthoDalatSchedules,
  ...canthoPhuquocSchedules,
  ...vungtauDalatSchedules,
  ...vungtauNhatrangSchedules,
  ...hanoiDanangSchedules,
  ...hanoiNhatrangSchedules,
  ...hanoiHcmSchedules,
  ...dalatNhatrangSchedules,
  ...dalatVungtauSchedules,
  ...dalatHcmSchedules,
  ...phuquocHcmSchedules,
  ...phuquocCanthoSchedules,
  ...hcmPhuquocSchedules,
  ...vungtauHcmSchedules,
  ...canthoHcmSchedules,
  ...danangHueSchedules,
  ...hoianDanangSchedules,
  ...hoianHueSchedules,
  ...sapaHanoiSchedules,
  ...halongHanoiSchedules,
  ...ninhbinhHanoiSchedules,
  ...bentreHcmSchedules,
  ...haiphongHanoiSchedules,
  ...phanthietHcmSchedules,
  ...muineHcmSchedules,
  ...phuquocHueSchedules,
  ...phanthietNhatrangSchedules,
  ...dalatDanangSchedules,
  ...dalatCanthoSchedules,
  ...nhatrangDanangSchedules2,
  ...nhatrangHueSchedules2,
  ...vungtauCanthoSchedules2,
  ...hueHanoiSchedules2,
];

// Helper function để lấy schedules theo route
export function getSchedulesByRoute(from: string, to: string): RouteSchedule[] {
  return mockSchedules.filter(
    (schedule) =>
      schedule.from.toLowerCase().includes(from.toLowerCase()) &&
      schedule.to.toLowerCase().includes(to.toLowerCase())
  );
}

// Helper function để lấy schedule theo ID
export function getScheduleById(id: string): RouteSchedule | undefined {
  return mockSchedules.find((schedule) => schedule.id === id);
}

