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
                <a
                  href="#"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Contact Concierge
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  FAQ & Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-stone-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Terms of Service
                </a>
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

          {/* Social Icons (Restored Native SVGs) */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.23 0zm-2.73 19.883h-3.236v-5.089c0-1.213-.04-2.773-1.69-2.773-1.694 0-1.95 1.323-1.95 2.69v5.172H9.39V8.994h3.105v1.467h.044c.432-.82 1.487-1.685 3.062-1.685 3.276 0 3.88 2.156 3.88 4.958v6.149zM5.36 7.434c-1.044 0-1.89-.847-1.89-1.89s.846-1.89 1.89-1.89c1.043 0 1.89.847 1.89 1.89s-.847 1.89-1.89 1.89zm1.632 12.449H3.726V8.994h3.266v10.889z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
