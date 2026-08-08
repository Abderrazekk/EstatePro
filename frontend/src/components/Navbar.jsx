import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo (left) */}
            <Link
              to="/"
              className="flex items-center gap-1 text-2xl font-bold shrink-0"
              onClick={closeMobile}
            >
              <span className="text-gray-900">Estate</span>
              <span className="text-blue-500">Pro</span>
            </Link>

            {/* Centered desktop navigation links */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-8">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  Browse Properties
                </Link>

                {user && (
                  <>
                    <Link
                      to="/wishlist"
                      className="text-gray-600 hover:text-blue-600 transition font-medium"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/enquiries"
                      className="text-gray-600 hover:text-blue-600 transition font-medium"
                    >
                      My Enquiries
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-blue-600 transition font-medium"
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
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition shadow-md shadow-blue-200"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobile}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {mobileOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (unchanged) */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
            <div className="flex flex-col gap-3 mt-3">
              <Link
                to="/"
                onClick={closeMobile}
                className="text-gray-600 font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/properties"
                onClick={closeMobile}
                className="text-gray-600 font-medium py-2"
              >
                Browse Properties
              </Link>

              {user ? (
                <>
                  <Link
                    to="/wishlist"
                    onClick={closeMobile}
                    className="text-gray-600 font-medium py-2"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/enquiries"
                    onClick={closeMobile}
                    className="text-gray-600 font-medium py-2"
                  >
                    My Enquiries
                  </Link>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="text-gray-600 font-medium py-2"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      closeMobile();
                      setShowLogoutConfirm(true);
                    }}
                    className="mt-2 w-full text-left px-4 py-2 text-red-600 border border-red-200 rounded-full font-medium hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="w-full text-center px-5 py-2 text-gray-700 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="w-full text-center px-5 py-2 text-white bg-blue-500 rounded-full font-medium hover:bg-blue-600 transition shadow-md shadow-blue-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal (unchanged) */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sign out
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to log out? You can always log back in.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition shadow-md shadow-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
