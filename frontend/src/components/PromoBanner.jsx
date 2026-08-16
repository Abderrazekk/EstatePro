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
    <section className="w-full bg-stone-950 flex justify-center">
      <Link
        to="/properties"
        className="block relative w-full overflow-hidden group cursor-pointer"
      >
        {/* 
          - `h-auto` (default for mobile): Scales the image perfectly so 100% of it is visible, no cut text!
          - `md:h-[450px] lg:h-[600px]`: Gives it a nice, tall presence on larger desktop screens.
          - `w-full` & `object-cover`: Ensures there are NEVER any black bars on the sides.
        */}
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
