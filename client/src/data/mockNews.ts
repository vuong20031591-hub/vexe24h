import type { News } from "@/types";

function generateId(): string {
  return crypto.randomUUID();
}

const newsId1 = generateId();
const newsId2 = generateId();
const newsId3 = generateId();

export const mockNews: News[] = [
  {
    id: newsId1,
    title: "Mở tuyến mới Hồ Chí Minh - Phan Thiết",
    description:
      "Vé xe 24h khai trương tuyến Hồ Chí Minh - Phan Thiết phục vụ du lịch biển. Chuyến xe chất lượng cao với ghế massage và WiFi miễn phí.",
    date: "2025-10-28",
    image: "/generated_images/New_route_announcement_980be27a.png",
    link: "https://futabus.vn/tin-tuc",
    content: `
      <h2>Mở tuyến mới Hồ Chí Minh - Phan Thiết</h2>
      <p>Vé xe 24h vui mừng thông báo khai trương tuyến xe mới Hồ Chí Minh - Phan Thiết, phục vụ nhu cầu du lịch biển của quý khách.</p>

      <h3>Thông tin tuyến xe:</h3>
      <ul>
        <li><strong>Lộ trình:</strong> Hồ Chí Minh - Phan Thiết</li>
        <li><strong>Thời gian:</strong> 4 giờ</li>
        <li><strong>Giá vé:</strong> Từ 180.000đ</li>
        <li><strong>Loại xe:</strong> Giường nằm cao cấp</li>
      </ul>

      <h3>Tiện ích trên xe:</h3>
      <ul>
        <li>Ghế massage thư giãn</li>
        <li>WiFi miễn phí tốc độ cao</li>
        <li>Nước uống và khăn lạnh</li>
        <li>Màn hình giải trí cá nhân</li>
        <li>Điều hòa 2 chiều</li>
      </ul>

      <p>Đặt vé ngay hôm nay để nhận ưu đãi giảm 20% cho 100 vé đầu tiên!</p>
    `,
  },
  {
    id: newsId2,
    title: "Khuyến mãi tháng 11",
    description:
      "Giảm 10% cho tất cả tuyến từ Hồ Chí Minh trong tháng 11. Áp dụng cho cả vé một chiều và khứ hồi. Đặt ngay để nhận ưu đãi.",
    date: "2025-10-30",
    image: "/generated_images/Promotion_banner_discount_5ad575d9.png",
    link: "https://futabus.vn/khuyen-mai",
    content: `
      <h2>Khuyến mãi tháng 11 - Giảm 10% tất cả tuyến từ Hồ Chí Minh</h2>
      <p>Chào mừng tháng 11, Vé xe 24h tri ân khách hàng với chương trình giảm giá đặc biệt.</p>

      <h3>Chi tiết chương trình:</h3>
      <ul>
        <li><strong>Thời gian:</strong> 01/11/2025 - 30/11/2025</li>
        <li><strong>Ưu đãi:</strong> Giảm 10% giá vé</li>
        <li><strong>Áp dụng:</strong> Tất cả tuyến từ Hồ Chí Minh</li>
        <li><strong>Loại vé:</strong> Một chiều và khứ hồi</li>
      </ul>

      <h3>Cách thức áp dụng:</h3>
      <ol>
        <li>Đặt vé trực tuyến tại website Vé xe 24h.vn</li>
        <li>Nhập mã <strong>THANG11</strong> khi thanh toán</li>
        <li>Nhận ngay ưu đãi giảm 10%</li>
      </ol>

      <p>Đừng bỏ lỡ cơ hội tiết kiệm chi phí di chuyển trong tháng này!</p>
    `,
  },
  {
    id: newsId3,
    title: "Ứng dụng Vé xe 24h",
    description:
      "Trải nghiệm đặt vé nhanh chóng, tiện lợi trên ứng dụng Vé xe 24h. Tải app ngay để nhận voucher 50.000đ cho lần đặt đầu tiên.",
    date: "2025-10-20",
    image: "/generated_images/Mobile_app_showcase_8eb0f977.png",
    link: "https://futabus.vn/ung-dung",
    content: `
      <h2>Ra mắt ứng dụng Vé xe 24h - Đặt vé xe bus thông minh</h2>
      <p>Vé xe 24h chính thức ra mắt ứng dụng di động, mang đến trải nghiệm đặt vé nhanh chóng và tiện lợi hơn bao giờ hết.</p>

      <h3>Tính năng nổi bật:</h3>
      <ul>
        <li>Tìm kiếm và đặt vé chỉ trong 30 giây</li>
        <li>Thanh toán đa dạng: ATM, Momo, ZaloPay, VNPAY</li>
        <li>Quản lý vé điện tử tiện lợi</li>
        <li>Nhận thông báo chuyến xe real-time</li>
        <li>Tích điểm đổi quà hấp dẫn</li>
      </ul>

      <h3>Ưu đãi đặc biệt:</h3>
      <p>Tải app ngay hôm nay để nhận:</p>
      <ul>
        <li>Voucher 50.000đ cho lần đặt vé đầu tiên</li>
        <li>Giảm 5% cho 3 chuyến tiếp theo</li>
        <li>Tích điểm gấp đôi trong tháng đầu</li>
      </ul>

      <p><strong>Tải ngay:</strong></p>
      <ul>
        <li>iOS: App Store</li>
        <li>Android: Google Play</li>
      </ul>
    `,
  },
];



