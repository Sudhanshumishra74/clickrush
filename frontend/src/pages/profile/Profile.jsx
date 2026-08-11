import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Mail, Trophy } from "lucide-react";
import Navbar from "../../components/Navbar.jsx";
import Card from "../../components/Card.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import Loading from "../../components/Loading.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import StatCard from "../../components/StatCard.jsx";
import {
  getProfile,
  getGameHistory,
  getRankings,
} from "../../services/profile.services.js";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
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
        console.error("Failed to fetch profile:", error);
        setError("We could not load your profile right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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
          <Loading message="Loading your profile..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader title="Profile" description="Keep track of your results, rankings, and game history." />

        {error ? <p className="mb-6 text-sm text-red-600">{error}</p> : null}

        <Card className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-semibold text-white">
              {profile?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{profile?.name || "Player"}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <Mail size={14} />
                  {profile?.email || "No email available"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <CalendarDays size={14} />
                  Joined {formatDate(profile?.createdAt || profile?.joinedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Current standing</p>
            <p className="mt-1">Global #{rankings?.globalRank ?? "—"}</p>
          </div>
        </Card>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Total Games" value={profile?.totalGames ?? 0} accent="indigo" />
          <StatCard label="Best Score" value={profile?.bestScore ?? 0} accent="emerald" />
          <StatCard label="Global Rank" value={rankings?.globalRank ?? "—"} accent="violet" />
          <StatCard label="Daily Rank" value={rankings?.dailyRank ?? "—"} accent="slate" />
          <StatCard label="Weekly Rank" value={rankings?.weeklyRank ?? "—"} accent="slate" />
        </div>

        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-50 p-2 text-amber-600">
              <Trophy size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-600">Game history</p>
              <h2 className="text-xl font-semibold text-slate-900">Your recent runs</h2>
            </div>
          </div>

          {history.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Clicks</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Session</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Played At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {history.map((game) => (
                    <tr key={game.id}>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">{game.score}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{game.clicks}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{game.gameSessionId}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{formatDate(game.playedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="No games yet" description="Your play history will appear here once you complete a round." />
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

export default Profile;