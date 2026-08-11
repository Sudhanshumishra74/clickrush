import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Clock3, PlayCircle, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";

const featureCards = [
  { title: "60-Second Challenge", description: "Race the clock and maximize every second of momentum.", icon: Clock3 },
  { title: "Global Leaderboard", description: "Compete with players from around the world and climb the ranks.", icon: Trophy },
  { title: "Personal Bests", description: "Track your highest scores and turn each run into a better one.", icon: BarChart3 },
  { title: "Fast Reflexes", description: "Train your consistency and sharpen your reaction speed over time.", icon: Zap },
];

const stats = [
  { value: "60s", label: "Challenge Duration" },
  { value: "1 Click", label: "Every Click Counts" },
  { value: "Global", label: "Leaderboard" },
  { value: "Daily", label: "New Attempts" },
];

const steps = [
  { title: "Start the challenge", description: "Launch a fresh 60-second round in a single tap." },
  { title: "Click fast", description: "Keep your focus and build momentum through the timer." },
  { title: "Save your result", description: "Lock in your score and let the platform track your progress." },
  { title: "Compare your score", description: "Watch your rank rise against other players in the leaderboard." },
];

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.75)]"
        >
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.05fr,0.95fr] lg:px-10 lg:py-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200">
                <Sparkles size={16} />
                Premium reflex challenge
              </div>

              <div className="mt-6 space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  How Fast Can You Click?
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Put your reflexes to the test in a focused 60-second challenge. Track your results, climb the leaderboard, and come back for another run.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <>
                    <Link
                      to="/game"
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                      Start Clicking
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/dashboard"
                      className="rounded-full border border-slate-700 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/leaderboard"
                      className="rounded-full border border-slate-700 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Leaderboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                      Login
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-full border border-slate-700 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>

              {user ? (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-sm text-slate-400">Welcome back</p>
                  <p className="mt-1 text-lg font-semibold text-white">{user?.name || "Player"}</p>
                </div>
              ) : null}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-indigo-950/20"
            >
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm text-slate-400">Live preview</p>
                  <p className="text-lg font-semibold text-white">Game ready</p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  Ready?
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Timer</p>
                  <motion.p
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-2 text-5xl font-semibold tracking-tight text-white"
                  >
                    60
                  </motion.p>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-slate-500">Seconds</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Clicks</p>
                  <motion.p
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-2 text-5xl font-semibold tracking-tight text-white"
                  >
                    000
                  </motion.p>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-slate-500">Clicks</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center rounded-[28px] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 p-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white text-2xl font-semibold text-slate-900 shadow-lg shadow-indigo-950/30"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Target size={26} />
                    <span>CLICK</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.3 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-2xl border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        <section className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Why players love it</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">A sharp, focused challenge built for speed.</h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              ClickRush keeps the experience simple, polished, and competitive—so every run feels clear, fast, and worth sharing.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                <Card className="h-full space-y-3 rounded-2xl border-slate-200 bg-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">One minute. One score. Pure focus.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  <PlayCircle size={16} />
                  Step 0{index + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.3 }}
          className="rounded-[28px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">Ready to beat your best?</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">One minute. One score. How fast are your reflexes?</h2>
            </div>
            <Link to="/game" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Play ClickRush
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Home;