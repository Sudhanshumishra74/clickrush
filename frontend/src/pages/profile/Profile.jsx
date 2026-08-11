import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [
          profileResponse,
          historyResponse,
          rankingsResponse,
        ] = await Promise.all([
          getProfile(),
          getGameHistory(),
          getRankings(),
        ]);

        setProfile(profileResponse.data);
        setHistory(historyResponse.data);
        setRankings(rankingsResponse.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>

      <h2>{profile?.name}</h2>

      <p>Email: {profile?.email}</p>

      <p>
        Total Games: {profile?.totalGames}
      </p>

      <p>
        Best Score: {profile?.bestScore}
      </p>

      <h2>Rankings</h2>

      <p>
        Global Rank: {rankings?.globalRank}
      </p>

      <p>
        Daily Rank: {rankings?.dailyRank}
      </p>

      <p>
        Weekly Rank: {rankings?.weeklyRank}
      </p>

      <h2>Game History</h2>

      {history.map((game) => (
        <div key={game.id}>
          <p>Score: {game.score}</p>
          <p>Clicks: {game.clicks}</p>
          <p>
            Game Session: {game.gameSessionId}
          </p>
          <p>
            Played At: {game.playedAt}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Profile;