import { create } from "zustand";
import type { Seat, PassengerInfo, PickupDropoff, RouteSchedule } from "@/types";

interface BookingState {
  // Current booking session
  selectedSchedule: RouteSchedule | null;
  selectedSeats: Seat[];
  passengerInfo: PassengerInfo | null;
  pickupDropoff: PickupDropoff | null;
  promoCode: string | null;
  
  // Actions
  setSelectedSchedule: (schedule: RouteSchedule | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  setPassengerInfo: (info: PassengerInfo) => void;
  setPickupDropoff: (info: PickupDropoff) => void;
  setPromoCode: (code: string | null) => void;
  clearBooking: () => void;
  
  // Computed
  getTotalPrice: () => number;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedSchedule: null,
  selectedSeats: [],
  passengerInfo: null,
  pickupDropoff: null,
  promoCode: null,

  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),

  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  addSeat: (seat) =>
    set((state) => ({
      selectedSeats: [...state.selectedSeats, seat],
    })),

  removeSeat: (seatId) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
    })),

  setPassengerInfo: (info) => set({ passengerInfo: info }),

  setPickupDropoff: (info) => set({ pickupDropoff: info }),

  setPromoCode: (code) => set({ promoCode: code }),

  clearBooking: () =>
    set({
      selectedSchedule: null,
      selectedSeats: [],
      passengerInfo: null,
      pickupDropoff: null,
      promoCode: null,
    }),

  getTotalPrice: () => {
    const { selectedSeats } = get();
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  },
}));

