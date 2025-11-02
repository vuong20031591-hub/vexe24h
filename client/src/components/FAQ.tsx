import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Đặt vé",
    question: "Làm thế nào để đặt vé xe bus?",
    answer:
      "Bạn có thể đặt vé dễ dàng bằng cách: 1) Chọn điểm đi và điểm đến, 2) Chọn ngày khởi hành, 3) Chọn chuyến xe phù hợp, 4) Chọn ghế ngồi, 5) Điền thông tin và thanh toán. Vé điện tử sẽ được gửi qua email và SMS ngay lập tức.",
  },
  {
    category: "Đặt vé",
    question: "Tôi có thể đặt vé trước bao lâu?",
    answer:
      "Bạn có thể đặt vé trước tối đa 30 ngày. Chúng tôi khuyến khích đặt vé sớm để có nhiều lựa chọn chỗ ngồi và có thể nhận được các ưu đãi đặt vé sớm.",
  },
  {
    category: "Đặt vé",
    question: "Tôi có thể đặt vé cho người khác không?",
    answer:
      "Có, bạn hoàn toàn có thể đặt vé cho người khác. Khi điền thông tin, hãy nhập tên và số điện thoại của người sẽ sử dụng vé. Vé điện tử sẽ được gửi đến số điện thoại đã đăng ký.",
  },
  {
    category: "Thanh toán",
    question: "Có những phương thức thanh toán nào?",
    answer:
      "Chúng tôi chấp nhận nhiều phương thức thanh toán: Thẻ ATM nội địa, Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), Ví điện tử (MoMo, ZaloPay, VNPay), Chuyển khoản ngân hàng, và Thanh toán tại quầy vé.",
  },
  {
    category: "Thanh toán",
    question: "Thanh toán trực tuyến có an toàn không?",
    answer:
      "Hoàn toàn an toàn. Hệ thống thanh toán của chúng tôi được mã hóa SSL 256-bit và tuân thủ chuẩn bảo mật quốc tế PCI DSS. Thông tin thẻ và giao dịch của bạn được bảo vệ tuyệt đối.",
  },
  {
    category: "Hủy vé & Hoàn tiền",
    question: "Tôi có thể hủy vé đã đặt không?",
    answer:
      "Có, bạn có thể hủy vé trước giờ khởi hành. Phí hủy vé phụ thuộc vào thời gian hủy: Hủy trước 24h: phí 10%, Hủy từ 12-24h: phí 20%, Hủy từ 6-12h: phí 30%, Hủy dưới 6h: phí 50%. Số tiền còn lại sẽ được hoàn về tài khoản trong 5-7 ngày làm việc.",
  },
  {
    category: "Hủy vé & Hoàn tiền",
    question: "Khi nào tôi nhận được tiền hoàn?",
    answer:
      "Sau khi yêu cầu hủy vé được xử lý, tiền sẽ được hoàn về tài khoản/phương thức thanh toán ban đầu trong vòng 5-7 ngày làm việc. Đối với thanh toán bằng thẻ quốc tế, thời gian có thể kéo dài đến 15 ngày tùy thuộc vào ngân hàng.",
  },
  {
    category: "Hủy vé & Hoàn tiền",
    question: "Tôi có thể đổi vé sang chuyến khác không?",
    answer:
      "Có, bạn có thể đổi vé sang chuyến khác cùng tuyến (trước hoặc sau 24h so với chuyến ban đầu) với phí đổi vé 20.000đ. Nếu chuyến mới có giá cao hơn, bạn cần thanh toán thêm phần chênh lệch.",
  },
  {
    category: "Chuyến đi",
    question: "Tôi cần đến bến xe trước giờ khởi hành bao lâu?",
    answer:
      "Chúng tôi khuyến nghị bạn có mặt tại bến xe trước giờ khởi hành ít nhất 15-30 phút để làm thủ tục lên xe và sắp xếp hành lý. Xe sẽ khởi hành đúng giờ và không chờ đợi hành khách đến muộn.",
  },
  {
    category: "Chuyến đi",
    question: "Hành lý được mang theo như thế nào?",
    answer:
      "Mỗi hành khách được mang theo 1 va ly (tối đa 20kg) và 1 túi xách tay miễn phí. Hành lý quá cỡ hoặc quá nặng sẽ tính phí bổ sung. Vật dụng quý như laptop, điện thoại nên mang theo người.",
  },
  {
    category: "Chuyến đi",
    question: "Xe có những tiện ích gì?",
    answer:
      "Tùy loại xe, các tiện ích bao gồm: Ghế ngồi thư giãn/nằm, WiFi miễn phí, Sạc USB, Điều hòa, TV/Giải trí, Nước uống miễn phí, Chăn gối, và Toilet (đối với xe limousine cao cấp).",
  },
  {
    category: "Tài khoản",
    question: "Tôi có cần tạo tài khoản để đặt vé không?",
    answer:
      "Không bắt buộc. Bạn có thể đặt vé với tư cách khách (guest). Tuy nhiên, việc tạo tài khoản giúp bạn quản lý vé dễ dàng hơn, lưu thông tin thanh toán, nhận ưu đãi độc quyền và tích điểm thưởng.",
  },
  {
    category: "Tài khoản",
    question: "Làm thế nào để xem lại vé đã đặt?",
    answer:
      "Nếu bạn có tài khoản, đăng nhập và vào mục 'Vé của tôi'. Nếu đặt vé với tư cách khách, kiểm tra email hoặc SMS đã nhận, hoặc liên hệ hotline 1900-xxxx với mã đặt vé để được hỗ trợ.",
  },
  {
    category: "Hỗ trợ",
    question: "Tôi có thể liên hệ hỗ trợ như thế nào?",
    answer:
      "Bạn có thể liên hệ với chúng tôi qua: Hotline: 1900-xxxx (24/7), Email: support@vexe24h.vn, Chat trực tuyến trên website, hoặc Fanpage Facebook. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.",
  },
  {
    category: "Hỗ trợ",
    question: "Nếu xe bị chậm hoặc hủy chuyến thì sao?",
    answer:
      "Trong trường hợp bất khả kháng khiến xe chậm hoặc hủy chuyến, chúng tôi sẽ thông báo ngay cho bạn qua SMS/email và điện thoại. Bạn có thể chọn: 1) Chuyển sang chuyến khác miễn phí, hoặc 2) Hoàn tiền 100% không mất phí.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20"
      data-testid="section-faq"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-50 p-3">
              <HelpCircle className="h-8 w-8 text-futa-red" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ đặt vé xe bus của chúng tôi
          </p>
        </div>

        {/* FAQ by Categories */}
        <div className="space-y-8">
          {categories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {category}
              </h3>
              <div className="space-y-3">
                {faqData
                  .filter((item) => item.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqData.indexOf(faq);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                        data-testid={`faq-item-${globalIndex}`}
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                          data-testid={`faq-question-${globalIndex}`}
                        >
                          <span className="pr-4 font-semibold text-gray-900">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`transition-all duration-200 ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t border-gray-100 px-6 py-4">
                            <p
                              className="text-gray-700 leading-relaxed"
                              data-testid={`faq-answer-${globalIndex}`}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
