import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export type SortOption = "time" | "price-asc" | "price-desc";
export type BusType = "Giường nằm" | "Ghế ngồi";
export type TimeSlot = "morning" | "afternoon" | "evening";

interface SearchFiltersProps {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  selectedBusTypes: BusType[];
  setSelectedBusTypes: (value: BusType[]) => void;
  priceRange: [number];
  setPriceRange: (value: [number]) => void;
  selectedTimeSlots: TimeSlot[];
  setSelectedTimeSlots: (value: TimeSlot[]) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  sortBy,
  setSortBy,
  selectedBusTypes,
  setSelectedBusTypes,
  priceRange,
  setPriceRange,
  selectedTimeSlots,
  setSelectedTimeSlots,
  onClearFilters,
}: SearchFiltersProps) {
  const busTypes: BusType[] = ["Giường nằm", "Ghế ngồi"];
  const timeSlots: { value: TimeSlot; label: string; time: string }[] = [
    { value: "morning", label: "Sáng", time: "06:00 - 12:00" },
    { value: "afternoon", label: "Chiều", time: "12:00 - 18:00" },
    { value: "evening", label: "Tối", time: "18:00 - 24:00" },
  ];

  const toggleBusType = (type: BusType) => {
    if (selectedBusTypes.includes(type)) {
      setSelectedBusTypes(selectedBusTypes.filter((t) => t !== type));
    } else {
      setSelectedBusTypes([...selectedBusTypes, type]);
    }
  };

  const toggleTimeSlot = (slot: TimeSlot) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((s) => s !== slot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bộ lọc</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-futa-red hover:text-futa-red/90"
        >
          <X className="mr-1 h-4 w-4" />
          Xóa lọc
        </Button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <Label className="mb-3 block font-semibold">Sắp xếp theo</Label>
          <RadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="time" id="sort-time" />
              <Label htmlFor="sort-time" className="cursor-pointer font-normal">
                Giờ khởi hành
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-asc" id="sort-price-asc" />
              <Label htmlFor="sort-price-asc" className="cursor-pointer font-normal">
                Giá thấp đến cao
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-desc" id="sort-price-desc" />
              <Label htmlFor="sort-price-desc" className="cursor-pointer font-normal">
                Giá cao đến thấp
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Bus Type Filter */}
        <div>
          <Label className="mb-3 block font-semibold">Loại xe</Label>
          <div className="space-y-2">
            {busTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`bus-${type}`}
                  checked={selectedBusTypes.includes(type)}
                  onCheckedChange={() => toggleBusType(type)}
                />
                <Label
                  htmlFor={`bus-${type}`}
                  className="cursor-pointer font-normal"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="mb-3 block font-semibold">
            Khoảng giá: {formatPrice(priceRange[0])}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(v) => setPriceRange(v as [number])}
            max={1000000}
            step={50000}
            className="mt-2"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>0đ</span>
            <span>1,000,000đ</span>
          </div>
        </div>

        {/* Time Slot Filter */}
        <div>
          <Label className="mb-3 block font-semibold">Giờ khởi hành</Label>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <div key={slot.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${slot.value}`}
                  checked={selectedTimeSlots.includes(slot.value)}
                  onCheckedChange={() => toggleTimeSlot(slot.value)}
                />
                <Label
                  htmlFor={`time-${slot.value}`}
                  className="cursor-pointer font-normal"
                >
                  <div>
                    <div>{slot.label}</div>
                    <div className="text-xs text-gray-500">{slot.time}</div>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

