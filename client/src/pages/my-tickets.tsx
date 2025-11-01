import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Calendar, Clock, MapPin, Download, X, AlertCircle } from "lucide-react";
import type { Booking, RouteSchedule } from "@/types";

interface BookingWithSchedule extends Booking {
  scheduleDetails?: {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    departureDate: string;
    busType: string;
  };
}
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MyTickets() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<BookingWithSchedule[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [ticketToCancel, setTicketToCancel] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để xem vé của mình",
        variant: "destructive",
      });
      setLocation("/");
      return;
    }

    const user = JSON.parse(userJson);
    setCurrentUser(user);

    // Get all tickets from localStorage
    const ticketsJson = localStorage.getItem("tickets");
    
    if (ticketsJson) {
      const allTickets: BookingWithSchedule[] = JSON.parse(ticketsJson);
      
      // Filter tickets by user email or phone
      const userTickets = allTickets.filter(
        (ticket) =>
          ticket.passengerInfo.email === user.email ||
          ticket.passengerInfo.phone === user.phone
      );
      setTickets(userTickets);
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const handleCancelTicket = (bookingId: string) => {
    setTicketToCancel(bookingId);
  };

  const confirmCancelTicket = () => {
    if (!ticketToCancel) return;

    // Get all tickets
    const ticketsJson = localStorage.getItem("tickets");
    if (ticketsJson) {
      const allTickets: BookingWithSchedule[] = JSON.parse(ticketsJson);
      // Update ticket status to cancelled
      const updatedTickets = allTickets.map((ticket) =>
        ticket.id === ticketToCancel
          ? { ...ticket, status: "cancelled" as const }
          : ticket
      );
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      // Update UI
      const userTickets = updatedTickets.filter(
        (ticket) =>
          ticket.passengerInfo.email === currentUser?.email ||
          ticket.passengerInfo.phone === currentUser?.phone
      );
      setTickets(userTickets);

      toast({
        title: "Hủy vé thành công",
        description: "Vé của bạn đã được hủy",
      });
    }

    setTicketToCancel(null);
  };

  const handlePrintTicket = (ticket: BookingWithSchedule) => {
    // Create a printable version
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Vé xe - ${ticket.code}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .ticket { max-width: 600px; margin: 0 auto; border: 2px solid #000; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .code { font-size: 24px; font-weight: bold; color: #E31E25; }
              .section { margin-bottom: 15px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="header">
                <h1>DatVe360</h1>
                <div class="code">MÃ VÉ: ${ticket.code}</div>
              </div>
              ${ticket.scheduleDetails ? `
              <div class="section">
                <div class="label">Tuyến đường:</div>
                <div>${ticket.scheduleDetails.from} → ${ticket.scheduleDetails.to}</div>
              </div>
              <div class="section">
                <div class="label">Ngày đi:</div>
                <div>${formatDate(ticket.scheduleDetails.departureDate)}</div>
              </div>
              <div class="section">
                <div class="label">Giờ khởi hành:</div>
                <div>${ticket.scheduleDetails.departureTime}</div>
              </div>
              <div class="section">
                <div class="label">Loại xe:</div>
                <div>${ticket.scheduleDetails.busType}</div>
              </div>
              ` : ''}
              <div class="section">
                <div class="label">Hành khách:</div>
                <div>${ticket.passengerInfo.fullName}</div>
              </div>
              <div class="section">
                <div class="label">Số điện thoại:</div>
                <div>${ticket.passengerInfo.phone}</div>
              </div>
              <div class="section">
                <div class="label">Email:</div>
                <div>${ticket.passengerInfo.email}</div>
              </div>
              <div class="section">
                <div class="label">Số ghế:</div>
                <div>${ticket.seatIds.length} ghế</div>
              </div>
              <div class="section">
                <div class="label">Điểm đón:</div>
                <div>${ticket.pickupDropoff.pickupPoint}</div>
              </div>
              <div class="section">
                <div class="label">Điểm trả:</div>
                <div>${ticket.pickupDropoff.dropoffPoint}</div>
              </div>
              <div class="section">
                <div class="label">Tổng tiền:</div>
                <div>${formatPrice(ticket.totalPrice)}</div>
              </div>
              <div class="section">
                <div class="label">Trạng thái:</div>
                <div>${
                  ticket.status === "confirmed"
                    ? "Đã xác nhận"
                    : ticket.status === "pending"
                    ? "Chờ xác nhận"
                    : "Đã hủy"
                }</div>
              </div>
              <div class="section">
                <div class="label">Ngày đặt:</div>
                <div>${formatDateTime(ticket.createdAt)}</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Đã xác nhận</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Chờ xác nhận</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Vé của tôi</h1>
          <p className="text-gray-600">
            Quản lý các vé xe bạn đã đặt
          </p>
        </div>

        {tickets.length === 0 ? (
          <Card className="p-12 text-center">
            <Ticket className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h2 className="mb-2 text-xl font-semibold">Chưa có vé nào</h2>
            <p className="mb-4 text-gray-600">
              Bạn chưa đặt vé nào. Hãy tìm chuyến xe phù hợp với bạn!
            </p>
            <Button
              className="bg-futa-red hover:bg-futa-red/90"
              onClick={() => setLocation("/")}
            >
              Đặt vé ngay
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-xl font-bold text-futa-red">
                          {ticket.code}
                        </h3>
                        {getStatusBadge(ticket.status)}
                      </div>
                      {ticket.scheduleDetails && (
                        <p className="mb-1 text-base font-medium">
                          {ticket.scheduleDetails.from} → {ticket.scheduleDetails.to}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Đặt ngày {formatDateTime(ticket.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-futa-red">
                        {formatPrice(ticket.totalPrice)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ticket.seatIds.length} ghế
                      </p>
                    </div>
                  </div>

                  {/* Schedule Info */}
                  {ticket.scheduleDetails && (
                    <div className="grid gap-4 rounded-lg bg-blue-50 p-4 sm:grid-cols-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Ngày đi</p>
                          <p className="font-medium">
                            {formatDate(ticket.scheduleDetails.departureDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Giờ khởi hành</p>
                          <p className="font-medium">
                            {ticket.scheduleDetails.departureTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Ticket className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Loại xe</p>
                          <p className="font-medium">
                            {ticket.scheduleDetails.busType}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passenger Info */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold">Thông tin hành khách</h4>
                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-gray-600">Họ tên:</span>{" "}
                        <span className="font-medium">
                          {ticket.passengerInfo.fullName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">SĐT:</span>{" "}
                        <span className="font-medium">
                          {ticket.passengerInfo.phone}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-600">Email:</span>{" "}
                        <span className="font-medium">
                          {ticket.passengerInfo.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pickup/Dropoff */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-futa-red" />
                      <div>
                        <p className="text-sm text-gray-600">Điểm đón</p>
                        <p className="font-medium">
                          {ticket.pickupDropoff.pickupPoint}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-futa-red" />
                      <div>
                        <p className="text-sm text-gray-600">Điểm trả</p>
                        <p className="font-medium">
                          {ticket.pickupDropoff.dropoffPoint}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 border-t pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrintTicket(ticket)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      In vé
                    </Button>
                    {ticket.status !== "cancelled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleCancelTicket(ticket.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Hủy vé
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={!!ticketToCancel}
        onOpenChange={() => setTicketToCancel(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Xác nhận hủy vé
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy vé này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelTicket}
              className="bg-red-600 hover:bg-red-700"
            >
              Có, hủy vé
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
