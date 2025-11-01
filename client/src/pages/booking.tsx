import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Check, Smartphone, CreditCard, Building2 } from "lucide-react";
import { routeService, seatService, bookingService } from "@/services";
import type { Seat, PassengerInfo, PickupDropoff, PaymentMethod } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const [, params] = useRoute("/booking/:scheduleId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const scheduleId = params?.scheduleId || "";

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    fullName: "",
    phone: "",
    email: "",
    note: "",
  });
  const [pickupDropoff, setPickupDropoff] = useState<PickupDropoff>({
    pickupPoint: "Bến xe Miền Đông",
    dropoffPoint: "Bến xe Đà Lạt",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");

  // Fetch schedule
  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: () => routeService.getScheduleById(scheduleId),
    enabled: !!scheduleId,
  });

  // Fetch seats
  const { data: seats, isLoading: seatsLoading, refetch: refetchSeats } = useQuery({
    queryKey: ["seats", scheduleId],
    queryFn: () => schedule ? seatService.getSeats(schedule) : Promise.resolve([]),
    enabled: !!schedule,
  });

  // Load selected seats on mount and when seats change
  useEffect(() => {
    if (seats && scheduleId && schedule) {
      seatService.getSelectedSeats(scheduleId, schedule.price).then(selected => {
        setSelectedSeats(selected);
      });
    }
  }, [seats, scheduleId, schedule]);

  // Toggle seat selection
  const toggleSeatMutation = useMutation({
    mutationFn: (seatId: string) => seatService.toggleSeat(scheduleId, seatId),
    onSuccess: async () => {
      // Refresh seats to show updated status
      await refetchSeats();
      // Refresh selected seats for summary
      if (schedule) {
        const selected = await seatService.getSelectedSeats(scheduleId, schedule.price);
        setSelectedSeats(selected);
      }
    },
  });

  // Create booking
  const createBookingMutation = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: (response) => {
      // Save ticket to localStorage with schedule info
      if (response.booking && schedule) {
        const ticketsJson = localStorage.getItem("tickets");
        const tickets = ticketsJson ? JSON.parse(ticketsJson) : [];
        // Add schedule details to booking for display in my-tickets
        const ticketWithSchedule = {
          ...response.booking,
          scheduleDetails: {
            from: schedule.from,
            to: schedule.to,
            departureTime: schedule.departureTime,
            arrivalTime: schedule.arrivalTime,
            departureDate: schedule.departureDate,
            busType: schedule.busType,
          }
        };
        tickets.push(ticketWithSchedule);
        localStorage.setItem("tickets", JSON.stringify(tickets));
      }
      
      toast({
        title: "Đặt vé thành công!",
        description: `Mã đặt vé: ${response.bookingCode}`,
      });
      setLocation(`/booking-success?code=${response.bookingCode}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Đặt vé thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;
    toggleSeatMutation.mutate(seat.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate seats
    if (selectedSeats.length === 0) {
      toast({
        title: "Vui lòng chọn ghế",
        variant: "destructive",
      });
      return;
    }

    // Validate passenger info
    if (!passengerInfo.fullName.trim()) {
      toast({
        title: "Vui lòng nhập họ tên",
        variant: "destructive",
      });
      return;
    }

    if (!passengerInfo.phone.trim()) {
      toast({
        title: "Vui lòng nhập số điện thoại",
        variant: "destructive",
      });
      return;
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(passengerInfo.phone.trim())) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Vui lòng nhập 10 chữ số",
        variant: "destructive",
      });
      return;
    }

    if (!passengerInfo.email.trim()) {
      toast({
        title: "Vui lòng nhập email",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(passengerInfo.email.trim())) {
      toast({
        title: "Email không hợp lệ",
        variant: "destructive",
      });
      return;
    }

    // Validate payment method
    if (!paymentMethod) {
      toast({
        title: "Vui lòng chọn phương thức thanh toán",
        variant: "destructive",
      });
      return;
    }

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    createBookingMutation.mutate({
      scheduleId,
      seatIds: selectedSeats.map(s => s.id),
      passengerInfo,
      pickupDropoff,
      totalPrice,
      paymentMethod,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // Check if form is valid
  const isFormValid =
    selectedSeats.length > 0 &&
    passengerInfo.fullName.trim() !== "" &&
    passengerInfo.phone.trim() !== "" &&
    /^[0-9]{10}$/.test(passengerInfo.phone.trim()) &&
    passengerInfo.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengerInfo.email.trim()) &&
    !!paymentMethod;

  if (scheduleLoading || seatsLoading) {
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

  if (!schedule) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Không tìm thấy chuyến xe</h2>
            <Button
              className="mt-4 bg-futa-red hover:bg-futa-red/90"
              onClick={() => setLocation("/")}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Đặt vé xe</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left: Seat Selection */}
          <div className="space-y-6">
            {/* Schedule Info */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Thông tin chuyến xe</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Tuyến:</strong> {schedule.from} → {schedule.to}</p>
                <p><strong>Giờ khởi hành:</strong> {schedule.departureTime}</p>
                <p><strong>Loại xe:</strong> {schedule.busType}</p>
              </div>
            </Card>

            {/* Seat Map */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Chọn ghế</h2>
              <div className="mb-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded border-2 border-gray-300 bg-white" />
                  <span>Trống</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded border-2 border-futa-red bg-futa-red/10" />
                  <span>Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-300" />
                  <span>Đã đặt</span>
                </div>
              </div>

              {/* Simplified seat grid */}
              <div className="grid grid-cols-4 gap-2">
                {seats?.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "booked"}
                    className={`
                      h-12 rounded border-2 text-sm font-medium transition-all
                      ${seat.status === "available" ? "border-gray-300 bg-white hover:border-futa-red" : ""}
                      ${seat.status === "selected" ? "border-futa-red bg-futa-red/10" : ""}
                      ${seat.status === "booked" ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""}
                    `}
                  >
                    {seat.label}
                    {seat.status === "selected" && <Check className="mx-auto h-4 w-4" />}
                  </button>
                ))}
              </div>
            </Card>

            {/* Passenger Form */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Thông tin hành khách</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    required
                    value={passengerInfo.fullName}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={passengerInfo.phone}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={passengerInfo.email}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    value={passengerInfo.note}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, note: e.target.value })}
                  />
                </div>
              </form>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Phương thức thanh toán</h2>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "momo"
                      ? "border-futa-red bg-futa-red/5"
                      : "border-gray-200 hover:border-futa-red"
                  }`}>
                    <RadioGroupItem value="momo" id="payment-momo" />
                    <Label htmlFor="payment-momo" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                        <Smartphone className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium">Ví MoMo</div>
                        <div className="text-sm text-gray-500">Thanh toán qua ví điện tử MoMo</div>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "card"
                      ? "border-futa-red bg-futa-red/5"
                      : "border-gray-200 hover:border-futa-red"
                  }`}>
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Thẻ ATM/Visa/Master</div>
                        <div className="text-sm text-gray-500">Thanh toán bằng thẻ ngân hàng</div>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "bank"
                      ? "border-futa-red bg-futa-red/5"
                      : "border-gray-200 hover:border-futa-red"
                  }`}>
                    <RadioGroupItem value="bank" id="payment-bank" />
                    <Label htmlFor="payment-bank" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <Building2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-gray-500">Chuyển khoản qua Internet Banking</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Right: Summary */}
          <div>
            <Card className="sticky top-4 p-6">
              <h2 className="mb-4 text-lg font-semibold">Tóm tắt đặt vé</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Ghế đã chọn:</p>
                  <p className="font-medium">
                    {selectedSeats.length > 0
                      ? selectedSeats.map(s => s.label).join(", ")
                      : "Chưa chọn ghế"}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng tiền:</span>
                    <span className="text-futa-red">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-futa-red hover:bg-futa-red/90"
                  onClick={handleSubmit}
                  disabled={!isFormValid || createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xác nhận đặt vé"
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

