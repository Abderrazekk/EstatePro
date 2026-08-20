import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, UserPlus, Sparkles } from "lucide-react";

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
  const [ref, isVisible] = useScrollReveal(0.1);
  const [currentBg, setCurrentBg] = useState(0);

  // Background Carousel Images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  ];

  // Crossfade Animation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Cinematic Background Carousel with Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="Luxury Tunisian Stay"
              className={`w-full h-full object-cover transform-gpu transition-transform duration-[10000ms] ease-out ${
                index === currentBg ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}
        {/* Dark Gradient Overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center mt-12">
        {/* Top Tagline Pill */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-black uppercase tracking-[0.25em] text-white shadow-xl mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Curated Tunisian Sanctuary Escapes
          </span>
        </div>

        {/* Editorial Heading */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] max-w-5xl mb-8 drop-shadow-2xl transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Redefining the Art of{" "}
          <span className="font-serif italic font-normal text-amber-50">
            Sanctuary
          </span>{" "}
          Living.
        </h1>

        <p
          className={`text-lg sm:text-xl text-neutral-200 font-light max-w-2xl leading-relaxed mb-12 drop-shadow-md transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Discover Tunisia's most exclusive *Maisons d'Hôte*. From seaside
          authentic palazzos to desert retreats, experience luxury grounded in
          heritage.
        </p>

        {/* Dynamic Auth-based CTA Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/properties"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-[#0A0A0A] font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Explore Stays</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {!user && (
            <Link
              to="/register"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/30 font-extrabold text-xs uppercase tracking-widest hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>Register</span>
            </Link>
          )}
        </div>

        {/* Key Metrics Stats */}
        <div
          className={`grid grid-cols-3 gap-8 sm:gap-16 mt-20 pt-8 border-t border-white/20 text-center transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              180+
            </p>
            <p className="text-[10px] font-black tracking-widest uppercase text-neutral-300 mt-1">
              Handpicked Homes
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              100%
            </p>
            <p className="text-[10px] font-black tracking-widest uppercase text-neutral-300 mt-1">
              Verified Hosts
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              4.98
              <span className="text-neutral-300 text-2xl font-light">/5</span>
            </p>
            <p className="text-[10px] font-black tracking-widest uppercase text-neutral-300 mt-1">
              Guest Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
