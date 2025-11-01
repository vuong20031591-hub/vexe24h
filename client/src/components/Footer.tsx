import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { SiTiktok, SiZalo } from "react-icons/si";

export function Footer() {
  const footerLinks = {
    about: [
      { label: "Giới thiệu", href: "#about" },
      { label: "Lịch sử phát triển", href: "#history" },
      { label: "Đội ngũ", href: "#team" },
      { label: "Tuyển dụng", href: "#careers" },
    ],
    policy: [
      { label: "Điều khoản sử dụng", href: "#terms" },
      { label: "Chính sách bảo mật", href: "#privacy" },
      { label: "Chính sách hoàn vé", href: "#refund" },
      { label: "Quy chế hoạt động", href: "#regulations" },
    ],
    support: [
      { label: "Hướng dẫn đặt vé", href: "#guide" },
      { label: "Câu hỏi thường gặp", href: "#faq" },
      { label: "Phương thức thanh toán", href: "#payment" },
      { label: "Hỗ trợ khách hàng", href: "#support" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", testId: "link-facebook" },
    { icon: SiZalo, href: "#", label: "Zalo", testId: "link-zalo" },
    { icon: SiTiktok, href: "#", label: "TikTok", testId: "link-tiktok" },
    { icon: Youtube, href: "#", label: "YouTube", testId: "link-youtube" },
  ];

  return (
    <footer className="bg-gray-900 text-white" id="contact" data-testid="footer">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <a href="/" className="flex items-center gap-3" data-testid="link-logo">
                <img
                  src="/favicon.png"
                  alt="DatVe360"
                  className="h-28 w-28"
                />
              </a>
            </div>
            <p className="mb-6 text-sm text-gray-400">
              Hệ thống đặt vé xe bus chuyên nghiệp, nhanh chóng và tiện lợi.
              Phục vụ hơn 10 triệu hành khách trên toàn quốc.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, testId }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-futa-red"
                  aria-label={label}
                  data-testid={testId}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Về chúng tôi</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Chính sách & điều khoản</h3>
            <ul className="space-y-3">
              {footerLinks.policy.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-futa-red" />
                <div>
                  <p className="text-sm font-medium">Hotline</p>
                  <a
                    href="tel:0901234567"
                    className="text-sm text-gray-400 hover:text-white"
                    data-testid="link-footer-hotline"
                  >
                    090.123.4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-futa-red" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:support@datve360.vn"
                    className="text-sm text-gray-400 hover:text-white"
                    data-testid="link-footer-email"
                  >
                    support@datve360.vn
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-futa-red" />
                <div>
                  <p className="text-sm font-medium">Văn phòng</p>
                  <p className="text-sm text-gray-400">
                    123 Đường ABC, Quận 1, Hồ Chí Minh
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 DatVe360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
