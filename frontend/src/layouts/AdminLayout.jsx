// frontend/src/layouts/AdminLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Home,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
  Image,
  Megaphone, // Added Megaphone icon for Promotional Banner
} from "lucide-react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Manage Properties",
      path: "/admin/properties",
      icon: Home,
    },
    {
      label: "Manage Clients",
      path: "/admin/clients",
      icon: Users,
    },
    {
      label: "Enquiries",
      path: "/admin/enquiries",
      icon: MessageSquare,
    },
    {
      label: "Manage Sponsors",
      path: "/admin/sponsors",
      icon: Image,
    },
    {
      label: "Promo Banner", // Added new nav item
      path: "/admin/banner",
      icon: Megaphone,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-stone-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-stone-800 sticky top-0 z-30">
        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight"
        >
          <span className="text-white">Dar</span>
          <span className="text-stone-400">Hôte.</span>
          <span className="text-[10px] bg-stone-800 text-stone-300 uppercase tracking-widest px-2 py-0.5 rounded-full border border-stone-700 ml-1">
            Admin
          </span>
        </NavLink>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="p-2 text-stone-400 hover:text-white rounded-xl bg-stone-900 border border-stone-800 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-stone-950 text-stone-300 flex flex-col justify-between border-r border-stone-900 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header (Desktop) */}
          <div className="hidden md:flex items-center justify-between p-6 border-b border-stone-900">
            <NavLink
              to="/admin/dashboard"
              className="flex items-center gap-1 text-2xl font-extrabold tracking-tight"
            >
              <span className="text-white">Dar</span>
              <span className="text-stone-500">Hôte.</span>
            </NavLink>
            <span className="text-[10px] font-bold bg-stone-900 text-stone-400 border border-stone-800 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Portal
            </span>
          </div>

          {/* User Badge Mobile Header */}
          <div className="p-4 md:hidden border-b border-stone-900 bg-stone-900/50 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Admin Navigation
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-400 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-stone-900 shadow-md shadow-stone-950/20"
                        : "text-stone-400 hover:text-white hover:bg-stone-900/80"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Account Details */}
        <div className="p-4 border-t border-stone-900 bg-stone-950/50">
          <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800/80 mb-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
              <ShieldCheck className="w-4 h-4 text-stone-300" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Logged in as
              </p>
              <p className="text-sm font-bold text-white truncate">
                {user?.name || "Administrator"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 hover:bg-rose-950/40 text-stone-300 hover:text-rose-400 border border-stone-800 hover:border-rose-900/50 rounded-2xl text-sm font-bold transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl shadow-stone-950/20 space-y-6 text-center transform transition-all"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-900 border border-stone-200">
              <AlertTriangle className="w-6 h-6 text-stone-800" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Confirm Logout
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                Are you sure you want to exit your administrative session?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-rose-600 text-white font-bold rounded-full text-sm transition-colors shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
