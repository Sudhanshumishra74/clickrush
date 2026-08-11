import { useEffect, useState } from "react";
import { Award, Crown, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar.jsx";
import Card from "../../components/Card.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import Loading from "../../components/Loading.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import {
  getGlobalLeaderboard,
  getDailyLeaderboard,
  getWeeklyLeaderboard,
} from "../../services/leaderboard.services.js";

const tabs = [
  { id: "global", label: "Global" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [type, setType] = useState("global");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");

      try {
        let response;

        if (type === "global") {
          response = await getGlobalLeaderboard();
        }

        if (type === "daily") {
          response = await getDailyLeaderboard();
        }

        if (type === "weekly") {
          response = await getWeeklyLeaderboard();
        }

        setLeaderboard(response.data || []);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setError("We could not load the leaderboard right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Loading message="Loading leaderboard..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader title="Leaderboard" description="See how your score compares across the community." />

        <Card className="p-0">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setType(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  type === tab.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {error ? <p className="p-6 text-sm text-red-600">{error}</p> : null}

          {!error && leaderboard.length === 0 ? (
            <div className="p-6">
              <EmptyState title="No results yet" description="This leaderboard is still empty. Start your first run to appear here." />
            </div>
          ) : null}

          {!error && leaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Player</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {leaderboard.map((player) => (
                    <tr key={player.user.id} className={player.rank <= 3 ? "bg-indigo-50/50" : "bg-white"}>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          {player.rank <= 3 ? <Crown size={16} className={player.rank === 1 ? "text-amber-500" : "text-slate-500"} /> : <Award size={16} className="text-slate-400" />}
                          {player.rank}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">{player.user.name}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">{player.score}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{player.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Card>
      </main>
    </div>
  );
}

export default Leaderboard;