import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 pt-20 pb-8 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section – grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800/50">
          {/* Brand column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center gap-1 text-3xl font-extrabold tracking-tight"
            >
              <span className="text-white">Dar</span>
              <span className="text-stone-500">Hôte.</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 max-w-xs font-light">
              Your gateway to authentic Tunisian escapes. We connect discerning
              travelers with exceptional guesthouses, villas, and serene
              retreats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/properties"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Our Homes
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Join DarHôte
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
              Get in Touch
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors duration-300" />
                </div>
                <span className="text-stone-400 mt-1.5 leading-relaxed">
                  123 Avenue Habib Bourguiba, Tunis 1000, Tunisia
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <Phone className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors duration-300" />
                </div>
                <span className="text-stone-400">+216 71 234 567</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <Mail className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors duration-300" />
                </div>
                <span className="text-stone-400">bonjour@darhote.tn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-stone-600 font-light">
            &copy; {currentYear} DarHôte. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            
            {/* FACEBOOK */}
            <a
              href="#" /* <-- INSERT FACEBOOK LINK HERE (e.g., "https://facebook.com/darhote") */
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a
              href="#" /* <-- INSERT INSTAGRAM LINK HERE (e.g., "https://instagram.com/darhote") */
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TIKTOK */}
            <a
              href="#" /* <-- INSERT TIKTOK LINK HERE (e.g., "https://tiktok.com/@darhote") */
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.41-2.9 5.82-1.73 1.39-4.08 1.95-6.22 1.5-2.18-.46-4.06-1.92-5.06-3.89-1-1.98-1.07-4.4-.18-6.42 1-2.29 3.25-4.06 5.75-4.41 1.2-.17 2.43-.07 3.59.3v4.11c-.76-.23-1.57-.31-2.37-.16-.86.16-1.64.67-2.13 1.39-.49.71-.65 1.64-.44 2.49.21.84.8 1.56 1.56 1.95.76.39 1.68.45 2.49.19.82-.25 1.49-.86 1.84-1.63.35-.77.42-1.66.38-2.5v-15.2z"/>
              </svg>
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;