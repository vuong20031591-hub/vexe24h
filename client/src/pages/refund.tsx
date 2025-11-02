import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Phone, Mail, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Chính sách hoàn vé</h1>

        <Card className="p-8">
          <div className="prose prose-gray max-w-none">
            {/* 1. Điều kiện được hoàn vé */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Điều kiện được hoàn vé</h2>
              
              <p className="mb-4 text-gray-700 leading-relaxed">
                Khách hàng có thể yêu cầu hoàn tiền trong các trường hợp:
              </p>
              
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-green-900">Được hoàn tiền:</span>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Hủy vé hợp lệ theo quy định của hệ thống.</li>
                  <li>Nhà xe hủy chuyến, thay đổi thời gian hoặc hoãn chuyến.</li>
                  <li>Giao dịch thanh toán lỗi nhưng bị trừ tiền.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-red-900">Không áp dụng hoàn tiền cho:</span>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Vé đã sử dụng, đã quá giờ khởi hành.</li>
                  <li>Vé thuộc chương trình khuyến mãi hoặc giảm giá đặc biệt.</li>
                </ul>
              </div>
            </section>

            {/* 2. Mức hoàn tiền */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Mức hoàn tiền</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Công thức tính:</p>
                    <p className="text-gray-700">
                      <strong>Tiền hoàn = Giá vé – Phí hủy (nếu có)</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Nhà xe hủy chuyến:</p>
                    <p className="text-gray-700">Hoàn <strong>100%</strong> giá vé</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Lưu ý:</p>
                    <p className="text-gray-700">
                      Phí thanh toán (phí ngân hàng, ví điện tử...) không được hoàn
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Thời gian hoàn tiền */}
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-gray-900">
                <Clock className="h-7 w-7 text-futa-red" />
                3. Thời gian hoàn tiền
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900 mb-2">Thẻ nội địa/ATM, Ví điện tử</p>
                    <p className="text-2xl font-bold text-futa-red">3-5 ngày</p>
                    <p className="text-sm text-gray-600 mt-1">Ngày làm việc</p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900 mb-2">Thẻ quốc tế (Visa/MasterCard)</p>
                    <p className="text-2xl font-bold text-futa-red">5-10 ngày</p>
                    <p className="text-sm text-gray-600 mt-1">Ngày làm việc</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Lưu ý:</strong> Thời gian có thể kéo dài hơn trong dịp cao điểm hoặc khi cần xác minh thêm.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Cách gửi yêu cầu hoàn vé */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                📩 4. Cách gửi yêu cầu hoàn vé
              </h2>
              
              <p className="mb-4 text-gray-700 leading-relaxed">
                Vui lòng liên hệ bộ phận chăm sóc khách hàng qua:
              </p>

              <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-futa-red/5 to-orange-50 p-6 space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-futa-red/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-futa-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hotline:</p>
                    <a href="tel:0703948071" className="text-lg font-semibold text-gray-900 hover:text-futa-red">
                      0703948071
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-futa-red/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-futa-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <a href="mailto:vexe24h@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-futa-red">
                      vexe24h@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-futa-red/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-futa-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Thời gian làm việc:</p>
                    <p className="text-lg font-semibold text-gray-900">24/7</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                <p className="font-semibold text-gray-900 mb-3">Khi gửi yêu cầu, vui lòng cung cấp:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Mã vé / mã giao dịch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Họ tên và số điện thoại đặt vé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Lý do yêu cầu hoàn tiền</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Footer note */}
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500 italic">
                Chính sách hoàn vé này có hiệu lực từ ngày 01/01/2025 và có thể được cập nhật theo từng thời điểm.
              </p>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
