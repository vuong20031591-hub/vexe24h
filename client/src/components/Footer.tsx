import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { SiTiktok, SiZalo, SiAppstore, SiGoogleplay } from "react-icons/si";

export function Footer() {
  const footerLinks = {
    about: [
      { label: "Giới thiệu", href: "/#about" },
      { label: "Lịch sử phát triển", href: "/#history" },
      { label: "Đội ngũ", href: "/#team" },
      { label: "Tuyển dụng", href: "/#careers" },
    ],
    support: [
      { label: "Điều khoản sử dụng", href: "/terms" },
      { label: "Chính sách hoàn vé", href: "/refund" },
      { label: "Tra cứu thông tin đặt vé", href: "/lookup" },
      { label: "Câu hỏi thường gặp", href: "/#faq" },
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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-start gap-3">
              <a href="/" className="flex-shrink-0 -mt-12" data-testid="link-logo">
                <img
                  src="/favicon.png"
                  alt="Vé xe 24h"
                  className="h-28 w-28"
                />
              </a>
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">Vé xe 24h</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-futa-red" />
                    <span className="text-base font-medium text-white">
                      458 Huỳnh Tấn Phát, phường Bình Thuận, HCM
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0 text-futa-red" />
                    <a
                      href="mailto:vexe24h@gmail.com"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      vexe24h@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0 text-futa-red" />
                    <a
                      href="tel:0703948071"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      070.394.8071
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, testId }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-futa-red to-red-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-futa-red/50"
                  aria-label={label}
                  data-testid={testId}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* App Download Badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg bg-gradient-to-br from-futa-red to-red-700 px-5 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-futa-red/50"
                data-testid="link-appstore-badge"
              >
                <SiAppstore className="h-8 w-8 text-white" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-white/80">Download on the</div>
                  <div className="text-lg font-semibold leading-tight text-white">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg bg-gradient-to-br from-futa-red to-red-700 px-5 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-futa-red/50"
                data-testid="link-googleplay-badge"
              >
                <SiGoogleplay className="h-8 w-8 text-white" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-white/80">GET IT ON</div>
                  <div className="text-lg font-semibold leading-tight text-white">Google Play</div>
                </div>
              </a>
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

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Chính sách & Hỗ trợ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Vé xe 24h. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
