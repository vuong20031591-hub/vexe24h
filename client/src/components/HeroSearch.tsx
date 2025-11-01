import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bus, ArrowLeftRight, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function HeroSearch() {
  const [, setLocation] = useLocation();
  const [tripType, setTripType] = useState("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  const cities = [
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Đà Lạt",
    "Nha Trang",
    "Cần Thơ",
    "Vũng Tàu",
    "Phú Quốc",
    "Sapa",
    "Huế",
  ];

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;

    const params = new URLSearchParams({
      from: origin,
      to: destination,
      date: departureDate,
      tripType: tripType,
    });

    // Add return date if round trip
    if (tripType === "round-trip" && returnDate) {
      params.append("returnDate", returnDate);
    }

    setLocation(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden" data-testid="section-hero">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/generated_images/Hero_background_bus_highway_f1a8a3d9.png)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Đặt vé xe bus trực tuyến
            </h1>
            <p className="text-lg text-white/90 sm:text-xl">
              Nhanh chóng, tiện lợi, an toàn
            </p>
          </div>

          {/* Search Card */}
          <form onSubmit={handleSearch} className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            {/* Trip Type */}
            <div className="mb-6 flex items-center justify-between">
              <RadioGroup
                value={tripType}
                onValueChange={setTripType}
                className="flex gap-6"
                data-testid="radio-trip-type"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" data-testid="radio-one-way" />
                  <Label 
                    htmlFor="one-way" 
                    className={`cursor-pointer font-medium transition-colors ${
                      tripType === "one-way" ? "text-futa-red" : "text-gray-700"
                    }`}
                  >
                    Một chiều
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" data-testid="radio-round-trip" />
                  <Label 
                    htmlFor="round-trip" 
                    className={`cursor-pointer font-medium transition-colors ${
                      tripType === "round-trip" ? "text-futa-red" : "text-gray-700"
                    }`}
                  >
                    Khứ hồi
                  </Label>
                </div>
              </RadioGroup>
              <a
                href="#guide"
                className="text-sm text-gray-600 underline-offset-4 hover:text-futa-red hover:underline"
                data-testid="link-booking-guide"
              >
                Hướng dẫn mua vé
              </a>
            </div>

            {/* Search Form */}
            <div className={`grid gap-4 md:gap-3 ${tripType === "round-trip" ? "md:grid-cols-6" : "md:grid-cols-5"}`}>
              {/* Origin */}
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-sm font-medium">
                  Điểm đi
                </Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger
                    id="origin"
                    className="h-12"
                    data-testid="select-origin"
                  >
                    <SelectValue placeholder="Chọn điểm đi" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center md:pb-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSwap}
                  className="h-10 w-10 rounded-full hover:bg-gray-100"
                  data-testid="button-swap-locations"
                >
                  <ArrowLeftRight
                    className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                      isSwapping ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-medium">
                  Điểm đến
                </Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger
                    id="destination"
                    className="h-12"
                    data-testid="select-destination"
                  >
                    <SelectValue placeholder="Chọn điểm đến" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  Ngày đi
                </Label>
                <input
                  type="date"
                  id="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="input-date"
                />
              </div>

              {/* Return Date - Only show for round trip */}
              {tripType === "round-trip" && (
                <div className="space-y-2">
                  <Label htmlFor="return-date" className="text-sm font-medium">
                    Ngày về
                  </Label>
                  <input
                    type="date"
                    id="return-date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || new Date().toISOString().split("T")[0]}
                    className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="input-return-date"
                  />
                </div>
              )}

              {/* Ticket Count */}
              <div className="space-y-2">
                <Label htmlFor="tickets" className="text-sm font-medium">
                  Số vé
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger
                    id="tickets"
                    className="h-12"
                    data-testid="select-ticket-count"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} vé
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              className="mt-6 h-12 w-full bg-futa-red text-base font-semibold hover:bg-futa-red/90"
              data-testid="button-search-trips"
            >
              <Bus className="mr-2 h-5 w-5" />
              TÌM CHUYẾN XE
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
