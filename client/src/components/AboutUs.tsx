import { useState, useEffect } from "react";
import { Target, Award, Shield, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const introContent = [
  "Vé Xe 24H là nền tảng đặt vé xe trực tuyến ra đời với mong muốn mang lại cho người dùng một cách di chuyển chủ động, nhanh gọn và an toàn hơn bao giờ hết. Chúng tôi hiểu rằng, trong nhịp sống hiện đại, mỗi chuyến đi không chỉ là hành trình di chuyển mà còn là sự khởi đầu cho những kế hoạch, những cuộc gặp gỡ và những trải nghiệm mới.",
  "Với tinh thần phục vụ tận tâm và định hướng lấy người dùng làm trung tâm, Vé Xe 24H không ngừng cải tiến công nghệ, đơn giản hóa quy trình đặt vé, và tối ưu trải nghiệm trên mọi nền tảng. Chỉ với vài thao tác đơn giản, người dùng có thể dễ dàng lựa chọn chuyến đi phù hợp, kiểm tra thông tin minh bạch và hoàn tất giao dịch một cách nhanh chóng, an toàn.",
  "Chúng tôi tin rằng, một chuyến đi suôn sẻ bắt đầu từ sự an tâm khi đặt vé. Vì vậy, Vé Xe 24H luôn cam kết mang đến dịch vụ chuẩn xác, tiện lợi và minh bạch, giúp khách hàng hoàn toàn yên tâm trên mọi hành trình – từ lúc khởi hành cho đến khi về đến nơi.",
];

const features = [
  {
    icon: Target,
    title: "Sứ mệnh",
    description:
      "Cung cấp dịch vụ vận chuyển hành khách chất lượng cao, an toàn và tiện lợi, đáp ứng nhu cầu di chuyển của hàng triệu người dân Việt Nam.",
  },
  {
    icon: Award,
    title: "Tầm nhìn",
    description:
      "Phấn đấu trở thành nền tảng đặt vé xe trực tuyến hàng đầu Việt Nam, nơi hành khách có thể yên tâm lựa chọn mọi tuyến đường với trải nghiệm đặt vé nhanh, minh bạch và hiệu quả. Vé Xe 24H hướng tới xây dựng hệ sinh thái vận tải thông minh, góp phần nâng cao chất lượng dịch vụ hành khách trong thời đại số.",
  },
  {
    icon: Shield,
    title: "Cam kết",
    description:
      "Luôn đặt an toàn, uy tín và sự hài lòng của khách hàng lên hàng đầu. Vé Xe 24H cam kết đồng hành cùng hành khách trên mọi hành trình, đảm bảo quy trình đặt vé minh bạch, thông tin chính xác, hỗ trợ tận tâm và dịch vụ đáng tin cậy từ khi khởi hành đến khi về đến nơi.",
  },
];

const coreValues = [
  {
    title: "Khách hàng là trọng tâm",
    description: "Mọi cải tiến đều bắt đầu từ nhu cầu và sự hài lòng của hành khách.",
  },
  {
    title: "An toàn – Chính xác",
    description: "Cam kết chỉ hợp tác với các đơn vị vận tải đạt chuẩn, thông tin minh bạch, đặt vé nhanh và đúng chuyến.",
  },
  {
    title: "Đổi mới – Hiệu quả",
    description: "Ứng dụng công nghệ để tối ưu trải nghiệm người dùng, đơn giản hóa quy trình và nâng cao chất lượng dịch vụ mỗi ngày.",
  },
];

export function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % introContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + introContent.length) % introContent.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % introContent.length);
  };

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20"
      data-testid="section-about-us"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Về Chúng Tôi
          </h2>
          
          {/* Introduction Content with Image */}
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Text Content - Carousel */}
              <div className="relative">
                <div className="text-base text-gray-700 leading-relaxed sm:text-lg">
                  <p className="rounded-xl bg-white p-8 shadow-sm border-l-4 border-futa-red min-h-[280px] flex items-center">
                    {introContent[currentIndex]}
                  </p>
                </div>

                {/* Navigation Controls */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-futa-red hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {introContent.map((_, index) => (
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
                      />
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 hover:bg-futa-red hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src="/generated_images/about.png"
                    alt="Về Vé Xe 24H"
                    className="rounded-2xl shadow-xl w-full max-w-lg"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-futa-red/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                data-testid={`about-feature-${index + 1}`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 transition-colors group-hover:bg-futa-red">
                  <Icon className="h-7 w-7 text-futa-red transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Giá trị cốt lõi
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl bg-white p-6 shadow-md"
                data-testid={`core-value-${index + 1}`}
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-futa-red" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">{value.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Story */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Câu chuyện của chúng tôi
              </h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Bắt đầu từ một dịch vụ nhỏ với mục tiêu đơn giản: giúp người dân có thể đặt vé xe bus 
                một cách dễ dàng và thuận tiện hơn. Ngày nay, chúng tôi đã phục vụ hàng triệu hành khách 
                trên khắp Việt Nam.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Với đội ngũ hơn 500 nhân viên tận tâm và mạng lưới hơn 450 phòng vé trên toàn quốc, 
                chúng tôi cam kết mang đến cho bạn những chuyến đi an toàn, thoải mái và đáng nhớ.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-6 text-center shadow-md">
                  <p className="text-3xl font-bold text-futa-red">10+</p>
                  <p className="mt-2 text-sm text-gray-600">Năm kinh nghiệm</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-md">
                  <p className="text-3xl font-bold text-futa-red">63</p>
                  <p className="mt-2 text-sm text-gray-600">Tỉnh thành</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-md">
                  <p className="text-3xl font-bold text-futa-red">24/7</p>
                  <p className="mt-2 text-sm text-gray-600">Hỗ trợ khách hàng</p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-md">
                  <p className="text-3xl font-bold text-futa-red">100%</p>
                  <p className="mt-2 text-sm text-gray-600">Cam kết hoàn tiền</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
