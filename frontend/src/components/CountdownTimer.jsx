import { useEffect, useState } from "react";

// Target: election start, Aug 4 2026 09:00 KST
const TARGET = new Date("2026-08-04T09:00:00+09:00").getTime();

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
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.key}
          className="flex w-16 flex-col items-center rounded-xl bg-white/10 py-3 sm:w-20"
        >
          <span className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
            {String(time[u.key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
