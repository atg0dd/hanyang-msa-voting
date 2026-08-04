import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "../components/icons";
import { teams, accentMap } from "../data/teams";

export default function ManifestoPage() {
  const { teamId } = useParams();
  const team = teams.find((t) => t.id === teamId);
  if (!team) return <Navigate to="/candidates" replace />;

  const accent = accentMap[team.accent];

  return (
    <div>
      {/* Top bar */}
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 text-sm">
          <div className="flex items-center gap-3">
            <Link to="/candidates" className="flex items-center gap-1.5 text-navy-900/60 hover:text-navy-900">
              <ArrowLeft size={16} />
              Нэр дэвшигчид рүү буцах
            </Link>
            <span className="text-navy-900/20">|</span>
            <span className="font-semibold text-navy-900">{team.name}</span>
          </div>
          <Link
            to={`/vote/${team.id}`}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${accent.solid}`}
          >
            🗳️ Санал өгөх
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-navy-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${accent.solid}`}>
            {team.name}
          </span>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-3">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white ${accent.solid}`}>
                {team.president.initials}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">Ерөнхийлөгч</p>
                <p className="font-semibold text-white">{team.president.name}</p>
                <p className="text-sm text-white/50">{team.president.dept}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white ${accent.solid}`}>
                {team.vp.initials}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">Дэд ерөнхийлөгч</p>
                <p className="font-semibold text-white">{team.vp.name}</p>
                <p className="text-sm text-white/50">{team.vp.dept}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-lg italic text-white/70">"{team.slogan}"</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Vision */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px flex-1 bg-navy-900/10" />
            <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-navy-900/40">
              Бидний Алсын Хараа
            </h2>
            <span className="h-px flex-1 bg-navy-900/10" />
          </div>
          <p className="mt-6 text-xl italic leading-relaxed text-navy-900/80 sm:text-2xl">
            {team.vision}
          </p>
        </div>

        {/* Platform pillars */}
        <div className="mt-16">
          <h2 className="mb-5 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            Мөрийн хөтөлбөрийн тулгуур зарчим
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {team.pillars.map((p) => (
              <div key={p.title} className="rounded-xl bg-slate-50 p-5">
                <span className="text-xl">{p.icon}</span>
                <h3 className="mt-3 text-sm font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key initiatives */}
        <div className="mt-16">
          <h2 className="mb-4 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            Гол санаачилгууд
          </h2>
          <div className="divide-y divide-navy-900/10">
            {team.initiatives.map((init) => (
              <div key={init.headline} className="flex gap-3 py-4 first:pt-0">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-2 ${accent.ring} ${accent.text}`}>
                  <Check size={13} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{init.headline}</p>
                  <p className="mt-0.5 text-sm text-navy-900/60">{init.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-navy-950 p-8 text-center text-white">
          <span className="text-2xl">🗳️</span>
          <h3 className="mt-3 font-display text-xl font-semibold">Итгэлтэй байна уу? Саналаа өгье.</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
            Санал хураалт 2026 оны 8-р сарын 24–26-нд явагдана. Таны санал нууц бөгөөд шифрлэгдсэн болно.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/vote/${team.id}`}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white ${accent.solid}`}
            >
              {team.name}-д санал өгөх
            </Link>
            <Link to="/candidates" className="text-sm font-semibold text-white/70 hover:text-white">
              Бусад багуудыг үзэх
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
