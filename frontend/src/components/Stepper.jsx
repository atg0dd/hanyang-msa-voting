import { Check } from "lucide-react";

export default function Stepper({ steps, current }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const state = stepNum < current ? "done" : stepNum === current ? "active" : "upcoming";

        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  state === "done"
                    ? "bg-blue-600 text-white"
                    : state === "active"
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-navy-900/10 text-navy-900/40"
                }`}
              >
                {state === "done" ? <Check size={15} /> : stepNum}
              </div>
              <span
                className={`text-[11px] font-medium ${
                  state === "upcoming" ? "text-navy-900/40" : "text-navy-900"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  stepNum < current ? "bg-blue-600" : "bg-navy-900/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
