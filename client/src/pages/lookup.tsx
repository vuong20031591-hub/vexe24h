import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Ticket, User, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Lookup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      toast({
        title: "Vui lòng nhập thông tin",
        description: "Nhập mã vé hoặc số điện thoại để tra cứu",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      
      // Get tickets from localStorage
      const ticketsJson = localStorage.getItem("tickets");
      const tickets = ticketsJson ? JSON.parse(ticketsJson) : [];
      
      // Search by booking code or phone
      const foundTicket = tickets.find((ticket: any) => 
        ticket.code === searchValue.trim().toUpperCase() ||
        ticket.passengerInfo?.phone === searchValue.trim()
      );

      if (foundTicket) {
        toast({
          title: "Tìm thấy vé!",
          description: "Đang chuyển đến chi tiết vé...",
        });
        // Redirect to my-tickets page
        setLocation("/my-tickets");
      } else {
        toast({
          title: "Không tìm thấy vé",
          description: "Vui lòng kiểm tra lại mã vé hoặc số điện thoại",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Tra cứu thông tin đặt vé</h1>

        {/* Purpose Section */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Mục đích</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Tính năng tra cứu thông tin đặt vé giúp khách hàng dễ dàng kiểm tra lại chi tiết vé đã mua, bao gồm:
          </p>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Thông tin chuyến đi (nhà xe, tuyến đường, giờ khởi hành, số ghế)</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Tình trạng thanh toán</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Mã vé điện tử và mã QR dùng khi lên xe</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Chính sách hủy hoặc đổi vé của chuyến xe</span>
            </div>
          </div>
        </Card>

        {/* Search Methods */}
        <Card className="p-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">2. Cách tra cứu</h2>

          {/* Method 1: Quick Search */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-futa-red/5 to-orange-50 border-2 border-futa-red/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-futa-red text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Tra cứu nhanh</h3>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="search" className="text-base font-medium">
                  Nhập mã vé hoặc số điện thoại
                </Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Ví dụ: DV360-20250102-ABCD hoặc 0901234567"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-futa-red hover:bg-futa-red/90 text-base font-semibold"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>Đang tra cứu...</>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Tra cứu
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 p-4 rounded-lg bg-white/80">
              <p className="text-sm text-gray-600">
                <strong>Lưu ý:</strong> Hệ thống sẽ hiển thị đầy đủ thông tin vé của bạn sau khi tra cứu thành công.
              </p>
            </div>
          </div>

          {/* Method 2: Via Account */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Tra cứu qua tài khoản</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-gray-700">Đăng nhập vào tài khoản VEXE24H</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-gray-700">Vào mục "Vé của tôi"</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-gray-700">Xem chi tiết các vé đã đặt, vé sắp đi và lịch sử đặt vé</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setLocation("/my-tickets")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Vé của tôi
                </Button>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-white/80">
              <p className="text-sm text-gray-600">
                <strong>Ưu điểm:</strong> Quản lý tất cả vé đã đặt ở một nơi, dễ dàng theo dõi lịch sử và tình trạng vé.
              </p>
            </div>
          </div>
        </Card>

        {/* Help Section */}
        <Card className="mt-8 p-6 bg-amber-50 border-amber-200">
          <h3 className="mb-3 font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Cần hỗ trợ?
          </h3>
          <p className="mb-4 text-sm text-gray-700">
            Nếu bạn gặp khó khăn trong việc tra cứu thông tin vé, vui lòng liên hệ với chúng tôi:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:0703948071"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-amber-300 text-sm font-medium text-gray-900 hover:bg-amber-100"
            >
              📞 Hotline: 0703948071
            </a>
            <a
              href="mailto:vexe24h@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-amber-300 text-sm font-medium text-gray-900 hover:bg-amber-100"
            >
              📧 Email: vexe24h@gmail.com
            </a>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
