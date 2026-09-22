import { Link } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import FaqItem from "../components/FaqItem";
import Reveal from "../components/Reveal";
import { IdCard, ClipboardList, ShieldCheck, ArrowRight } from "../components/icons";
import { getTeams } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { useLanguage } from "../lib/LanguageContext";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"];
const stepKeys = ["landing.step1", "landing.step2", "landing.step3"];
const stepIcons = [IdCard, ClipboardList, ShieldCheck];

export default function HomeLandingPage() {
  const { data: teams, loading, error } = useApi(getTeams, []);
  const { t } = useLanguage();

  const stats = [
    { value: loading ? "—" : String(teams?.length ?? 0), label: t("landing.stat.teams") },
    { value: "150+", label: t("landing.stat.students") },
    { value: t("landing.stat.daysValue"), label: t("landing.stat.days") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-[#EEF1FD] to-[#F7F8FC] px-6 py-16 text-center sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blue-300/30 blur-[100px]" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-purple-300/25 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {t("landing.heroBadge")}
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-5xl">
            {t("landing.heroTitle")}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-navy-900/60 sm:text-base">
            {t("landing.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/candidates"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-navy-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-2xl active:translate-y-0 sm:px-8 sm:text-base"
            >
              {t("landing.cta.candidates")}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/results"
              className="rounded-full border border-navy-900/15 bg-white px-7 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900/5 hover:shadow-md active:translate-y-0 sm:px-8 sm:text-base"
            >
              {t("landing.cta.results")}
            </Link>
          </div>

          <div className="mt-14 flex items-center justify-center divide-x divide-navy-900/10">
            {stats.map((s) => (
              <div key={s.label} className="px-6 first:pl-0 last:pr-0 sm:px-10">
                <p className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-navy-900/50 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the candidates */}
      <section id="candidates" className="bg-[#F0F2FA] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              {loading ? t("common.loading") : t("landing.teamsCompeting", { n: teams?.length ?? 0 })}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
              {t("landing.candidates.heading")}
            </h2>
            <p className="mt-2 text-sm text-navy-900/60 sm:text-base">
              {t("landing.candidates.subtitle")}
            </p>
          </Reveal>
          {loading ? (
            <p className="mt-10 text-center text-sm text-navy-900/40">{t("common.loading")}</p>
          ) : error ? (
            <p className="mt-10 text-center text-sm text-red-500">{t("common.loadError")}</p>
          ) : (
            <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, i) => (
                <Reveal key={team.id} delay={i * 100}>
                  <TeamCard team={team} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Need help voting */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-card lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              {t("landing.help.eyebrow")}
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
              {t("landing.help.heading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-900/60">
              {t("landing.help.subtitle")}
            </p>
            <ul className="mt-6 space-y-4">
              {stepKeys.map((key, i) => {
                const Icon = stepIcons[i];
                return (
                  <li key={key} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Icon size={17} />
                    </span>
                    <span className="text-sm font-medium text-navy-900">{t(key)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900 lg:flex">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-blue-500/30 blur-[90px]" />
              <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-purple-500/20 blur-[90px]" />
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              <span className="relative text-5xl">🗳️</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-[#F0F2FA] px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {t("landing.faq.eyebrow")}
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
            {t("landing.faq.heading")}
          </h2>
          <p className="mt-2 text-sm text-navy-900/60">
            {t("landing.faq.subtitle")}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl space-y-3" delay={100}>
          {faqKeys.map((key) => (
            <FaqItem key={key} question={t(`landing.${key}.q`)} answer={t(`landing.${key}.a`)} />
          ))}
        </Reveal>

        <Reveal
          className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl bg-blue-50 px-6 py-6 sm:flex-row"
          delay={150}
        >
          <div className="text-center sm:text-left">
            <p className="font-semibold text-navy-900">{t("landing.helpCta.heading")}</p>
            <p className="mt-1 text-sm text-navy-900/60">
              {t("landing.helpCta.subtitle")}
            </p>
          </div>
          <a
            href="https://www.instagram.com/msa_erica/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-lg active:translate-y-0"
          >
            {t("landing.helpCta.button")}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
