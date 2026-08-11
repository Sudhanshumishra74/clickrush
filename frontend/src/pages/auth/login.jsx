import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAuth } from "../../context/authContext.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   console.log("🔥 LOGIN RENDERED");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.signupSuccess ? "Account created successfully. Please sign in." : "";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await handleLogin(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("We could not sign you in. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium text-indigo-600">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to ClickRush</h1>
          <p className="mt-2 text-sm text-slate-600">Continue your streak and jump back into the challenge.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Mail size={16} className="text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-0 bg-transparent outline-none"
                placeholder="name@example.com"
                required
              />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Lock size={16} className="text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-0 bg-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {isSubmitting ? "Signing in..." : "Login"}
            {!isSubmitting ? <ArrowRight size={16} /> : null}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New here? <Link to="/signup" className="font-semibold text-indigo-600">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;