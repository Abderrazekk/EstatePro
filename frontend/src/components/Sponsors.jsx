import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const useScrollReveal = (threshold = 0.3) => {
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
  const { t } = useTranslation("sponsors");
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, isVisible] = useScrollReveal(0.3);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get("/api/sponsors");
        setSponsors(res.data || []);
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
      className={`py-16 bg-neutral-50/80 border-t border-b border-neutral-200/80 overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scroll-right 30s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-neutral-400">
          {t("title")}
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft Vignette Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll-right gap-20 md:gap-28 items-center">
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor._id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-36 md:w-44"
            >
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="max-h-12 md:max-h-14 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;