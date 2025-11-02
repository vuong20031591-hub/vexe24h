import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Feedback {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  route: string;
  date: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+An&background=d5181d&color=fff",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    comment:
      "Dịch vụ tuyệt vời! Đặt vé nhanh chóng, xe đúng giờ, tài xế thân thiện. Tôi rất hài lòng với trải nghiệm này và sẽ tiếp tục sử dụng dịch vụ.",
    route: "Sài Gòn - Đà Lạt",
    date: "15/10/2025",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    avatar: "https://ui-avatars.com/api/?name=Tran+Thi+Binh&background=d5181d&color=fff",
    location: "Hà Nội",
    rating: 5,
    comment:
      "Website đặt vé rất dễ sử dụng, thanh toán an toàn. Xe limousine sang trọng, ghế ngồi thoải mái. Chuyến đi Hà Nội - Đà Nẵng của tôi thật tuyệt vời!",
    route: "Hà Nội - Đà Nẵng",
    date: "20/10/2025",
  },
  {
    id: 3,
    name: "Lê Minh Công",
    avatar: "https://ui-avatars.com/api/?name=Le+Minh+Cong&background=d5181d&color=fff",
    location: "Đà Nẵng",
    rating: 5,
    comment:
      "Hệ thống đặt vé rất chuyên nghiệp. Nhân viên hỗ trợ nhiệt tình, giải đáp mọi thắc mắc nhanh chóng. Giá cả hợp lý, chất lượng dịch vụ tốt.",
    route: "Đà Nẵng - Nha Trang",
    date: "25/10/2025",
  },
  {
    id: 4,
    name: "Phạm Thu Hương",
    avatar: "https://ui-avatars.com/api/?name=Pham+Thu+Huong&background=d5181d&color=fff",
    location: "Cần Thơ",
    rating: 5,
    comment:
      "Tôi đã sử dụng nhiều dịch vụ đặt vé khác nhau, nhưng dịch vụ này là tốt nhất. Xe sạch sẽ, đúng giờ, giá cả minh bạch. Rất đáng tin cậy!",
    route: "Cần Thơ - Sài Gòn",
    date: "28/10/2025",
  },
  {
    id: 5,
    name: "Hoàng Văn Đức",
    avatar: "https://ui-avatars.com/api/?name=Hoang+Van+Duc&background=d5181d&color=fff",
    location: "Huế",
    rating: 5,
    comment:
      "Ứng dụng dễ sử dụng, có thể đặt vé mọi lúc mọi nơi. Quy trình thanh toán đơn giản, nhiều phương thức lựa chọn. Tôi sẽ giới thiệu cho bạn bè!",
    route: "Huế - Đà Lạt",
    date: "01/11/2025",
  },
  {
    id: 6,
    name: "Võ Thị Lan",
    avatar: "https://ui-avatars.com/api/?name=Vo+Thi+Lan&background=d5181d&color=fff",
    location: "Vũng Tàu",
    rating: 5,
    comment:
      "Chuyến đi thật tuyệt vời! Xe mới, tiện nghi đầy đủ, có WiFi và sạc điện thoại. Tài xế lái xe êm ái, an toàn. Tôi rất ấn tượng!",
    route: "Sài Gòn - Vũng Tàu",
    date: "02/11/2025",
  },
];

export function CustomerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const currentFeedbacks = feedbacks.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section
      className="bg-white py-16 sm:py-20"
      data-testid="section-customer-feedback"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Hàng triệu hành khách đã tin tưởng và lựa chọn dịch vụ của chúng tôi. 
            Đọc những đánh giá chân thực từ khách hàng.
          </p>
        </div>

        {/* Feedback Cards */}
        <div className="relative">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
                data-testid={`feedback-card-${feedback.id}`}
              >
                {/* Quote Icon */}
                <div className="mb-4 flex justify-between items-start">
                  <Quote className="h-8 w-8 text-futa-red/20" />
                  <div className="flex">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="mb-6 text-gray-700 leading-relaxed line-clamp-4">
                  "{feedback.comment}"
                </p>

                {/* Route & Date */}
                <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-futa-red">{feedback.route}</span>
                    {" • "}
                    <span className="text-gray-500">{feedback.date}</span>
                  </p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{feedback.name}</p>
                    <p className="text-sm text-gray-500">{feedback.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-300 hover:bg-futa-red hover:text-white"
              data-testid="feedback-prev-button"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-futa-red"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  data-testid={`feedback-dot-${index}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-300 hover:bg-futa-red hover:text-white"
              data-testid="feedback-next-button"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Bạn đã sử dụng dịch vụ của chúng tôi?{" "}
            <a
              href="#contact"
              className="font-semibold text-futa-red hover:underline"
            >
              Chia sẻ trải nghiệm của bạn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
