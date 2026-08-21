import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
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
  Globe,
} from "lucide-react";

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63 2.93 2.93 0 0 1 .88.13V9.43a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 15.69a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation("navbar");
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const currentLang = i18n.language?.slice(0, 2) === "it" ? "it" : "en";

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const desktopLinkClass = (path) =>
    isActive(path)
      ? "px-5 py-2 text-xs font-bold uppercase tracking-wider text-black rounded-full bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      : "px-5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white/50";

  const mobileLinkClass = (path) =>
    isActive(path)
      ? "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-black bg-neutral-100 transition-all"
      : "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-all";

  const LanguageSwitch = () => (
    <div className="flex items-center bg-neutral-100 border border-neutral-200/80 p-1 rounded-full shadow-inner">
      <Globe className="w-3.5 h-3.5 text-neutral-500 ml-1.5 mr-1" />
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-2.5 py-1 text-[10px] font-extrabold tracking-wider rounded-full transition-all ${
          currentLang === "en"
            ? "bg-black text-white shadow-sm"
            : "text-neutral-500 hover:text-black"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage("it")}
        className={`px-2.5 py-1 text-[10px] font-extrabold tracking-wider rounded-full transition-all ${
          currentLang === "it"
            ? "bg-black text-white shadow-sm"
            : "text-neutral-500 hover:text-black"
        }`}
      >
        IT
      </button>
    </div>
  );

  return (
    <>
      {/* Top Architectural Notice Bar with Socials */}
      <div className="bg-black text-white py-2.5 px-4 border-b border-neutral-800 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-[9px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase truncate overflow-hidden">
          <Sparkles className="w-3 h-3 text-neutral-400 animate-pulse shrink-0" />
          <span className="truncate">
            {t("notice.tagline")}{" "}
            <span className="hidden sm:inline">{t("notice.location")}</span>
          </span>
          <span className="hidden md:inline text-neutral-600 shrink-0">|</span>
          <span className="hidden md:inline text-neutral-400 lowercase font-serif italic tracking-normal text-xs shrink-0">
            {t("notice.subtitle")}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 shrink-0 ml-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      {/* Floating Glass Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-neutral-200/80 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22 py-4">
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

            <nav className="hidden md:flex items-center justify-center bg-neutral-100/80 p-1.5 rounded-full border border-neutral-200/60 shadow-inner">
              <Link to="/" className={desktopLinkClass("/")}>
                {t("links.home")}
              </Link>
              <Link
                to="/properties"
                className={desktopLinkClass("/properties")}
              >
                {t("links.ourStays")}
              </Link>

              {user && (
                <>
                  <Link
                    to="/wishlist"
                    className={desktopLinkClass("/wishlist")}
                  >
                    {t("links.wishlist")}
                  </Link>
                  <Link
                    to="/enquiries"
                    className={desktopLinkClass("/enquiries")}
                  >
                    {t("links.myEnquiries")}
                  </Link>
                  <Link to="/profile" className={desktopLinkClass("/profile")}>
                    {t("links.profile")}
                  </Link>
                </>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <LanguageSwitch />
              {user ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-black bg-neutral-100 border border-neutral-300 rounded-full hover:bg-neutral-200 transition-all duration-300 hover:shadow-md"
                >
                  {t("auth.signOut")}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-black hover:bg-neutral-100 rounded-full transition-all duration-300"
                  >
                    {t("auth.signIn")}
                  </Link>
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-widest text-white bg-black rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    <span>{t("auth.signUp")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitch />
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

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 md:hidden transition-opacity duration-300"
          onClick={closeMobile}
        />
      )}

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
            <Link to="/" onClick={closeMobile} className={mobileLinkClass("/")}>
              <HomeIcon
                className={`w-4 h-4 ${isActive("/") ? "text-black" : "text-neutral-400"}`}
              />
              <span>{t("links.home")}</span>
            </Link>
            <Link
              to="/properties"
              onClick={closeMobile}
              className={mobileLinkClass("/properties")}
            >
              <Building
                className={`w-4 h-4 ${isActive("/properties") ? "text-black" : "text-neutral-400"}`}
              />
              <span>{t("links.ourStays")}</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/wishlist"
                  onClick={closeMobile}
                  className={mobileLinkClass("/wishlist")}
                >
                  <Heart
                    className={`w-4 h-4 ${isActive("/wishlist") ? "text-black" : "text-neutral-400"}`}
                  />
                  <span>{t("links.wishlist")}</span>
                </Link>
                <Link
                  to="/enquiries"
                  onClick={closeMobile}
                  className={mobileLinkClass("/enquiries")}
                >
                  <MessageSquare
                    className={`w-4 h-4 ${isActive("/enquiries") ? "text-black" : "text-neutral-400"}`}
                  />
                  <span>{t("links.myEnquiries")}</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className={mobileLinkClass("/profile")}
                >
                  <User
                    className={`w-4 h-4 ${isActive("/profile") ? "text-black" : "text-neutral-400"}`}
                  />
                  <span>{t("links.profile")}</span>
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
              <span>{t("auth.signOut")}</span>
            </button>
          ) : (
            <div className="space-y-2.5">
              <Link
                to="/login"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-neutral-100 border border-neutral-300 text-black rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>{t("auth.signIn")}</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobile}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-black/10"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t("auth.signUp")}</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

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
                {t("logoutModal.title")}
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                {t("logoutModal.message")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-colors border border-neutral-200"
              >
                {t("logoutModal.cancel")}
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3.5 px-4 bg-black hover:bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-colors shadow-lg shadow-black/20"
              >
                {t("logoutModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
