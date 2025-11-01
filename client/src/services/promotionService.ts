import type { Promotion, PromotionDetail } from "@/types";
import { mockPromotions, mockPromotionDetails } from "@/data";

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const promotionService = {
  /**
   * Lấy tất cả khuyến mãi
   */
  async getAllPromotions(): Promise<Promotion[]> {
    await delay(300);
    return [...mockPromotions];
  },

  /**
   * Lấy chi tiết khuyến mãi theo ID
   */
  async getPromotionById(id: string): Promise<PromotionDetail | null> {
    await delay(200);
    const promotion = mockPromotionDetails.find(p => p.id === id);
    return promotion || null;
  },

  /**
   * Validate mã giảm giá
   */
  async validatePromoCode(code: string): Promise<{
    valid: boolean;
    promotion?: PromotionDetail;
    message: string;
  }> {
    await delay(400);
    
    const promotion = mockPromotionDetails.find(
      p => p.code.toLowerCase() === code.toLowerCase()
    );

    if (!promotion) {
      return {
        valid: false,
        message: "Mã giảm giá không tồn tại",
      };
    }

    // Kiểm tra thời hạn
    const now = new Date();
    const validFrom = new Date(promotion.validFrom);
    const validTo = new Date(promotion.validTo);

    if (now < validFrom) {
      return {
        valid: false,
        message: "Mã giảm giá chưa có hiệu lực",
      };
    }

    if (now > validTo) {
      return {
        valid: false,
        message: "Mã giảm giá đã hết hạn",
      };
    }

    return {
      valid: true,
      promotion,
      message: "Mã giảm giá hợp lệ",
    };
  },

  /**
   * Tính toán số tiền giảm giá
   */
  calculateDiscount(
    totalAmount: number,
    promotion: PromotionDetail
  ): number {
    if (totalAmount < promotion.minOrderValue) {
      return 0;
    }

    if (promotion.discountType === "percentage") {
      const discount = (totalAmount * promotion.discountValue) / 100;
      // Giới hạn giảm tối đa nếu cần
      return Math.min(discount, 200000); // Max 200k
    } else {
      return promotion.discountValue;
    }
  },
};

