import { useState } from "react";
import { ChevronDown } from "../components/icons";

export default function FaqItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        open ? "border-blue-100 bg-blue-50/60" : "border-navy-900/10 bg-white"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-navy-900"
      >
        {question}
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? "bg-navy-950 text-white" : "bg-navy-900/5 text-navy-900/40"
          }`}
        >
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && answer && (
        <p className="mt-3 text-sm leading-relaxed text-navy-900/60">{answer}</p>
      )}
    </div>
  );
}
