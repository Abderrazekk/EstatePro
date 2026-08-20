import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Home as HomeIcon,
  Building,
  Heart,
  MessageSquare,
  User,
  LogOut,
  LogIn,
  UserPlus,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Top Architectural Notice Bar */}
      <div className="bg-black text-white text-[11px] font-medium tracking-[0.25em] uppercase py-2 px-4 text-center border-b border-neutral-800 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-neutral-400 animate-pulse" />
        <span>Curated Luxury Guesthouses Across Tunisia</span>
        <span className="hidden sm:inline text-neutral-600">|</span>
        <span className="hidden sm:inline text-neutral-400 lowercase font-serif italic tracking-normal text-xs">
          Authentic Escapes Guaranteed
        </span>
      </div>

      {/* Floating Glass Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-neutral-200/80 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22 py-4">
            {/* Brand Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tighter shrink-0 transition-transform duration-300 hover:scale-[1.02]"
              onClick={closeMobile}
            >
              <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-xl font-serif text-xl shadow-lg shadow-black/20 group-hover:bg-neutral-800 transition-colors">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-black font-extrabold leading-none tracking-tight">
                  BORGOGO<span className="text-neutral-400">.</span>
                </span>
                <span className="text-[9px] tracking-[0.3em] font-medium text-neutral-400 uppercase leading-tight font-sans">
                  Maisons d'Hôte
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Link Capsule */}
            <nav className="hidden md:flex items-center justify-center bg-neutral-100/80 p-1.5 rounded-full border border-neutral-200/60 shadow-inner">
              <Link
                to="/"
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black rounded-full bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white/50"
              >
                Our Stays
              </Link>

              {user && (
                <>
                  <Link
                    to="/wishlist"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white/50"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/enquiries"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white/50"
                  >
                    My Enquiries
                  </Link>
                  <Link
                    to="/profile"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white/50"
                  >
                    Profile
                  </Link>
                </>
              )}
            </nav>

            {/* Right Action Bar */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {user ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-black bg-neutral-100 border border-neutral-300 rounded-full hover:bg-neutral-200 transition-all duration-300 hover:shadow-md"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-black hover:bg-neutral-100 rounded-full transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-white bg-black rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobile}
                aria-label="Toggle navigation menu"
                className="p-3 text-black bg-neutral-100 hover:bg-black hover:text-white rounded-2xl focus:outline-none transition-all duration-300 border border-neutral-200 shadow-sm"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 md:hidden transition-opacity duration-300"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Left-Side Modern Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white flex flex-col justify-between border-r border-neutral-200 shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            >
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg font-serif">
                B
              </div>
              <span className="text-black font-extrabold">BORGOGO.</span>
            </Link>
            <button
              onClick={closeMobile}
              className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-5 space-y-2">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-black hover:bg-neutral-100 transition-all"
            >
              <HomeIcon className="w-4 h-4 text-black" />
              <span>Home</span>
            </Link>
            <Link
              to="/properties"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-all"
            >
              <Building className="w-4 h-4 text-neutral-400" />
              <span>Our Stays</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-all"
                >
                  <Heart className="w-4 h-4 text-neutral-400" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/enquiries"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-neutral-400" />
                  <span>My Enquiries</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-all"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="p-5 border-t border-neutral-200 bg-neutral-50/80">
          {user ? (
            <button
              onClick={() => {
                closeMobile();
                setShowLogoutConfirm(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-white hover:bg-rose-50 text-black hover:text-rose-600 border border-neutral-300 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="space-y-2.5">
              <Link
                to="/login"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-black rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-black/10"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* High-Contrast Modal Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full border border-neutral-200 shadow-2xl space-y-6 text-center transform hover:scale-[1.01] transition-transform"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-black border border-neutral-200 shadow-inner">
              <AlertTriangle className="w-7 h-7 text-black" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-black tracking-tight font-serif">
                Sign Out?
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Are you sure you wish to exit your Borgogo session?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-colors border border-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3.5 px-4 bg-black hover:bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-colors shadow-lg shadow-black/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
