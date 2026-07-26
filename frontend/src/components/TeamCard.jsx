import { Link } from "react-router-dom";
import { accentMap } from "../data/teams";

export default function TeamCard({ team }) {
  const accent = accentMap[team.accent];

  return (
    <div className="flex flex-col rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card">
      <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${accent.badge}`}>
        {team.name}
      </span>

      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${accent.soft} ${accent.text}`}>
          {team.president.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">{team.president.name}</p>
          <p className="text-xs text-navy-900/50">President · {team.president.dept}</p>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${accent.soft} ${accent.text}`}>
          {team.vp.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">{team.vp.name}</p>
          <p className="text-xs text-navy-900/50">Vice President · {team.vp.dept}</p>
        </div>
      </div>

      <p className="mb-6 flex-1 text-sm italic text-navy-900/70">"{team.slogan}"</p>

      <div className="flex flex-col gap-2">
        <Link
          to={`/vote/${team.id}`}
          className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition ${accent.solid}`}
        >
          Vote for This Team
        </Link>
        <Link
          to={`/team/${team.id}`}
          className="rounded-lg border border-navy-900/10 px-4 py-2.5 text-center text-sm font-semibold text-navy-900 transition hover:bg-navy-900/5"
        >
          View Manifesto
        </Link>
      </div>
    </div>
  );
}
