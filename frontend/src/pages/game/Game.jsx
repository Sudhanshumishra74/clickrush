import { useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Target, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Card from "../../components/Card.jsx";
import PageHeader from "../../components/PageHeader.jsx";

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
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

   const finishStarted = useRef(false);

const handleStartGame = async () => {
  try {
    setIsStarting(true);
    setError("");

    const response = await startGame();

    finishStarted.current = false;

    setGameSession(response.data);
    setClicks(0);
    setTimeLeft(60);
    setGameStarted(true);
    setGameCompleted(false);
    setGameResult(null);
  } catch (error) {
   
    setError("Failed to start game. Please try again.");
  } finally {
    setIsStarting(false);
  }
};


const handleClick = () => {
  if (!gameStarted || gameCompleted || timeLeft <= 0) {
    return;
  }

  setClicks((prev) => prev + 1);
};


useEffect(() => {
  if (!gameStarted || gameCompleted) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [gameStarted, gameCompleted]);



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
    if (finishStarted.current) {
      return;
    }

    finishStarted.current = true;

    try {
      

      const completeResponse = await completeGame(
        gameSession.id
      );

     
      const result = await submitGameResult(
        gameSession.id,
        clicks
      );

      

      setGameResult(result.data);
      setGameCompleted(true);
    } catch (error) {
      console.error("GAME SAVE ERROR:", error);
      finishStarted.current = false;
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="60-second challenge"
          description="Start a round and click as fast as you can before the timer hits zero."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                <Clock3 size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-600">Game status</p>
                <h2 className="text-xl font-semibold text-slate-900">Stay focused</h2>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                {!gameStarted
                  ? "Tap into the challenge to start a fresh 60-second run."
                  : gameCompleted
                    ? "Your run has finished. Review your score and jump back in."
                    : "The clock is ticking. Keep your rhythm steady and stay sharp."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Time left</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{timeLeft}s</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Clicks</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{clicks}</p>
              </div>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </Card>

          <Card className="flex flex-col items-center justify-center gap-6 p-8">
            {!gameStarted && (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Target size={24} />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Ready to begin?</h2>
                <p className="mt-2 max-w-md text-sm text-slate-600">
                  Click as many times as you can in the next 60 seconds and see how your score compares against other players.
                </p>
                <button
                  onClick={handleStartGame}
                  disabled={isStarting}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                >
                  {isStarting ? "Starting..." : "Start Game"}
                  {!isStarting ? <ArrowRight size={16} /> : null}
                </button>
              </div>
            )}

            {gameStarted && !gameCompleted && (
              <>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleClick}
                  className="flex h-56 w-56 items-center justify-center rounded-full bg-indigo-600 text-3xl font-semibold text-white shadow-lg transition hover:bg-indigo-700 sm:h-72 sm:w-72"
                >
                  CLICK
                </motion.button>
                <p className="text-sm text-slate-500">Tap the button as fast as you can before the timer reaches zero.</p>
              </>
            )}

            {gameCompleted && gameResult && (
              <div className="w-full text-center">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-2xl font-semibold text-slate-900">Round complete</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Clicks</p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">{gameResult.clicks}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Score</p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">{gameResult.score}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button onClick={handleStartGame} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                      <RotateCcw size={16} />
                      Play Again
                    </button>
                    <button onClick={() => navigate("/dashboard")} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Game;