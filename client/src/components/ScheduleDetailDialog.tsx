import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, MapPin, Users, Wifi, Tv, Coffee, Snowflake, CheckCircle2 } from "lucide-react";
import type { RouteSchedule } from "@/types";

interface ScheduleDetailDialogProps {
  schedule: RouteSchedule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  from: string;
  to: string;
  tripType?: string;
}

export function ScheduleDetailDialog({
  schedule,
  open,
  onOpenChange,
  from,
  to,
  tripType,
}: ScheduleDetailDialogProps) {
  const [, setLocation] = useLocation();

  if (!schedule) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-5 w-5" />;
      case "tv":
        return <Tv className="h-5 w-5" />;
      case "nước suối":
        return <Coffee className="h-5 w-5" />;
      case "điều hòa":
        return <Snowflake className="h-5 w-5" />;
      default:
        return <CheckCircle2 className="h-5 w-5" />;
    }
  };

  const handleBooking = () => {
    onOpenChange(false);
    const url = tripType 
      ? `/booking/${schedule.id}?tripType=${tripType}`
      : `/booking/${schedule.id}`;
    setLocation(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Chi tiết chuyến xe</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Info */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bus className="h-6 w-6 text-futa-red" />
                <span className="text-lg font-semibold">{schedule.busType}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                <Users className="mr-1 h-4 w-4" />
                {schedule.availableSeats} ghế trống
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-3xl font-bold text-futa-red">
                  {schedule.departureTime}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <MapPin className="mr-1 h-4 w-4" />
                  {from}
                </div>
              </div>

              <div className="flex flex-col items-center px-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="my-1 h-px w-24 bg-gray-300"></div>
                <span className="text-sm text-gray-600">{schedule.duration}</span>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-futa-red">
                  {schedule.arrivalTime}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <MapPin className="mr-1 h-4 w-4" />
                  {to}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="mb-3 font-semibold">Tiện ích trên xe</h3>
            <div className="grid grid-cols-2 gap-3">
              {schedule.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3"
                >
                  <div className="text-futa-red">{getAmenityIcon(amenity)}</div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seat Layout Preview */}
          <div>
            <h3 className="mb-3 font-semibold">Sơ đồ ghế</h3>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 text-center text-sm text-gray-600">
                {schedule.busType === "Giường nằm" ? "2 tầng - 40 ghế" : "1 tầng - 45 ghế"}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded border-2 border-gray-300 bg-white"></div>
                  <span>Trống</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded border-2 border-futa-red bg-futa-red/10"></div>
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded bg-gray-300"></div>
                  <span>Đã đặt</span>
                </div>
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                Chọn ghế chi tiết trong bước tiếp theo
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-3 font-semibold">Chính sách</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>Được phép hủy vé miễn phí trước 24 giờ khởi hành</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>Hành lý xách tay tối đa 7kg, hành lý ký gửi tối đa 20kg</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>Có mặt tại điểm đón trước 15 phút</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>Mang theo CMND/CCCD để đối chiếu thông tin</span>
              </li>
            </ul>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <div className="text-sm text-gray-600">Giá vé</div>
              <div className="text-3xl font-bold text-futa-red">
                {formatPrice(schedule.price)}
              </div>
            </div>
            <Button
              size="lg"
              className="bg-futa-red hover:bg-futa-red/90"
              onClick={handleBooking}
            >
              Tiếp tục đặt vé
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

