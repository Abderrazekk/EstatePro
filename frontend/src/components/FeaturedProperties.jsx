import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { Sparkles, ArrowRight } from "lucide-react";

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

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, isVisible] = useScrollReveal(0.1);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("/api/properties", {
          params: { isFeatured: true, limit: 8 },
        });
        setProperties(res.data.properties || []);
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-6 w-36 bg-neutral-200 rounded-full mx-auto mb-6" />
            <div className="h-12 w-80 bg-neutral-200 rounded-2xl mx-auto mb-4" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-neutral-100 rounded-2xl sm:rounded-[2rem] h-[300px] sm:h-[420px] w-full border border-neutral-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) return null;

  return (
    <section ref={ref} className="py-16 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-black bg-neutral-100 border border-neutral-300 px-5 py-2 rounded-full shadow-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              Handpicked Residences
            </span>
          </div>

          <h2
            className={`transition-all duration-1000 delay-150 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight`}
          >
            Our{" "}
            <span className="font-serif italic font-normal text-neutral-400">
              Finest
            </span>{" "}
            Retreats
          </h2>

          <p
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            } text-sm sm:text-lg text-neutral-500 mt-3 sm:mt-5 font-light leading-relaxed`}
          >
            Carefully curated guesthouses chosen for their historical
            architecture, private serenity, and extraordinary local hospitality.
          </p>
        </div>

        {/* Property Grid: 2 columns on mobile, 4 on desktop */}
        <div
          className={`transition-all duration-1000 delay-600 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8`}
        >
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {/* Bottom Explorer Action */}
        <div
          className={`transition-all duration-1000 delay-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } text-center mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-100`}
        >
          <Link
            to="/properties"
            className="group inline-flex items-center justify-center gap-3 bg-black text-white border border-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>Explore Entire Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;