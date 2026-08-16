import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { user } = useAuth();

  return (
    // Changed to 100dvh for perfect mobile sizing, keeping 90vh for desktops
    <section className="relative min-h-[100dvh] lg:min-h-[90vh] flex items-center justify-start overflow-hidden bg-gray-900">
      {/* Custom Animations & Styles */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite alternate;
        }
        .animate-fade-in-up-1 {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in-up-2 {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-3 {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-4 {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Full-width Background Image with cinematic zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Tunisian Guesthouse"
          className="w-full h-full object-cover animate-slow-zoom"
        />
      </div>

      {/* Enhanced Gradient Overlays for perfect text readability on ALL devices */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 md:bg-gradient-to-r md:from-black/95 md:via-black/50 md:to-transparent" />
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Main Content Container - Adjusted padding for mobile top-nav clearance */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 sm:pt-32 lg:py-20 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-in-up-1 mb-6 sm:mb-8 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Authentic Escapes
          </div>

          {/* Headline - Adjusted sizing steps for smoother tablet transition */}
          <h1 className="animate-fade-in-up-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg mb-4 sm:mb-6">
            Discover the art of{" "}
            <span className="italic font-serif text-gray-300 relative inline-block">
              slow living
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 text-white/40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 10 50 5 Q 75 0 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>{" "}
            <br className="hidden sm:block" />
            in Tunisia.
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up-3 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md mb-8 sm:mb-10 max-w-xl font-light">
            Escape the ordinary. Book unique, verified guesthouses that offer
            authentic hospitality, serene landscapes, and unforgettable
            memories.
          </p>

          {/* Call to Actions - Full width on very small phones, auto on larger */}
          <div className="animate-fade-in-up-4 flex flex-col sm:flex-row flex-wrap gap-4 mb-12 sm:mb-16">
            <Link
              to="/properties"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center w-full sm:w-auto"
            >
              Explore Homes
            </Link>

            {/* Only show "Create Account" if NOT logged in */}
            {!user && (
              <Link
                to="/register"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300 shadow-lg text-center w-full sm:w-auto"
              >
                Join DarHôte
              </Link>
            )}
          </div>

          {/* Glassmorphism Stats Bar - Updated to flex-wrap so all 3 show beautifully on mobile */}
          <div className="animate-fade-in-up-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 md:p-8 inline-block shadow-2xl w-full sm:w-auto">
            <div className="flex flex-row flex-wrap justify-between sm:justify-start gap-6 sm:gap-10 md:gap-16">
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                  150<span className="text-gray-300">+</span>
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 mt-1 uppercase tracking-wider">
                  Unique Stays
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                  4.9<span className="text-gray-300">/5</span>
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 mt-1 uppercase tracking-wider">
                  Guest Rating
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                  24<span className="text-gray-300">/7</span>
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 mt-1 uppercase tracking-wider">
                  Concierge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
