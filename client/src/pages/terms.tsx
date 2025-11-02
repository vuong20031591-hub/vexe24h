import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Điều khoản sử dụng</h1>

        <Card className="p-8">
          <div className="prose prose-gray max-w-none">
            {/* 1. Giới thiệu */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed">
                Chào mừng Quý khách đến với website <strong>VEXE24H</strong> – nền tảng đặt vé xe trực tuyến giúp kết nối hành khách với các nhà xe trên toàn quốc. Khi truy cập và sử dụng website này, Quý khách đồng ý tuân thủ các điều khoản và điều kiện được quy định dưới đây. Nếu Quý khách không đồng ý với bất kỳ nội dung nào trong Điều khoản sử dụng, vui lòng ngừng truy cập hoặc sử dụng dịch vụ.
              </p>
            </section>

            {/* 2. Phạm vi dịch vụ */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Phạm vi dịch vụ</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                VEXE24H cung cấp dịch vụ trung gian giúp người dùng:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Tìm kiếm, so sánh và đặt vé xe khách trực tuyến.</li>
                <li>Nhận thông tin chi tiết về lịch trình, giá vé, và chính sách của từng nhà xe.</li>
                <li>Thanh toán trực tuyến an toàn thông qua các cổng thanh toán được tích hợp.</li>
              </ul>
              <p className="mt-4 text-gray-700 leading-relaxed">
                <strong>Lưu ý:</strong> VEXE24H không trực tiếp cung cấp dịch vụ vận chuyển mà chỉ đóng vai trò kết nối giữa khách hàng và nhà xe.
              </p>
            </section>

            {/* 3. Quyền và nghĩa vụ của người dùng */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. Quyền và nghĩa vụ của người dùng</h2>
              
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Người dùng có trách nhiệm:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>Cung cấp thông tin chính xác khi đặt vé (họ tên, số điện thoại, email, thời gian khởi hành,…).</li>
                <li>Thanh toán đầy đủ chi phí theo quy định.</li>
                <li>Kiểm tra kỹ thông tin vé trước khi xác nhận đặt chỗ.</li>
              </ul>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">Người dùng không được phép:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Sử dụng website cho mục đích gian lận, lừa đảo hoặc gây ảnh hưởng đến hệ thống.</li>
                <li>Sao chép, chỉnh sửa, phân phối hoặc khai thác trái phép bất kỳ nội dung nào thuộc quyền sở hữu của VEXE24H.</li>
              </ul>
            </section>

            {/* 4. Trách nhiệm giới hạn */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Trách nhiệm giới hạn</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                VEXE24H không chịu trách nhiệm đối với:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Bất kỳ thiệt hại, mất mát hoặc sai sót phát sinh do lỗi của nhà xe hoặc người dùng.</li>
                <li>Các sự cố kỹ thuật, lỗi hệ thống hoặc gián đoạn mạng Internet ngoài khả năng kiểm soát.</li>
              </ul>
            </section>

            {/* 5. Bảo mật thông tin */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Bảo mật thông tin</h2>
              <p className="text-gray-700 leading-relaxed">
                Mọi thông tin cá nhân của khách hàng sẽ được bảo mật theo Chính sách bảo mật của VEXE24H và quy định của pháp luật Việt Nam. Chúng tôi cam kết không chia sẻ thông tin cho bên thứ ba ngoài mục đích cung cấp dịch vụ.
              </p>
            </section>

            {/* 6. Thay đổi điều khoản */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Thay đổi điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                VEXE24H có quyền điều chỉnh hoặc cập nhật Điều khoản sử dụng mà không cần thông báo trước. Phiên bản mới nhất sẽ được công bố trực tiếp trên website và có hiệu lực ngay khi đăng tải.
              </p>
            </section>

            {/* 7. Liên hệ */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Liên hệ</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Nếu Quý khách có thắc mắc hoặc khiếu nại liên quan đến Điều khoản sử dụng, vui lòng liên hệ:
              </p>
              
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-futa-red flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Hotline:</p>
                    <a href="tel:0703948071" className="font-medium text-gray-900 hover:text-futa-red">
                      0703948071
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-futa-red flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <a href="mailto:vexe24h@gmail.com" className="font-medium text-gray-900 hover:text-futa-red">
                      vexe24h@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-futa-red flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Địa chỉ:</p>
                    <p className="font-medium text-gray-900">
                      458 Huỳnh Tấn Phát, phường Bình Thuận, HCM
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer note */}
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500 italic">
                Điều khoản sử dụng này có hiệu lực từ ngày 01/01/2025
              </p>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
