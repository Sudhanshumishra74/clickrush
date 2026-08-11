import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  startGame,
  completeGame,
  submitGameResult,
} from "../../services/game.services.js";

function Game() {
  const navigate = useNavigate();

  const [gameSession, setGameSession] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const handleStartGame = async () => {
    try {
      const response = await startGame();

      setGameSession(response.data);
      setClicks(0);
      setTimeLeft(60);
      setGameStarted(true);
      setGameCompleted(false);
      setGameResult(null);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const handleClick = () => {
    if (!gameStarted || gameCompleted) {
      return;
    }

    setClicks((prev) => prev + 1);
  };

  useEffect(() => {
    if (!gameStarted || gameCompleted) {
      return;
    }

    if (timeLeft === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, gameCompleted, timeLeft]);

  useEffect(() => {
    if (
      !gameStarted ||
      gameCompleted ||
      timeLeft !== 0 ||
      !gameSession
    ) {
      return;
    }

    const finishGame = async () => {
      try {
        await completeGame(gameSession.id);

        const result = await submitGameResult(
          gameSession.id,
          clicks
        );

        setGameResult(result.data);
        setGameCompleted(true);
      } catch (error) {
        console.error("Failed to complete game:", error);
      }
    };

    finishGame();
  }, [
    timeLeft,
    gameStarted,
    gameCompleted,
    gameSession,
    clicks,
  ]);

  return (
    <div>
      <h1>ClickRush</h1>

      {!gameStarted && (
        <button onClick={handleStartGame}>
          Start Game
        </button>
      )}

      {gameStarted && (
        <>
          <p>Time: {timeLeft}</p>

          <p>Clicks: {clicks}</p>

          {!gameCompleted && (
            <button onClick={handleClick}>
              CLICK
            </button>
          )}

          {gameCompleted && gameResult && (
            <div>
              <h2>Game Over</h2>

              <p>
                Clicks: {gameResult.clicks}
              </p>

              <p>
                Score: {gameResult.score}
              </p>

              <button onClick={handleStartGame}>
                Play Again
              </button>

              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game;