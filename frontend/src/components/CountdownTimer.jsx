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
    <div className="flex items-start justify-center">
      {units.map((u, i) => (
        <div key={u.key} className="flex items-start">
          <div className="mx-1 flex flex-col items-center sm:mx-0">
            <div className="relative w-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:w-20 md:w-24 lg:w-28">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative flex items-center justify-center py-3 sm:py-5 md:py-6 lg:py-7">
                <span className="font-display text-3xl font-bold tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {String(time[u.key]).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:mt-3 sm:text-xs">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="hidden px-1 pt-3 font-display text-2xl font-bold text-white/20 sm:block sm:pt-5 sm:text-3xl md:pt-6 md:text-4xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
