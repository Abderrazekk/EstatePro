import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Upgraded Hook
const useScrollReveal = (threshold = 0.2) => {
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

const PromoBanner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, isVisible] = useScrollReveal(0.2);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("/api/banners");
        if (res.data) setBanner(res.data);
      } catch (error) {
        console.error("Failed to fetch promotional banner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading || !banner) return null;

  return (
    <section
      ref={ref}
      className="w-full bg-stone-950 flex justify-center overflow-hidden"
    >
      <Link
        to="/properties"
        className={`block relative w-full overflow-hidden group cursor-pointer transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
      >
        <img
          src={banner.imageUrl}
          alt="Promotional Banner"
          className="w-full h-auto md:h-[450px] lg:h-[550px] xl:h-[600px] object-cover object-center transition-transform duration-1000 group-hover:scale-105"
        />
      </Link>
    </section>
  );
};

export default PromoBanner;
