import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, Download, Home } from "lucide-react";
import { bookingService } from "@/services";

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  
  // Get booking code from URL
  const params = new URLSearchParams(window.location.search);
  const bookingCode = params.get("code") || "";

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingCode],
    queryFn: () => bookingService.getBookingByCode(bookingCode),
    enabled: !!bookingCode,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (isLoading) {
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

  if (!booking) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Không tìm thấy thông tin đặt vé</h2>
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
      <main className="container mx-auto max-w-3xl px-4 py-8">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Đặt vé thành công!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã sử dụng dịch vụ của DatVe360
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6 p-6">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">Thông tin đặt vé</h2>
          </div>

          <div className="space-y-4">
            {/* Booking Code */}
            <div className="rounded-lg bg-futa-red/5 p-4">
              <p className="mb-1 text-sm text-gray-600">Mã đặt vé</p>
              <p className="text-2xl font-bold text-futa-red">{booking.code}</p>
            </div>

            {/* Passenger Info */}
            <div>
              <h3 className="mb-2 font-semibold">Thông tin hành khách</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Họ tên:</strong> {booking.passengerInfo.fullName}</p>
                <p><strong>Số điện thoại:</strong> {booking.passengerInfo.phone}</p>
                <p><strong>Email:</strong> {booking.passengerInfo.email}</p>
                {booking.passengerInfo.note && (
                  <p><strong>Ghi chú:</strong> {booking.passengerInfo.note}</p>
                )}
              </div>
            </div>

            {/* Pickup/Dropoff */}
            <div>
              <h3 className="mb-2 font-semibold">Điểm đón/trả</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Điểm đón:</strong> {booking.pickupDropoff.pickupPoint}</p>
                <p><strong>Điểm trả:</strong> {booking.pickupDropoff.dropoffPoint}</p>
              </div>
            </div>

            {/* Seats */}
            <div>
              <h3 className="mb-2 font-semibold">Ghế đã chọn</h3>
              <p className="text-sm">{booking.seatIds.length} ghế</p>
            </div>

            {/* Price */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="font-bold text-futa-red">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Status & Time */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <p><strong>Trạng thái:</strong> {
                booking.status === "confirmed" ? "Đã xác nhận" :
                booking.status === "pending" ? "Chờ xác nhận" :
                "Đã hủy"
              }</p>
              <p><strong>Thời gian đặt:</strong> {formatDate(booking.createdAt)}</p>
            </div>
          </div>
        </Card>

        {/* Important Notes */}
        <Card className="mb-6 border-l-4 border-l-yellow-500 bg-yellow-50 p-6">
          <h3 className="mb-2 font-semibold text-yellow-900">Lưu ý quan trọng</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-yellow-800">
            <li>Vui lòng có mặt tại điểm đón trước giờ khởi hành 15 phút</li>
            <li>Mang theo CMND/CCCD để đối chiếu thông tin</li>
            <li>Thông tin đặt vé đã được gửi qua email</li>
            <li>Liên hệ hotline 1900-xxxx nếu cần hỗ trợ</li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            className="flex-1 bg-futa-red hover:bg-futa-red/90"
            onClick={() => setLocation("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Về trang chủ
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.print()}
          >
            <Download className="mr-2 h-4 w-4" />
            In vé
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

