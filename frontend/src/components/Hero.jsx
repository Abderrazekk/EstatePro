import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, MapPin, Users, ArrowRight, ChevronDown } from "lucide-react";

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible];
};

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ref, isVisible] = useScrollReveal(0.1);

  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (location.trim()) query.append("location", location.trim());
    if (guests) query.append("guests", guests);
    navigate(`/properties?${query.toString()}`);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-white pb-16"
    >
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
      `}</style>

      {/* Full-width image frame touching the navbar with bottom-only rounded corners */}
      <div className="absolute inset-x-0 top-0 bottom-0 rounded-b-[3rem] sm:rounded-b-[4.5rem] lg:rounded-b-[6rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.18)] bg-black">
        <img
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Tunisian Maison d'Hôte"
          className="w-full h-full object-cover object-center animate-subtle-zoom opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/10 backdrop-contrast-[1.05]" />
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Text Overlay */}
        <div className="relative z-10 pt-16 sm:pt-20 pb-16 sm:pb-24 px-2 sm:px-6 lg:px-8 max-w-4xl">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-black bg-white/95 backdrop-blur-2xl border border-white px-5 py-2.5 rounded-full shadow-2xl mb-8">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              The Sovereign Collection • 2026
            </span>
          </div>

          <h1
            className={`transition-all duration-1000 delay-150 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6`}
          >
            Refined Living in <br className="hidden sm:block" />
            <span className="font-serif italic font-normal text-neutral-300">
              Tunisia’s Most Sacred
            </span>{" "}
            Sanctuaries.
          </h1>

          <p
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } text-base sm:text-lg text-neutral-200 leading-relaxed font-light mb-10 max-w-xl`}
          >
            Curated guest houses, coastal palazzos, and desert retreats offering
            private architecture, bespoke service, and true slow living.
          </p>

          <div
            className={`transition-all duration-1000 delay-450 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } flex flex-wrap items-center gap-4`}
          >
            <Link
              to="/properties"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                Join Private Access
              </Link>
            )}
          </div>
        </div>

        {/* Floating Search Capsule */}
        <div
          className={`relative z-20 -mb-12 mt-4 max-w-5xl mx-auto w-full px-4 transition-all duration-1000 delay-600 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-3xl p-4 sm:p-5 rounded-[2.5rem] border border-neutral-200/80 shadow-[0_30px_90px_rgba(0,0,0,0.18)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            {/* Typed Destination Input */}
            <div className="md:col-span-5 relative bg-neutral-50/90 rounded-2xl p-3.5 border border-neutral-200/60 hover:bg-white hover:shadow-md transition-all">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-black" />
                Destination
              </label>
              <input
                type="text"
                list="hero-tunisia-regions"
                placeholder="Ex: Djerba, Sidi Bou Said..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent font-bold text-sm text-black placeholder:text-neutral-400 focus:outline-none"
              />
              <datalist id="hero-tunisia-regions">
                <option value="Sidi Bou Said" />
                <option value="Djerba" />
                <option value="Hammamet" />
                <option value="Tozeur" />
                <option value="Tunis Medina" />
                <option value="Mahdia" />
              </datalist>
            </div>

            {/* Guests Picker */}
            <div className="md:col-span-4 relative bg-neutral-50/90 rounded-2xl p-3.5 border border-neutral-200/60 hover:bg-white hover:shadow-md transition-all">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-black" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent font-bold text-sm text-black focus:outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="1">1 Guest (Private Stay)</option>
                <option value="2">2 Guests (Couple Escape)</option>
                <option value="4">4 Guests (Family Villa)</option>
                <option value="6">6+ Guests (Full Private Estate)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 bottom-4 pointer-events-none" />
            </div>

            {/* Search Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full h-full min-h-[58px] bg-black text-white hover:bg-neutral-800 rounded-2xl font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Search Stays</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
