import { useState } from "react";
import { ChevronDown } from "../components/icons";

export default function FaqItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-navy-900/10 py-4 last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-navy-900"
      >
        {question}
        <ChevronDown
          size={18}
          className={`shrink-0 text-navy-900/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && answer && (
        <p className="mt-2 pr-6 text-sm leading-relaxed text-navy-900/60">{answer}</p>
      )}
    </div>
  );
}
