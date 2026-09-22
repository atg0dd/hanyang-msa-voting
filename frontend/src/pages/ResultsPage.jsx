import { Link } from "react-router-dom";
import { ArrowLeft } from "../components/icons";
import Reveal from "../components/Reveal";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { getResults } from "../lib/api";
import { useApi } from "../hooks/useApi";
import { useLanguage } from "../lib/LanguageContext";

const barColors = { blue: "#3B82F6", purple: "#A855F7", green: "#10B981" };

export default function ResultsPage() {
  const { data: results, loading, error } = useApi(getResults, []);
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950 text-white/50">
        {t("common.loading")}
      </div>
    );
  }
  if (error || !results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950 text-red-400">
        {t("results.loadError")}
      </div>
    );
  }

  const { totalVotesCast, totalEligibleVoters, turnoutPercentage, teams } = results;
  const leading = teams[0]; // already sorted descending by the backend

  const chartData = teams.map((team) => ({
    name: team.name.replace("Team ", ""),
    votes: team.votes,
    color: barColors[team.accent],
  }));

  const donutData = [
    { name: t("results.cast"), value: totalVotesCast },
    { name: t("results.notCast"), value: totalEligibleVoters - totalVotesCast },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
          <Link to="/home" className="flex items-center gap-1.5 text-white/60 transition hover:text-white">
            <ArrowLeft size={16} />
            {t("results.live")}
          </Link>
          <span className="text-white/40">{t("results.updated")}</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal><StatCard label={t("results.totalVotes")} value={totalVotesCast.toLocaleString()} sub={t("results.outOf", { n: totalEligibleVoters.toLocaleString() })} /></Reveal>
          <Reveal delay={80}><StatCard label={t("results.turnout")} value={`${turnoutPercentage}%`} sub={t("results.turnoutSub")} /></Reveal>
          <Reveal delay={160}><StatCard label={t("results.electionDay")} value={t("results.electionDayValue")} sub={t("results.electionDaySub")} /></Reveal>
          <Reveal delay={240}><StatCard label={t("results.leading")} value={leading.name} sub={t("results.votesSuffix", { n: leading.votes.toLocaleString() })} /></Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm lg:col-span-2">
            <h2 className="font-display text-sm font-semibold">{t("results.standings")}</h2>
            <div className="mt-4 space-y-3">
              {teams.map((team, i) => (
                <div key={team.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="font-semibold">{team.name}</span>
                      {i === 0 && (
                        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/30">
                          {t("results.leadingBadge")}
                        </span>
                      )}
                    </div>
                    <span className="tabular-nums text-xs text-white/50">{team.percentage}%</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                    <span>{team.president.name} · {t("role.president")}</span>
                    <span>{team.vp.name} · {t("role.vp")}</span>
                    <span className="ml-auto font-semibold tabular-nums text-white">
                      {t("results.votesSuffix", { n: team.votes.toLocaleString() })}
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500`}
                      style={{ width: `${team.percentage}%`, backgroundColor: barColors[team.accent] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm" delay={120}>
            <h2 className="font-display text-sm font-semibold">{t("results.byTeam")}</h2>
            <div className="mt-4 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h2 className="mt-6 font-display text-sm font-semibold">{t("results.overallTurnout")}</h2>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-24 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={44}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="rgba(255,255,255,0.1)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs">
                <p className="font-display text-lg font-semibold">{turnoutPercentage}%</p>
                <p className="mt-1 flex items-center gap-1.5 text-white/50">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> {t("results.cast")} — {totalVotesCast.toLocaleString()}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-white/50">
                  <span className="h-2 w-2 rounded-full bg-white/20" /> {t("results.notCast")} — {(totalEligibleVoters - totalVotesCast).toLocaleString()}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          {t("results.disclaimer")}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent" />
      <p className="relative text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className="relative mt-1.5 font-display text-2xl font-semibold tabular-nums">{value}</p>
      <p className="relative mt-1 text-xs text-white/40">{sub}</p>
    </div>
  );
}
