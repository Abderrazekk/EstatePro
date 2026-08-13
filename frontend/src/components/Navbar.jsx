import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Home,
  Building,
  Heart,
  MessageSquare,
  User,
  LogOut,
  LogIn,
  UserPlus,
  AlertTriangle,
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
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo (left) */}
            <Link
              to="/"
              className="flex items-center gap-1 text-2xl font-extrabold tracking-tight shrink-0"
              onClick={closeMobile}
            >
              <span className="text-gray-900">Dar</span>
              <span className="text-stone-400">Hôte.</span>
            </Link>

            {/* Centered desktop navigation links */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-8">
                <Link
                  to="/"
                  className="text-sm text-stone-600 hover:text-gray-900 transition-colors font-semibold"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className="text-sm text-stone-600 hover:text-gray-900 transition-colors font-semibold"
                >
                  Our Homes
                </Link>

                {user && (
                  <>
                    <Link
                      to="/wishlist"
                      className="text-sm text-stone-600 hover:text-gray-900 transition-colors font-semibold"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/enquiries"
                      className="text-sm text-stone-600 hover:text-gray-900 transition-colors font-semibold"
                    >
                      My Enquiries
                    </Link>
                    <Link
                      to="/profile"
                      className="text-sm text-stone-600 hover:text-gray-900 transition-colors font-semibold"
                    >
                      Profile
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right section (auth buttons) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {user ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-5 py-2.5 text-sm font-bold text-stone-800 bg-stone-100 border border-stone-200 rounded-full hover:bg-stone-200 transition-all"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-stone-100 rounded-full transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-stone-800 transition-all shadow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobile}
                aria-label="Toggle navigation menu"
                className="p-2 text-gray-900 hover:bg-stone-100 rounded-2xl focus:outline-none transition-colors border border-stone-200"
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
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Left-Side Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between border-r border-stone-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-100">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-1 text-2xl font-extrabold tracking-tight"
            >
              <span className="text-gray-900">Dar</span>
              <span className="text-stone-400">Hôte.</span>
            </Link>
            <button
              onClick={closeMobile}
              className="p-2 text-stone-400 hover:text-gray-900 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-gray-900 transition-all"
            >
              <Home className="w-4 h-4 text-stone-400" />
              <span>Home</span>
            </Link>
            <Link
              to="/properties"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-gray-900 transition-all"
            >
              <Building className="w-4 h-4 text-stone-400" />
              <span>Our Homes</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-gray-900 transition-all"
                >
                  <Heart className="w-4 h-4 text-stone-400" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/enquiries"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-gray-900 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-stone-400" />
                  <span>My Enquiries</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-gray-900 transition-all"
                >
                  <User className="w-4 h-4 text-stone-400" />
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50">
          {user ? (
            <button
              onClick={() => {
                closeMobile();
                setShowLogoutConfirm(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 border border-stone-200 rounded-2xl text-sm font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-stone-100 border border-stone-200 text-gray-900 rounded-2xl text-sm font-bold transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-900 hover:bg-stone-800 text-white rounded-2xl text-sm font-bold transition-all shadow-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl space-y-6 text-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-900 border border-stone-200">
              <AlertTriangle className="w-6 h-6 text-stone-800" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Confirm Sign Out
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                Are you sure you want to log out? You can sign back in anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-rose-600 text-white font-bold rounded-full text-sm transition-colors shadow-md"
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
