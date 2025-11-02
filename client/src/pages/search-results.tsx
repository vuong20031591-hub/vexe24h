import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchFilters, type SortOption, type BusType, type TimeSlot } from "@/components/SearchFilters";
import { ScheduleDetailDialog } from "@/components/ScheduleDetailDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Bus, Clock, MapPin, Wifi, Tv, Coffee, Snowflake, ArrowRight } from "lucide-react";
import { routeService } from "@/services";
import type { SearchQuery, RouteSchedule } from "@/types";

export default function SearchResults() {
  const [, setLocation] = useLocation();

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [selectedBusTypes, setSelectedBusTypes] = useState<BusType[]>([]);
  const [priceRange, setPriceRange] = useState<[number]>([1000000]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [filterKey, setFilterKey] = useState(0);

  // Dialog state
  const [selectedSchedule, setSelectedSchedule] = useState<RouteSchedule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Get search params from URL
  const params = new URLSearchParams(window.location.search);
  const tripType = (params.get("tripType") || "one-way") as "one-way" | "round-trip";
  const returnDate = params.get("returnDate") || "";
  
  const searchQuery: SearchQuery = {
    from: params.get("from") || "",
    to: params.get("to") || "",
    departureDate: params.get("date") || new Date().toISOString().split("T")[0],
    returnDate: returnDate || undefined,
    tripType: tripType,
    passengers: 1,
  };

  // Query for departure schedules
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", searchQuery.from, searchQuery.to, searchQuery.departureDate],
    queryFn: () => routeService.searchSchedules(searchQuery),
    enabled: !!searchQuery.from && !!searchQuery.to,
  });

  // Query for return schedules (only if round-trip)
  const { data: returnData, isLoading: returnIsLoading, error: returnError } = useQuery({
    queryKey: ["search-return", searchQuery.to, searchQuery.from, returnDate],
    queryFn: () => routeService.searchSchedules({
      from: searchQuery.to,
      to: searchQuery.from,
      departureDate: returnDate,
      tripType: "one-way",
      passengers: 1,
    }),
    enabled: tripType === "round-trip" && !!returnDate && !!searchQuery.from && !!searchQuery.to,
  });

  // Filter and sort departure schedules
  const filteredSchedules = useMemo(() => {
    if (!data?.schedules) return [];

    let filtered = [...data.schedules];

    // Filter by bus type
    if (selectedBusTypes.length > 0) {
      filtered = filtered.filter((s) => selectedBusTypes.includes(s.busType as BusType));
    }

    // Filter by price
    filtered = filtered.filter((s) => s.price <= priceRange[0]);

    // Filter by time slot
    if (selectedTimeSlots.length > 0) {
      filtered = filtered.filter((s) => {
        const hour = parseInt(s.departureTime.split(":")[0]);
        return selectedTimeSlots.some((slot) => {
          if (slot === "morning") return hour >= 6 && hour < 12;
          if (slot === "afternoon") return hour >= 12 && hour < 18;
          if (slot === "evening") return hour >= 18 || hour < 6;
          return false;
        });
      });
    }

    // Sort
    if (sortBy === "time") {
      filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [data?.schedules, selectedBusTypes, priceRange, selectedTimeSlots, sortBy]);

  // Filter and sort return schedules
  const filteredReturnSchedules = useMemo(() => {
    if (!returnData?.schedules) return [];

    let filtered = [...returnData.schedules];

    // Apply same filters as departure
    if (selectedBusTypes.length > 0) {
      filtered = filtered.filter((s) => selectedBusTypes.includes(s.busType as BusType));
    }

    filtered = filtered.filter((s) => s.price <= priceRange[0]);

    if (selectedTimeSlots.length > 0) {
      filtered = filtered.filter((s) => {
        const hour = parseInt(s.departureTime.split(":")[0]);
        return selectedTimeSlots.some((slot) => {
          if (slot === "morning") return hour >= 6 && hour < 12;
          if (slot === "afternoon") return hour >= 12 && hour < 18;
          if (slot === "evening") return hour >= 18 || hour < 6;
          return false;
        });
      });
    }

    // Sort
    if (sortBy === "time") {
      filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [returnData?.schedules, selectedBusTypes, priceRange, selectedTimeSlots, sortBy]);

  const handleClearFilters = () => {
    setSortBy("time");
    setSelectedBusTypes([]);
    setPriceRange([1000000]);
    setSelectedTimeSlots([]);
    setFilterKey(prev => prev + 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "nước suối":
        return <Coffee className="h-4 w-4" />;
      case "điều hòa":
        return <Snowflake className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoading || (tripType === "round-trip" && returnIsLoading)) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-futa-red" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Có lỗi xảy ra</h2>
            <Button
              className="mt-4 bg-futa-red hover:bg-futa-red/90"
              onClick={() => setLocation("/")}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {searchQuery.from}
            </h1>
            <ArrowRight className="h-6 w-6 text-futa-red" />
            <h1 className="text-2xl font-bold">
              {searchQuery.to}
            </h1>
            {tripType === "round-trip" && (
              <>
                <ArrowRight className="h-6 w-6 text-futa-red" />
                <h1 className="text-2xl font-bold">
                  {searchQuery.from}
                </h1>
              </>
            )}
          </div>
          <p className="mt-2 text-gray-600">
            {tripType === "one-way" ? "Một chiều" : "Khứ hồi"} • 
            Ngày đi: {new Date(searchQuery.departureDate).toLocaleDateString("vi-VN")}
            {tripType === "round-trip" && returnDate && (
              <> • Ngày về: {new Date(returnDate).toLocaleDateString("vi-VN")}</>
            )}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              key={filterKey}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedBusTypes={selectedBusTypes}
              setSelectedBusTypes={setSelectedBusTypes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {tripType === "round-trip" ? (
              <Tabs defaultValue="departure" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="departure">
                    Chiều đi ({filteredSchedules.length})
                  </TabsTrigger>
                  <TabsTrigger value="return">
                    Chiều về ({filteredReturnSchedules.length})
                  </TabsTrigger>
                </TabsList>

                {/* Departure Tab */}
                <TabsContent value="departure" className="mt-4">
                  {filteredSchedules.length === 0 ? (
                    <Card className="p-8 text-center">
                      <p className="text-gray-600">Không tìm thấy chuyến xe phù hợp</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleClearFilters}
                      >
                        Xóa bộ lọc
                      </Button>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredSchedules.map((schedule) => (
                        <Card key={schedule.id} className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <Bus className="h-5 w-5 text-futa-red" />
                                <span className="font-semibold">{schedule.busType}</span>
                              </div>

                              <div className="mb-2 flex items-center gap-4">
                                <div>
                                  <div className="text-2xl font-bold">{schedule.departureTime}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {searchQuery.from}
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span className="text-sm">{schedule.duration}</span>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold">{schedule.arrivalTime}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {searchQuery.to}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {schedule.amenities.map((amenity, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                  >
                                    {getAmenityIcon(amenity)}
                                    <span>{amenity}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-2 text-sm text-gray-600">
                                Còn {schedule.availableSeats} ghế trống
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <div className="text-2xl font-bold text-futa-red">
                                {formatPrice(schedule.price)}
                              </div>
                              <Button
                                className="bg-futa-red hover:bg-futa-red/90"
                                onClick={() => {
                                  setSelectedSchedule(schedule);
                                  setDialogOpen(true);
                                }}
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Return Tab */}
                <TabsContent value="return" className="mt-4">
                  {filteredReturnSchedules.length === 0 ? (
                    <Card className="p-8 text-center">
                      <p className="text-gray-600">Không tìm thấy chuyến xe phù hợp</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleClearFilters}
                      >
                        Xóa bộ lọc
                      </Button>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredReturnSchedules.map((schedule) => (
                        <Card key={schedule.id} className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <Bus className="h-5 w-5 text-futa-red" />
                                <span className="font-semibold">{schedule.busType}</span>
                              </div>

                              <div className="mb-2 flex items-center gap-4">
                                <div>
                                  <div className="text-2xl font-bold">{schedule.departureTime}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {searchQuery.to}
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span className="text-sm">{schedule.duration}</span>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold">{schedule.arrivalTime}</div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {searchQuery.from}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {schedule.amenities.map((amenity, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                  >
                                    {getAmenityIcon(amenity)}
                                    <span>{amenity}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-2 text-sm text-gray-600">
                                Còn {schedule.availableSeats} ghế trống
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <div className="text-2xl font-bold text-futa-red">
                                {formatPrice(schedule.price)}
                              </div>
                              <Button
                                className="bg-futa-red hover:bg-futa-red/90"
                                onClick={() => {
                                  setSelectedSchedule(schedule);
                                  setDialogOpen(true);
                                }}
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <>
                {filteredSchedules.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-gray-600">Không tìm thấy chuyến xe phù hợp</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleClearFilters}
                    >
                      Xóa bộ lọc
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredSchedules.map((schedule) => (
                  <Card key={schedule.id} className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Bus className="h-5 w-5 text-futa-red" />
                          <span className="font-semibold">{schedule.busType}</span>
                        </div>

                        <div className="mb-2 flex items-center gap-4">
                          <div>
                            <div className="text-2xl font-bold">{schedule.departureTime}</div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="mr-1 h-4 w-4" />
                              {searchQuery.from}
                            </div>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock className="mr-1 h-4 w-4" />
                            <span className="text-sm">{schedule.duration}</span>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{schedule.arrivalTime}</div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="mr-1 h-4 w-4" />
                              {searchQuery.to}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {schedule.amenities.map((amenity, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                            >
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                          Còn {schedule.availableSeats} ghế trống
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-2xl font-bold text-futa-red">
                          {formatPrice(schedule.price)}
                        </div>
                        <Button
                          className="bg-futa-red hover:bg-futa-red/90"
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setDialogOpen(true);
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Schedule Detail Dialog */}
      <ScheduleDetailDialog
        schedule={selectedSchedule}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        from={searchQuery.from}
        to={searchQuery.to}
        tripType={searchQuery.tripType}
      />
    </div>
  );
}
