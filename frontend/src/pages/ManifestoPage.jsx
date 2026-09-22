import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "../components/icons";
import Reveal from "../components/Reveal";
import CandidateCard from "../components/CandidateCard";
import { accentMap } from "../data/teams";
import { getTeamById } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { VOTING_START_LABEL } from "../lib/election";
import { useVotingStatus } from "../hooks/useVotingStatus";
import { useLanguage } from "../lib/LanguageContext";
import { localizeTeam } from "../lib/content";

export default function ManifestoPage() {
  const { teamId } = useParams();
  const { data: rawTeam, loading, error } = useApi(() => getTeamById(teamId), [teamId]);
  const votingStatus = useVotingStatus();
  const { lang, t } = useLanguage();

  if (loading) return <div className="py-24 text-center text-navy-900/50">{t("common.loading")}</div>;
  if (error || !rawTeam) return <Navigate to="/candidates" replace />;

  const team = localizeTeam(rawTeam, lang);
  const accent = accentMap[team.accent];
  const votingOpen = votingStatus === "open";
  const startLabel = VOTING_START_LABEL[lang];

  return (
    <div>
      {/* Top bar */}
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 text-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/candidates" className="flex shrink-0 items-center gap-1.5 text-navy-900/60 hover:text-navy-900">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t("manifesto.back")}</span>
              <span className="sm:hidden">{t("candidates.backShort")}</span>
            </Link>
            <span className="hidden text-navy-900/20 sm:inline">|</span>
            <span className="hidden truncate font-semibold text-navy-900 sm:inline">{team.name}</span>
          </div>
          {votingOpen ? (
            <Link
              to={`/vote/${team.id}`}
              className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-white ${accent.solid}`}
            >
              {t("manifesto.voteButton")}
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title={votingStatus === "before" ? t("voting.opensAt", { date: startLabel }) : t("voting.closed")}
              className="shrink-0 cursor-not-allowed whitespace-nowrap rounded-lg bg-navy-900/10 px-4 py-2 text-sm font-semibold text-navy-900/40"
            >
              {t("manifesto.voteButton")}
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Candidate cards */}
        <Reveal>
          <div className="text-center">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${accent.solid}`}>
              {team.name}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
              {t("manifesto.candidatesHeading")}
            </h2>
            <p className="mt-1.5 text-sm text-navy-900/50">{t("manifesto.candidatesHint")}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <CandidateCard role={t("role.president")} person={team.president} accent={accent} />
            <CandidateCard role={t("role.vp")} person={team.vp} accent={accent} />
          </div>
        </Reveal>

        {/* Key initiatives */}
        <Reveal className="mt-16">
          <h2 className="mb-4 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            {t("manifesto.initiativesHeading")}
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
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-16 rounded-2xl bg-navy-950 p-8 text-center text-white" delay={150}>
          <span className="text-2xl">🗳️</span>
          <h3 className="mt-3 font-display text-xl font-semibold">{t("manifesto.cta.heading")}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
            {votingStatus === "before"
              ? t("manifesto.cta.before", { date: startLabel })
              : votingStatus === "after"
                ? t("manifesto.cta.after")
                : t("manifesto.cta.open")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {votingOpen ? (
              <Link
                to={`/vote/${team.id}`}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 ${accent.solid}`}
              >
                {t("manifesto.voteFor", { team: team.name })}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/40"
              >
                {t("manifesto.voteFor", { team: team.name })}
              </button>
            )}
            <Link to="/candidates" className="text-sm font-semibold text-white/70 transition hover:text-white">
              {t("manifesto.otherTeams")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
