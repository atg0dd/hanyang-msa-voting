import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../components/icons";
import { accentMap } from "../data/teams";
import { getTeams, deleteTeam } from "../lib/api";
import { useApi } from "../hooks/useApi";

export default function ManagePage() {
  const { data, loading, error } = useApi(getTeams, []);
  const [teams, setTeams] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (data) setTeams(data);
  }, [data]);

  async function handleDelete(team) {
    const confirmed = window.confirm(
      `Delete "${team.name}"? This permanently removes the team, its manifesto, and all ${team.votes} vote(s) cast for it. This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(team.id);
    setActionError("");
    try {
      await deleteTeam(team.id);
      setTeams((prev) => prev.filter((t) => t.id !== team.id));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 text-sm">
          <Link to="/home" className="flex items-center gap-1.5 text-navy-900/60 transition-colors duration-200 hover:text-navy-900">
            <ArrowLeft size={16} />
            Manage Teams
          </Link>
          <Link
            to="/apply"
            className="rounded-lg bg-navy-950 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-navy-900"
          >
            + Add Team
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        {loading && <p className="text-sm text-navy-900/50">Loading…</p>}
        {error && <p className="text-sm text-red-600">Failed to load teams.</p>}
        {actionError && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{actionError}</p>
        )}

        {!loading && !error && teams.length === 0 && (
          <p className="rounded-lg border border-dashed border-navy-900/15 p-6 text-center text-sm text-navy-900/50">
            No teams yet. <Link to="/apply" className="font-semibold text-blue-600 hover:underline">Add one</Link>.
          </p>
        )}

        <div className="space-y-3">
          {teams.map((team) => {
            const accent = accentMap[team.accent];
            return (
              <div
                key={team.id}
                className="flex items-center justify-between rounded-xl border border-navy-900/10 bg-white p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent?.bar || "bg-navy-900/30"}`} />
                  <div>
                    <p className="font-semibold text-navy-900">{team.name}</p>
                    <p className="text-xs text-navy-900/50">
                      {team.president.name} &amp; {team.vp.name} · {team.votes} vote{team.votes === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={`/team/${team.id}`}
                    className="text-xs font-semibold text-navy-900/50 hover:text-navy-900"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(team)}
                    disabled={deletingId === team.id}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === team.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
