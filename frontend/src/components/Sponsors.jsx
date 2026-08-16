import { useEffect, useState } from "react";
import axios from "axios";

// Upgraded Hook
const useScrollReveal = (threshold = 0.5) => {
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

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, isVisible] = useScrollReveal(0.5);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get("/api/sponsors");
        setSponsors(res.data);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (loading || sponsors.length === 0) return null;

  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section
      ref={ref}
      className={`py-12 bg-stone-50 border-t border-b border-stone-200/60 overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scroll-right 25s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
          Our Valued Partners & Sponsors
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll-right gap-16 md:gap-24 items-center">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor._id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-32 md:w-40"
            >
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="max-h-12 md:max-h-14 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
