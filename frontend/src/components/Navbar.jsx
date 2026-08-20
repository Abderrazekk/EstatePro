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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22 py-4">
            {/* Logo Mark */}
            <Link
              to="/"
              className="flex items-center gap-2 group shrink-0"
              onClick={closeMobile}
            >
              <div className="w-10 h-10 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-300">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-[#0A0A0A]">
                  BORGOGO
                  <span className="text-neutral-400 font-light">.TN</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-semibold -mt-1">
                  Maisons d'Hôte
                </span>
              </div>
            </Link>

            {/* Floating Navigation Pill */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-full border border-neutral-200/60 shadow-inner">
              <Link
                to="/"
                className="px-5 py-2 text-xs font-bold tracking-wide uppercase text-[#0A0A0A] bg-white rounded-full shadow-sm hover:shadow transition-all"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="px-5 py-2 text-xs font-bold tracking-wide uppercase text-neutral-600 hover:text-[#0A0A0A] rounded-full hover:bg-white/50 transition-all"
              >
                Our Homes
              </Link>
              {user && (
                <>
                  <Link
                    to="/wishlist"
                    className="px-5 py-2 text-xs font-bold tracking-wide uppercase text-neutral-600 hover:text-[#0A0A0A] rounded-full hover:bg-white/50 transition-all"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/enquiries"
                    className="px-5 py-2 text-xs font-bold tracking-wide uppercase text-neutral-600 hover:text-[#0A0A0A] rounded-full hover:bg-white/50 transition-all"
                  >
                    Enquiries
                  </Link>
                </>
              )}
            </nav>

            {/* Auth CTAs */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] bg-neutral-100 border border-neutral-200 rounded-full hover:bg-neutral-200 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="p-2.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-full transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0A] hover:bg-neutral-100 rounded-full transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#0A0A0A] rounded-full hover:bg-neutral-800 transition-all shadow-lg shadow-black/10 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobile}
                aria-label="Toggle navigation menu"
                className="p-2.5 text-[#0A0A0A] hover:bg-neutral-100 rounded-2xl focus:outline-none transition-colors border border-neutral-200"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Left-Side Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white flex flex-col justify-between border-r border-neutral-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white font-black text-base">
                B
              </div>
              <span className="text-lg font-black tracking-tighter text-[#0A0A0A]">
                BORGOGO.TN
              </span>
            </Link>
            <button
              onClick={closeMobile}
              className="p-2 text-neutral-400 hover:text-[#0A0A0A] rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#0A0A0A] hover:bg-neutral-100 transition-all"
            >
              <HomeIcon className="w-4 h-4 text-neutral-400" />
              <span>Home</span>
            </Link>
            <Link
              to="/properties"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#0A0A0A] hover:bg-neutral-100 transition-all"
            >
              <Building className="w-4 h-4 text-neutral-400" />
              <span>Our Homes</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#0A0A0A] hover:bg-neutral-100 transition-all"
                >
                  <Heart className="w-4 h-4 text-neutral-400" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/enquiries"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#0A0A0A] hover:bg-neutral-100 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-neutral-400" />
                  <span>My Enquiries</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#0A0A0A] hover:bg-neutral-100 transition-all"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
          {user ? (
            <button
              onClick={() => {
                closeMobile();
                setShowLogoutConfirm(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-neutral-100 hover:bg-red-50 text-neutral-800 hover:text-red-600 border border-neutral-200 rounded-2xl text-sm font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-neutral-100 border border-neutral-200 text-[#0A0A0A] rounded-2xl text-sm font-bold transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-2xl text-sm font-bold transition-all shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-neutral-200 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-[#0A0A0A] border border-neutral-200">
              <AlertTriangle className="w-6 h-6 text-neutral-800" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
                Confirm Sign Out
              </h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                Are you sure you want to log out of Borgogo?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-[#0A0A0A] hover:bg-red-600 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
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
