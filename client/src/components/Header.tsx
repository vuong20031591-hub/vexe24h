import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Tuyến đường", href: "#routes" },
    { label: "Ưu đãi", href: "#promotions" },
    { label: "Tin tức", href: "#news" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
      data-testid="header-navigation"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-futa-red">
              <span className="text-xl font-bold text-white">D</span>
            </div>
            <span className="hidden text-xl font-bold text-gray-900 sm:block">
              DatVe360
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-futa-red"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-futa-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:0901234567"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-futa-red"
              data-testid="link-hotline"
            >
              <Phone className="h-4 w-4" />
              <span>090.123.4567</span>
            </a>
            <Button variant="outline" size="sm" data-testid="button-login">
              Đăng nhập
            </Button>
            <Button
              size="sm"
              className="bg-futa-red hover:bg-futa-red/90"
              data-testid="button-book-now"
            >
              Đặt vé ngay
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu-toggle">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 py-6">
                <nav className="flex flex-col gap-2">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-futa-red"
                      data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 border-t pt-6">
                  <a
                    href="tel:0901234567"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    data-testid="link-mobile-hotline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>090.123.4567</span>
                  </a>
                  <Button variant="outline" className="w-full" data-testid="button-mobile-login">
                    Đăng nhập
                  </Button>
                  <Button
                    className="w-full bg-futa-red hover:bg-futa-red/90"
                    data-testid="button-mobile-book-now"
                  >
                    Đặt vé ngay
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
