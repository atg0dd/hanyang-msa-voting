import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "../components/icons";
import { teams, accentMap } from "../data/teams";

export default function ManifestoPage() {
  const { teamId } = useParams();
  const team = teams.find((t) => t.id === teamId);
  if (!team) return <Navigate to="/" replace />;

  const accent = accentMap[team.accent];
  const otherTeams = teams.filter((t) => t.id !== teamId);

  return (
    <div>
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-navy-900/60 hover:text-navy-900">
            <ArrowLeft size={16} />
            Back to Candidates | {team.name}
          </Link>
          <Link
            to={`/vote/${team.id}`}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${accent.solid}`}
          >
            Vote Now
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <span className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${accent.badge}`}>
          {team.name}
        </span>
        <h1 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
          President &amp; Vice President
        </h1>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold ${accent.soft} ${accent.text}`}>
              {team.president.initials}
            </div>
            <div>
              <p className="font-semibold text-navy-900">{team.president.name}</p>
              <p className="text-sm text-navy-900/50">{team.president.dept}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold ${accent.soft} ${accent.text}`}>
              {team.vp.initials}
            </div>
            <div>
              <p className="font-semibold text-navy-900">{team.vp.name}</p>
              <p className="text-sm text-navy-900/50">{team.vp.dept}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-lg italic text-navy-900/70">"{team.slogan}"</p>

        {/* Vision */}
        <div className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-900/40">Our Vision</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-navy-900/80">{team.vision}</p>
        </div>

        {/* Platform pillars */}
        <div className="mt-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-navy-900/40">Platform Pillars</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {team.pillars.map((p) => (
              <div key={p.title} className="rounded-xl border border-navy-900/10 bg-white p-5 shadow-card">
                <span className="text-xl">{p.icon}</span>
                <h3 className="mt-3 text-sm font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key initiatives */}
        <div className="mt-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-navy-900/40">Key Initiatives</h2>
          <div className="space-y-3">
            {team.initiatives.map((init, i) => (
              <div key={init.headline} className="flex gap-3 rounded-xl border border-navy-900/10 bg-white p-4">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${accent.soft} ${accent.text}`}>
                  {i + 1}
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
        <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center text-white">
          <span className="text-2xl">🗳️</span>
          <h3 className="mt-3 font-display text-xl font-semibold">Convinced? Cast your vote.</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
            Voting is open Aug 4–6, 2026. Your ballot is anonymous and encrypted.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/vote/${team.id}`}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Vote for {team.name}
            </Link>
            <Link to="/" className="text-sm font-semibold text-white/70 hover:text-white">
              View other teams
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-navy-900/30">
          Other teams: {otherTeams.map((t) => t.name).join(" · ")}
        </p>
      </div>
    </div>
  );
}
