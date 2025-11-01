# Design Guidelines: Professional Bus Ticket Booking Website

## Design Approach
**Reference-Based Design** inspired by FutaBus.vn - a polished, business-oriented transportation booking platform with emphasis on user-friendly search functionality and visual clarity.

## Color Palette (FUTA-Inspired)
- **Primary Red:** #E31E25 (brand color, CTAs, accents)
- **Accent Green:** #10B981 (success states, highlights)
- **Text Dark:** #111827 (primary content)
- **Background:** #F9FAFB (page background)
- **White:** #FFFFFF (cards, overlays)

## Typography
- **Primary Font:** Inter or SF Pro
- **Hierarchy:**
  - Hero Title: 3xl-5xl, font-bold
  - Section Titles: 2xl-3xl, font-semibold
  - Card Titles: lg-xl, font-medium
  - Body Text: base, font-normal
  - Small Text/Labels: sm-xs, font-normal

## Layout System
**Tailwind Spacing:** Primary units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Container: max-w-7xl with px-4 to px-8

## Page Structure (7 Core Sections)

### 1. Header (Sticky Navigation)
- **Layout:** Horizontal flex, justify-between, sticky top-0, backdrop-blur
- **Left:** Logo (h-10 to h-12)
- **Center:** Navigation menu (Trang chủ, Tuyến đường, Ưu đãi, Tin tức, Liên hệ) with underline animation on hover
- **Right:** Phone icon + Hotline number, "Tải App"/"Đăng nhập" button (outline variant), "Đặt vé ngay" button (primary red, rounded-lg)
- **Mobile:** Hamburger menu opening drawer/sheet

### 2. Hero Section (Search Form Focus)
- **Height:** min-h-[80vh]
- **Background:** Full-width hero image with 50% dark gradient overlay
- **Content:** Centered card (bg-white/95, rounded-2xl, shadow-2xl, max-w-5xl)
- **Form Layout (Desktop):** 5-column horizontal grid
  1. Origin selection (placeholder: "Chọn điểm đi")
  2. Swap icon 🔁 (animated 180° rotation on click)
  3. Destination selection (placeholder: "Chọn điểm đến")
  4. Date picker (displays: "Thứ Năm, 01/11/2025")
  5. Ticket count dropdown (1-10)
- **Trip Type:** Radio buttons above form (Một chiều / Khứ hồi)
- **CTA Button:** "TÌM CHUYẾN XE" full-width below inputs, bg-primary red with bus icon
- **Mobile:** Stack vertically, full-width inputs

### 3. Promotional Carousel
- **Layout:** Auto-scrolling horizontal slider, py-16 section
- **Cards:** Banner style with image background, title (xl font-bold), description (sm), rounded-xl
- **Interaction:** Auto-play 4s interval, pause on hover
- **Navigation:** Arrow buttons + dot indicators
- **Examples:** "Giảm 10% vé khứ hồi", "Khuyến mãi tháng 11"

### 4. Popular Routes Grid
- **Section Title:** "Tuyến xe phổ biến" (2xl font-semibold)
- **Layout:** 3-4 column grid (responsive to 1 column mobile)
- **Card Design:**
  - Light background image of destination
  - Bus icon (small, top-left)
  - Route text: "Hồ Chí Minh → Đà Lạt" (lg font-medium)
  - Price: "Từ 350.000đ" (xl font-bold, primary color)
  - "Đặt vé ngay" button (full-width, primary red)
- **Hover:** Elevated shadow, subtle scale (1.02)

### 5. Statistics Section
- **Background:** Light green tint (bg-[#10B981]/10)
- **Layout:** 3-column centered grid
- **Content Blocks:**
  - 🧍‍♂️ "10 Triệu+" passengers (4xl font-bold)
  - 🏢 "450+" ticket offices
  - 🚌 "1,500+/ngày" daily trips
- **Animation:** CountUp number animation on scroll into view
- **Mobile:** Stack to single column

### 6. News Section
- **Section Title:** "Tin tức & thông tin mới nhất" (2xl)
- **Layout:** 3-column grid (responsive)
- **Card Structure:**
  - 16:9 aspect ratio image
  - Date badge (small, gray text)
  - Title (lg font-semibold)
  - Description snippet (2-3 lines, text-muted)
  - "Xem thêm →" link
- **Hover:** Image zoom (scale 1.05), card shadow increase

### 7. Footer
- **Layout:** 4-column grid + bottom row
- **Columns:**
  1. Logo + company tagline
  2. "Về chúng tôi" links
  3. "Chính sách & điều khoản"
  4. "Liên hệ" (Hotline, Email, Address)
- **Social Icons:** Facebook, Zalo, TikTok, YouTube (row of circles)
- **Copyright:** "© 2025 DatVe360. All rights reserved." (centered, small text)
- **Background:** Dark gray (bg-gray-900, text-white)

## Animations & Interactions
- **Smooth Scroll:** All page navigation
- **Swap Icon:** 180° rotation transform with 0.3s ease
- **Card Hovers:** Shadow elevation + scale(1.02-1.05)
- **CountUp:** Number animation in statistics
- **Carousel:** Fade/slide transitions
- **Header:** Blur background on scroll past hero
- **Button States:** Brightness increase on hover, slight scale on active

## Responsive Breakpoints
- **Mobile (< 768px):** Single column, stacked layout, hamburger menu
- **Tablet (768px - 1024px):** 2-column grids
- **Desktop (> 1024px):** Full multi-column layouts

## Images Required
1. **Hero Background:** Wide landscape of bus on highway or scenic road (1920x1080+), professional quality
2. **Promotional Banners:** 3-4 marketing images (discount offers, seasonal campaigns) - 800x400 aspect
3. **Route Destinations:** Images of popular cities/landmarks (Đà Lạt, Nha Trang, Sapa scenery) - 600x400
4. **News Thumbnails:** 3 article images (new routes, promotions, app features) - 800x450 16:9 ratio
5. **Company Logo:** Bus company branding mark - transparent PNG

All images should convey professionalism, trust, and travel excitement with vibrant but not oversaturated colors.