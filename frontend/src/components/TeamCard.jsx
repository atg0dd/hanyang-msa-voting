import { Link } from "react-router-dom";
import { accentMap } from "../data/teams";
import { API_BASE_URL } from "../lib/api";
import { VOTING_START_LABEL } from "../lib/election";
import { useVotingStatus } from "../hooks/useVotingStatus";
import { useLanguage } from "../lib/LanguageContext";
import { localizeTeam } from "../lib/content";

function CandidateAvatar({ person, accent }) {
  if (person.photoUrl) {
    return (
      <img
        src={`${API_BASE_URL}${person.photoUrl}`}
        alt={person.name}
        className="h-11 w-11 shrink-0 rounded-full object-cover"
        style={{ objectPosition: `${person.photoPositionX ?? 50}% ${person.photoPositionY ?? 50}%` }}
      />
    );
  }
  return (
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${accent.soft} ${accent.text}`}>
      {person.initials}
    </div>
  );
}

export default function TeamCard({ team: rawTeam }) {
  const votingStatus = useVotingStatus();
  const { lang, t } = useLanguage();
  const team = localizeTeam(rawTeam, lang);
  const accent = accentMap[team.accent];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-1.5 ${accent.bar}`} />
      <div className="flex flex-1 flex-col p-6">
        <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${accent.badge}`}>
          {team.name}
        </span>

        <div className="mb-4 flex items-center gap-3">
          <CandidateAvatar person={team.president} accent={accent} />
          <div>
            <p className="text-sm font-semibold text-navy-900">{team.president.name}</p>
            <p className="text-xs text-navy-900/50">{t("role.president")} · {team.president.dept}</p>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <CandidateAvatar person={team.vp} accent={accent} />
          <div>
            <p className="text-sm font-semibold text-navy-900">{team.vp.name}</p>
            <p className="text-xs text-navy-900/50">{t("role.vp")} · {team.vp.dept}</p>
          </div>
        </div>

        <p className="mb-6 flex-1 text-sm italic text-navy-900/70">"{team.slogan}"</p>

        <div className="flex flex-col gap-2">
          {votingStatus === "open" ? (
            <Link
              to={`/vote/${team.id}`}
              className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] ${accent.solid}`}
            >
              {t("team.voteButton")}
            </Link>
          ) : (
            <div>
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-navy-900/10 px-4 py-2.5 text-center text-sm font-semibold text-navy-900/40"
              >
                {t("team.voteButton")}
              </button>
              <p className="mt-1.5 text-center text-[11px] text-navy-900/40">
                {votingStatus === "before"
                  ? t("voting.opensAt", { date: VOTING_START_LABEL[lang] })
                  : t("voting.closed")}
              </p>
            </div>
          )}
          <Link
            to={`/team/${team.id}`}
            className="rounded-lg border border-navy-900/10 px-4 py-2.5 text-center text-sm font-semibold text-navy-900 transition-all duration-200 hover:bg-navy-900/5 active:scale-[0.98]"
          >
            {t("team.viewManifesto")}
          </Link>
        </div>
      </div>
    </div>
  );
}
