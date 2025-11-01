import { useEffect, useState, useRef } from "react";
import { Users, Building2, Bus } from "lucide-react";

interface StatItem {
  icon: typeof Users;
  value: string;
  label: string;
  targetNumber: number;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: "10 Triệu+",
    label: "Hành khách",
    targetNumber: 10,
  },
  {
    icon: Building2,
    value: "450+",
    label: "Phòng vé",
    targetNumber: 450,
  },
  {
    icon: Bus,
    value: "1,500+",
    label: "Chuyến xe/ngày",
    targetNumber: 1500,
  },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      className="bg-gradient-to-r from-[#d5181d] via-[#d5181d] to-[#e84a4a] py-16 sm:py-20"
      data-testid="section-statistics"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                data-testid={`stat-${index + 1}`}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-4xl font-bold text-white sm:text-5xl" data-testid={`text-stat-value-${index + 1}`}>
                  <CountUp
                    target={stat.targetNumber}
                    suffix={stat.targetNumber === 10 ? " Triệu+" : "+"}
                  />
                </h3>
                <p className="text-lg font-medium text-white/90" data-testid={`text-stat-label-${index + 1}`}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
