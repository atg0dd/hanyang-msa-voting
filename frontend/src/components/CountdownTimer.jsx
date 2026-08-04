import { useEffect, useState } from "react";

// Target: election start, Aug 24 2026 09:00 KST
const TARGET = new Date("2026-08-24T09:00:00+09:00").getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = [
  { key: "days", label: "Өдөр" },
  { key: "hours", label: "Цаг" },
  { key: "minutes", label: "Минут" },
  { key: "seconds", label: "Секунд" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center flex-wrap md:flex-nowrap">
      {units.map((u) => (
        <div key={u.key} className="flex flex-col items-center">
          <div className="rounded-2xl sm:rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl px-4 sm:px-8 md:px-10 lg:px-12 py-0 min-w-20 sm:min-w-24 md:min-w-28 lg:min-w-32 overflow-hidden">
            <div className="flex flex-col divide-y divide-white/20">
              <div className="py-2 sm:py-4 md:py-5 lg:py-6 text-center">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums text-white">
                  {String(time[u.key]).padStart(2, "0")}
                </span>
              </div>
              <div className="py-2 sm:py-4 md:py-5 lg:py-6 text-center">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums text-white">
                  {String(time[u.key]).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          <span className="mt-2 sm:mt-4 text-xs sm:text-sm uppercase tracking-wider text-white/60 font-semibold">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
