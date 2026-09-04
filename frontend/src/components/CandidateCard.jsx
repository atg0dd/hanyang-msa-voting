import { useState } from "react";
import { ShieldCheck, IdCard, ArrowRight, UserPlaceholder } from "./icons";
import { API_BASE_URL } from "../lib/api";

export default function CandidateCard({ role, person, accent, slogan }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className={`flip-card h-96 w-full text-left ${flipped ? "is-flipped" : ""}`}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-face flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-card">
          <div className={`relative flex h-44 shrink-0 items-center justify-center overflow-hidden ${accent.soft}`}>
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-900/60 backdrop-blur">
              {role}
            </span>
            {person.photoUrl ? (
              <img
                src={`${API_BASE_URL}${person.photoUrl}`}
                alt={person.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserPlaceholder size={104} className={`${accent.text} opacity-40`} />
            )}
            <div
              className={`absolute -bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ring-4 ring-white ${accent.solid}`}
            >
              {person.initials}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 pt-6">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-navy-900">{person.name}</p>
              <ShieldCheck size={15} className={accent.text} />
            </div>
            <p className="mt-1 text-sm leading-snug text-navy-900/50">{person.dept}</p>
            {slogan && (
              <p className="mt-2 line-clamp-2 text-xs italic leading-snug text-navy-900/40">"{slogan}"</p>
            )}

            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="flex items-center gap-1 text-xs text-navy-900/40">
                <IdCard size={14} />
                {person.studentId}
              </span>
              <span className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white ${accent.solid}`}>
                Дэлгэрэнгүй
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-face-back flex flex-col rounded-2xl border border-navy-900/5 bg-navy-950 p-6 text-white shadow-card">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">{role}</span>
          <p className="mt-1 font-display text-base font-semibold">{person.name}</p>
          <div className="mt-4 flex-1 space-y-4 overflow-y-auto text-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">Танилцуулга</p>
              <p className="mt-1 leading-relaxed text-white/70">{person.bio}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">Амжилт, ололт</p>
              <p className="mt-1 leading-relaxed text-white/70">{person.achievements}</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-medium text-white/30">← Буцах</p>
        </div>
      </div>
    </button>
  );
}
