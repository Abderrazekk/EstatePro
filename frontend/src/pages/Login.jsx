import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const userData = await login(email, password);
      // Route admin users to their dashboard, otherwise to the homepage
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 animate-fade-in-up">
        <div className="w-full max-w-lg">
          {/* Logo / Branding */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block text-3xl font-extrabold tracking-tight"
            >
              <span className="text-gray-900">Dar</span>
              <span className="text-stone-400">Hôte.</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 tracking-tight">
              Welcome back
            </h2>
            <p className="text-stone-500 mt-2 font-light text-sm">
              Please sign in to access your account.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 sm:p-10 border border-stone-200/80">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900 placeholder-stone-400 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900 placeholder-stone-400 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-stone-800 text-white py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <p className="text-center text-stone-500 mt-8 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-900 font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
