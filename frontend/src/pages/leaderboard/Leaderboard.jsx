import { useEffect, useState } from "react";
import {
  getGlobalLeaderboard,
  getDailyLeaderboard,
  getWeeklyLeaderboard,
} from "../../services/leaderboard.services.js";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [type, setType] = useState("global");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);

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

        setLeaderboard(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [type]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>

      <button onClick={() => setType("global")}>
        Global
      </button>

      <button onClick={() => setType("daily")}>
        Daily
      </button>

      <button onClick={() => setType("weekly")}>
        Weekly
      </button>

      <div>
        {leaderboard.map((player) => (
          <div key={player.user.id}>
            <p>Rank: {player.rank}</p>
            <p>Name: {player.user.name}</p>
            <p>Score: {player.score}</p>
            <p>Clicks: {player.clicks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;