import { Link } from "react-router-dom";
import { ArrowLeft } from "../components/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { teams, accentMap } from "../data/teams";

const TOTAL_ELIGIBLE = 10000;
const totalVotes = teams.reduce((s, t) => s + t.votes, 0);
const turnout = ((totalVotes / TOTAL_ELIGIBLE) * 100).toFixed(1);
const leading = [...teams].sort((a, b) => b.votes - a.votes)[0];

const barColors = { blue: "#3B82F6", purple: "#A855F7", green: "#10B981" };

const chartData = teams.map((t) => ({
  name: t.name.replace("Team ", ""),
  votes: t.votes,
  color: barColors[t.accent],
}));

const donutData = [
  { name: "Votes cast", value: totalVotes },
  { name: "Yet to vote", value: TOTAL_ELIGIBLE - totalVotes },
];

export default function ResultsPage() {
  return (
    <div className="bg-navy-950 min-h-screen text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-white/60 hover:text-white">
            <ArrowLeft size={16} />
            Live Election Results
          </Link>
          <span className="text-white/40">Updated 2 min ago</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Top stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Votes Cast" value={totalVotes.toLocaleString()} sub={`of ${TOTAL_ELIGIBLE.toLocaleString()} eligible`} />
          <StatCard label="Voter Turnout" value={`${turnout}%`} sub="of enrolled students" />
          <StatCard label="Election Day" value="Day 2 of 3" sub="Voting closes Aug 6" />
          <StatCard label="Currently Leading" value={leading.name} sub={`${leading.votes.toLocaleString()} votes`} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Team standings */}
          <div className="rounded-2xl bg-white/5 p-6 lg:col-span-2">
            <h2 className="font-display text-sm font-semibold">Team Standings</h2>
            <div className="mt-4 space-y-3">
              {[...teams]
                .sort((a, b) => b.votes - a.votes)
                .map((team, i) => {
                  const accent = accentMap[team.accent];
                  const pct = ((team.votes / totalVotes) * 100).toFixed(1);
                  return (
                    <div key={team.id} className="rounded-xl bg-white/5 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                            {i + 1}
                          </span>
                          <span className="font-semibold">{team.name}</span>
                          {i === 0 && (
                            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                              LEADING
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-white/50">{pct}%</span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-white/50">
                        <span>{team.president.name} · President</span>
                        <span>{team.vp.name} · Vice President</span>
                        <span className="ml-auto font-semibold text-white">
                          {team.votes.toLocaleString()} votes
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${accent.bar}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Votes by team bar chart */}
          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="font-display text-sm font-semibold">Votes by Team</h2>
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

            {/* Overall turnout donut */}
            <h2 className="mt-6 font-display text-sm font-semibold">Overall Turnout</h2>
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
                <p className="text-lg font-semibold">{turnout}%</p>
                <p className="mt-1 flex items-center gap-1.5 text-white/50">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Votes cast — {totalVotes.toLocaleString()}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-white/50">
                  <span className="h-2 w-2 rounded-full bg-white/20" /> Yet to vote — {(TOTAL_ELIGIBLE - totalVotes).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          Results are preliminary and update every few minutes. Final certified results
          will be published within 24 hours of polls closing on Aug 6, 18:00 KST.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-white/40">{sub}</p>
    </div>
  );
}
