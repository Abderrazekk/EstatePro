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
    <section ref={ref} className="relative w-full bg-white pb-6 sm:pb-0">
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
      `}</style>

      {/* Top Hero Container - Golden Ratio Height for Mobile (min-h-[460px], pb-20) */}
      <div className="relative w-full bg-black rounded-b-[2.5rem] sm:rounded-b-[4rem] lg:rounded-b-[5rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.15)] pt-10 sm:pt-16 lg:pt-24 xl:pt-28 pb-20 sm:pb-24 lg:pb-44 xl:pb-52 min-h-[460px] sm:min-h-[580px] lg:min-h-[620px] xl:min-h-[680px] px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Background Image & Overlay Layers */}
        <img
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Tunisian Maison d'Hôte"
          className="absolute inset-0 w-full h-full object-cover object-center animate-subtle-zoom opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/10 backdrop-contrast-[1.05]" />

        {/* Hero Text & Actions */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black bg-white/95 backdrop-blur-2xl border border-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-2xl mb-4 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              The Sovereign Collection • 2026
            </span>
          </div>

          <h1
            className={`transition-all duration-1000 delay-150 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.12] tracking-tight mb-3 sm:mb-6`}
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
            } text-xs sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-light mb-5 sm:mb-8 max-w-xl`}
          >
            Curated guest houses, coastal palazzos, and desert retreats offering
            private architecture, bespoke service, and true slow living.
          </p>

          {/* Inline Mobile Action Buttons */}
          <div
            className={`transition-all duration-1000 delay-450 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } flex flex-row items-center gap-2 sm:gap-4`}
          >
            <Link
              to="/properties"
              className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-3 bg-white text-black px-3.5 py-3 sm:px-8 sm:py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:bg-neutral-100 transition-all duration-300 shadow-2xl hover:scale-105 whitespace-nowrap"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-xl border border-white/30 text-white px-3.5 py-3 sm:px-8 sm:py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
              >
                Join Private Access
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Floating Search Bar (Perfect 50/50 straddle over curved hero bottom) */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-4 -mt-12 sm:-mt-16 md:mt-0 md:translate-y-[-50%] transition-all duration-1000 delay-600 transform ${
          isVisible
            ? "opacity-100 translate-y-0 md:translate-y-[-50%]"
            : "opacity-0 translate-y-6 md:translate-y-[-30%]"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="bg-white p-2.5 sm:p-4 md:p-5 rounded-[1.8rem] sm:rounded-[2.5rem] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center"
        >
          {/* Destination Field */}
          <div className="md:col-span-5 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center bg-neutral-50 rounded-xl sm:rounded-2xl px-3.5 py-2.5 md:p-3.5 border border-neutral-200/70 hover:bg-white hover:shadow-md transition-all gap-2">
            <label className="flex items-center gap-1.5 shrink-0 text-[10px] font-black uppercase tracking-widest text-neutral-400 md:mb-1">
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Destination</span>
            </label>
            <input
              type="text"
              list="hero-tunisia-regions"
              placeholder="Ex: Djerba, Sidi Bou Said..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent font-bold text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none text-right md:text-left truncate"
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

          {/* Guests Field */}
          <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center bg-neutral-50 rounded-xl sm:rounded-2xl px-3.5 py-2.5 md:p-3.5 border border-neutral-200/70 hover:bg-white hover:shadow-md transition-all gap-2 relative">
            <label className="flex items-center gap-1.5 shrink-0 text-[10px] font-black uppercase tracking-widest text-neutral-400 md:mb-1">
              <Users className="w-3.5 h-3.5 text-black" />
              <span>Guests</span>
            </label>
            <div className="relative w-full flex items-center justify-end md:justify-start">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-black focus:outline-none cursor-pointer appearance-none text-right md:text-left pr-5 md:pr-6 truncate"
              >
                <option value="1">1 Guest (Private Stay)</option>
                <option value="2">2 Guests (Couple Escape)</option>
                <option value="4">4 Guests (Family Villa)</option>
                <option value="6">6+ Guests (Full Private Estate)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-0 md:right-1 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 mt-1 md:mt-0">
            <button
              type="submit"
              className="w-full py-3 md:py-0 md:h-full md:min-h-[58px] bg-black text-white hover:bg-neutral-800 rounded-xl sm:rounded-2xl font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-[1.01]"
            >
              <Search className="w-4 h-4" />
              <span>Search Stays</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
