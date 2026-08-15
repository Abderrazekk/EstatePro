import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Mail, Lock, Phone, AlertCircle, ArrowRight } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, googleLogin } = useAuth(); // Destructure googleLogin
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await register(name, email, phone, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // NEW: Google Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 animate-fade-in-up">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block text-3xl font-extrabold tracking-tight"
            >
              <span className="text-gray-900">Dar</span>
              <span className="text-stone-400">Hôte.</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 tracking-tight">
              Create your account
            </h2>
            <p className="text-stone-500 mt-2 font-light text-sm">
              Begin your luxury stay experience across Tunisia.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 sm:p-10 border border-stone-200/80">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User, Phone, Email, Passwords inputs... */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900 placeholder-stone-400 text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900 placeholder-stone-400 text-sm"
                    placeholder="+216 12 345 678"
                  />
                </div>
              </div>
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
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900 placeholder-stone-400 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-stone-800 text-white py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                <span>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Google Divider */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-stone-200"></div>
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            {/* Google Registration Button */}
            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Authentication Failed")}
                useOneTap
                shape="pill"
                text="signup_with"
              />
            </div>
          </div>

          <p className="text-center text-stone-500 mt-8 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-900 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
