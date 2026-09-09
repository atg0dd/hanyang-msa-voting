import { useState } from "react";
import { ShieldCheck, ArrowRight, UserPlaceholder } from "./icons";
import { API_BASE_URL } from "../lib/api";

const YEAR_RE = /^\s*\d{4}\s*[.\-–]?\s*(он|year|년)\b/i;
const BULLET_RE = /^\s*[●•▪◦‣·∙*+–—-]\s+/;

// Candidates type bio / achievements as free text — often a year-by-year
// timeline with "●" bullets. Render that structure instead of collapsing it
// into a wall of text; fall back to plain wrapped text when there's no structure.
function RichText({ text }) {
  const raw = (text ?? "").trim();
  if (!raw) return null;

  const lines = raw.split(/\r?\n/);
  const structured = lines.some((l) => YEAR_RE.test(l) || BULLET_RE.test(l));

  if (!structured) {
    return <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-white/70">{raw}</p>;
  }

  return (
    <div className="space-y-1 text-[13px] leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} aria-hidden className="h-1.5" />;
        if (YEAR_RE.test(line)) {
          return (
            <p key={i} className="pt-2.5 font-semibold text-white first:pt-0">
              {trimmed}
            </p>
          );
        }
        if (BULLET_RE.test(line)) {
          return (
            <div key={i} className="flex gap-2 pl-1 text-white/70">
              <span aria-hidden className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
              <span>{line.replace(BULLET_RE, "")}</span>
            </div>
          );
        }
        return (
          <p key={i} className="text-white/70">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function CandidateCard({ role, person, accent }) {
  const [flipped, setFlipped] = useState(false);
  const hasDetails = Boolean(person.bio?.trim() || person.achievements?.trim());

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className={`flip-card h-[32rem] w-full text-left ${flipped ? "is-flipped" : ""}`}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-face flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-card">
          <div className={`relative flex h-96 shrink-0 items-center justify-center overflow-hidden ${accent.soft}`}>
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-900/60 backdrop-blur">
              {role}
            </span>
            {person.photoUrl ? (
              <img
                src={`${API_BASE_URL}${person.photoUrl}`}
                alt={person.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: `${person.photoPositionX ?? 50}% ${person.photoPositionY ?? 50}%` }}
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

          <div className="flex flex-1 flex-col p-4 pt-5">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-navy-900">{person.name}</p>
              <ShieldCheck size={15} className={accent.text} />
            </div>
            <p className="mt-1 text-sm leading-snug text-navy-900/50">{person.dept}</p>

            <div className="mt-auto flex items-center justify-end pt-3">
              <span className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white ${accent.solid}`}>
                Дэлгэрэнгүй
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-face-back flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-navy-950 text-white shadow-card">
          <div className="shrink-0 border-b border-white/10 px-6 pb-4 pt-6">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">{role}</span>
            <p className="mt-1 font-display text-base font-semibold">{person.name}</p>
          </div>

          <div className="relative min-h-0 flex-1">
            <div className="h-full space-y-5 overflow-y-auto px-6 py-5 pr-5">
              {person.bio?.trim() && (
                <section>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">Танилцуулга</p>
                  <RichText text={person.bio} />
                </section>
              )}
              {person.achievements?.trim() && (
                <section className={person.bio?.trim() ? "border-t border-white/10 pt-5" : ""}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/40">Амжилт, ололт</p>
                  <RichText text={person.achievements} />
                </section>
              )}
              {!hasDetails && (
                <p className="text-[13px] text-white/40">Дэлгэрэнгүй мэдээлэл оруулаагүй байна.</p>
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-navy-950 to-transparent" />
          </div>

          <p className="shrink-0 px-6 pb-5 pt-3 text-[11px] font-medium text-white/30">← Буцах</p>
        </div>
      </div>
    </button>
  );
}
