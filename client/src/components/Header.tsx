import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X, Phone, User, LogOut, Ticket, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginDialog } from "@/components/LoginDialog";
import { useToast } from "@/hooks/use-toast";

interface CurrentUser {
  email: string;
  fullName: string;
  phone: string;
}

// Flag Icons
const VietnamFlag = () => (
  <svg width="20" height="15" viewBox="0 0 30 20" className="rounded-sm">
    <rect width="30" height="20" fill="#DA251D"/>
    <path d="M15 4L16.545 9.27L22 9.27L17.727 12.455L19.273 17.73L15 14.545L10.727 17.73L12.273 12.455L8 9.27L13.455 9.27L15 4Z" fill="#FFFF00"/>
  </svg>
);

const UKFlag = () => (
  <svg width="20" height="15" viewBox="0 0 60 30" className="rounded-sm">
    <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
    <clipPath id="t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z"/></clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export function Header() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for logged in user on mount
    const checkUser = () => {
      const userJson = localStorage.getItem("currentUser");
      if (userJson) {
        setCurrentUser(JSON.parse(userJson));
      }
    };
    checkUser();

    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleNavClick = (href: string) => {
    if (href === "#") {
      setLocation("/");
    } else if (href === "/news") {
      setLocation("/news");
    } else {
      // Scroll to section on home page
      setLocation("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setIsOpen(false);
  };

  const handleLoginSuccess = () => {
    // Refresh user data after login
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsOpen(false);
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  const menuItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Tuyến đường", href: "#routes" },
    { label: "Ưu đãi", href: "#promotions" },
    { label: "Tin tức", href: "/news" },
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
          <button onClick={() => handleNavClick("#")} className="flex items-center gap-3" data-testid="link-logo">
            <img
              src="/favicon.png"
              alt="Vé xe 24h"
              className="h-28 w-28"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="group relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-futa-red"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-futa-red transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <VietnamFlag />
                  <span className="uppercase">VI</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white">
                <DropdownMenuItem className="cursor-pointer text-gray-900 hover:bg-gray-100">
                  <span className="mr-2"><VietnamFlag /></span>
                  <span>Tiếng Việt</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-900 hover:bg-gray-100">
                  <span className="mr-2"><UKFlag /></span>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="tel:0703948071"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-futa-red"
              data-testid="link-hotline"
            >
              <Phone className="h-4 w-4" />
              <span>070.394.8071</span>
            </a>
            
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-testid="button-user-menu"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{currentUser.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-gray-900">{currentUser.fullName}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-900">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{currentUser.phone}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-gray-900 cursor-pointer"
                    onClick={() => setLocation("/my-tickets")}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Vé của tôi</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginDialogOpen(true)}
                data-testid="button-login"
              >
                Đăng nhập
              </Button>
            )}
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
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-futa-red"
                      data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 border-t pt-6">
                  {/* Mobile Language Selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        <VietnamFlag />
                        <span className="uppercase">VI</span>
                        <ChevronDown className="h-3 w-3 ml-auto" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44 bg-white">
                      <DropdownMenuItem className="cursor-pointer text-gray-900 hover:bg-gray-100">
                        <span className="mr-2"><VietnamFlag /></span>
                        <span>Tiếng Việt</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-gray-900 hover:bg-gray-100">
                        <span className="mr-2"><UKFlag /></span>
                        <span>English</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <a
                    href="tel:0901234567"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    data-testid="link-mobile-hotline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>090.123.4567</span>
                  </a>
                  
                  {currentUser ? (
                    <>
                      <div className="rounded-md bg-gray-100 p-3">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          setLocation("/my-tickets");
                          setIsOpen(false);
                        }}
                        data-testid="button-mobile-my-tickets"
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        Vé của tôi
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        data-testid="button-mobile-profile"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Thông tin cá nhân
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={handleLogout}
                        data-testid="button-mobile-logout"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsLoginDialogOpen(true)}
                      data-testid="button-mobile-login"
                    >
                      Đăng nhập
                    </Button>
                  )}
                  
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

      <LoginDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}
