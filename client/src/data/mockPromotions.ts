import type { Promotion, PromotionDetail } from "@/types";

function generateId(): string {
  return crypto.randomUUID();
}

export const mockPromotions: Promotion[] = [
  {
    id: generateId(),
    title: "Giảm 10% vé khứ hồi",
    description: "Áp dụng tuyến Hồ Chí Minh - Đà Lạt",
    image: "/generated_images/Promotion_banner_discount_5ad575d9.png",
  },
  {
    id: generateId(),
    title: "Khuyến mãi tháng 11",
    description: "Giảm 50.000đ cho tất cả tuyến nội địa",
    image: "/generated_images/November_promotion_banner_06751e3f.png",
  },
  {
    id: generateId(),
    title: "Ưu đãi cuối tuần",
    description: "Giảm 15% cho chuyến đi thứ 7 & Chủ nhật",
    image: "/generated_images/Promotion_banner_discount_5ad575d9_15.png",
  },
];

export const mockPromotionDetails: PromotionDetail[] = [
  {
    id: mockPromotions[0].id,
    title: mockPromotions[0].title,
    description: mockPromotions[0].description,
    image: mockPromotions[0].image,
    code: "KHUHOI10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 500000,
    validFrom: "2025-11-01",
    validTo: "2025-11-30",
    usageLimit: 1000,
    content: `
      <h2>Giảm 10% vé khứ hồi</h2>
      <p>Áp dụng cho tuyến Hồ Chí Minh - Đà Lạt</p>
      <h3>Điều kiện:</h3>
      <ul>
        <li>Giá trị đơn hàng tối thiểu: 500.000đ</li>
        <li>Áp dụng cho vé khứ hồi</li>
        <li>Không áp dụng cùng các chương trình khác</li>
      </ul>
    `,
  },
  {
    id: mockPromotions[1].id,
    title: mockPromotions[1].title,
    description: mockPromotions[1].description,
    image: mockPromotions[1].image,
    code: "THANG11",
    discountType: "fixed",
    discountValue: 50000,
    minOrderValue: 200000,
    validFrom: "2025-11-01",
    validTo: "2025-11-30",
    usageLimit: 5000,
    content: `
      <h2>Khuyến mãi tháng 11</h2>
      <p>Giảm 50.000đ cho tất cả tuyến nội địa</p>
      <h3>Điều kiện:</h3>
      <ul>
        <li>Giá trị đơn hàng tối thiểu: 200.000đ</li>
        <li>Áp dụng cho tất cả tuyến xe</li>
        <li>Mỗi khách hàng sử dụng tối đa 3 lần</li>
      </ul>
    `,
  },
  {
    id: mockPromotions[2].id,
    title: mockPromotions[2].title,
    description: mockPromotions[2].description,
    image: mockPromotions[2].image,
    code: "CUOITUAN15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 300000,
    validFrom: "2025-11-01",
    validTo: "2025-12-31",
    usageLimit: 2000,
    content: `
      <h2>Ưu đãi cuối tuần</h2>
      <p>Giảm 15% cho chuyến đi thứ 7 & Chủ nhật</p>
      <h3>Điều kiện:</h3>
      <ul>
        <li>Chỉ áp dụng cho chuyến đi vào thứ 7 và Chủ nhật</li>
        <li>Giá trị đơn hàng tối thiểu: 300.000đ</li>
        <li>Giảm tối đa 100.000đ</li>
      </ul>
    `,
  },
];

