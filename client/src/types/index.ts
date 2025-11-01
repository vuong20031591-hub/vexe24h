// Core entity types
export interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  image: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  content?: string; // Full article content in HTML or markdown
  date: string;
  image: string;
  link?: string;
}

// Enhanced types for booking flow
export interface RouteSchedule {
  id: string;
  routeId: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  availableSeats: number;
  totalSeats: number;
  busType: "Giường nằm" | "Ghế ngồi";
  price: number;
  amenities: string[];
  departureDate: string;
}

export interface Seat {
  id: string;
  scheduleId: string;
  row: number;
  column: number;
  floor: 1 | 2;
  type: "single" | "double";
  status: "available" | "booked" | "selected";
  price: number;
  label: string; // e.g., "A1", "B2"
}

export interface PromotionDetail extends Promotion {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  content: string;
}



// Booking related types
export interface PassengerInfo {
  fullName: string;
  phone: string;
  email: string;
  note?: string;
}

export interface PickupDropoff {
  pickupPoint: string;
  dropoffPoint: string;
}

export interface BookingRequest {
  scheduleId: string;
  seatIds: string[];
  passengerInfo: PassengerInfo;
  pickupDropoff: PickupDropoff;
  promoCode?: string;
  totalPrice: number;
  paymentMethod?: PaymentMethod;
}

export interface Booking extends BookingRequest {
  id: string;
  code: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface BookingResponse {
  success: boolean;
  bookingCode: string;
  message: string;
  booking?: Booking;
}

// Search types
export interface SearchQuery {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  tripType: "one-way" | "round-trip";
  passengers: number;
}

export interface SearchResult {
  schedules: RouteSchedule[];
  query: SearchQuery;
}

// Payment types
export type PaymentMethod = "momo" | "card" | "bank";

export interface PaymentInfo {
  method: PaymentMethod;
  amount: number;
  bookingCode: string;
}

