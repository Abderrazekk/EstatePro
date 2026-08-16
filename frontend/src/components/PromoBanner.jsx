import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PromoBanner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("/api/banners");
        if (res.data) {
          setBanner(res.data);
        }
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
    <section className="w-full bg-stone-950">
      <Link
        to="/properties"
        className="block relative w-full h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer"
      >
        {/* The Uploaded Background Image */}
        <img
          src={banner.imageUrl}
          alt="Promotional Banner"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </Link>
    </section>
  );
};

export default PromoBanner;
