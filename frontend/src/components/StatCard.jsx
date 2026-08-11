function StatCard({ label, value, accent = "indigo" }) {
  const accentClasses = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
    violet: "text-violet-600 bg-violet-50",
    slate: "text-slate-600 bg-slate-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-full p-2 ${accentClasses[accent]}`}>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default StatCard;
