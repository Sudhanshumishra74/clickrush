import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowRight, Activity, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getGameHistory, getProfile, getRankings } from "../services/profile.services.js";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const [profileResponse, historyResponse, rankingsResponse] = await Promise.all([
        getProfile(),
        getGameHistory(),
        getRankings(),
      ]);

      setProfile(profileResponse.data);
      setHistory(historyResponse.data || []);
      setRankings(rankingsResponse.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setError("We could not load your dashboard right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (value) => {
    if (!value) return "—";
    return format(new Date(value), "MMM d, yyyy • h:mm a");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Loading message="Preparing your dashboard..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <p className="text-lg font-semibold text-slate-900">We hit a snag</p>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Try again
            </button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title={`Welcome back, ${profile?.name || "Player"}`}
          description="Review your progress and jump straight back into the next challenge."
          action={
            <Link to="/game" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Play now
              <ArrowRight size={16} />
            </Link>
          }
        />

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Total Games" value={profile?.totalGames ?? 0} accent="indigo" />
          <StatCard label="Best Score" value={profile?.bestScore ?? 0} accent="emerald" />
          <StatCard label="Global Rank" value={rankings?.globalRank ?? "—"} accent="violet" />
          <StatCard label="Daily Rank" value={rankings?.dailyRank ?? "—"} accent="slate" />
          <StatCard label="Weekly Rank" value={rankings?.weeklyRank ?? "—"} accent="slate" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Recent activity</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">Latest game sessions</h2>
              </div>
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                <Activity size={18} />
              </div>
            </div>

            {history.length > 0 ? (
              <div className="mt-6 space-y-3">
                {history.slice(0, 5).map((game) => (
                  <div key={game.id} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Score {game.score}</p>
                      <p className="text-sm text-slate-600">{game.clicks} clicks • Session {game.gameSessionId}</p>
                    </div>
                    <p className="text-sm text-slate-500">{formatDate(game.playedAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState title="No games played yet" description="Start your first run to build a streak and show up here." />
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-600">Ready for another round?</p>
                <h2 className="text-xl font-semibold text-slate-900">Keep your momentum going</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <div>
                  <p className="text-sm text-slate-500">Best score</p>
                  <p className="text-lg font-semibold text-slate-900">{profile?.bestScore ?? 0}</p>
                </div>
                <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                  <Trophy size={18} />
                </div>
              </div>

              <div className="text-sm text-slate-600">
                <p>Stay sharp with quick sessions and keep an eye on your daily and weekly rank.</p>
              </div>

              <Link to="/game" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Begin the next run
                <ArrowRight size={16} />
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;