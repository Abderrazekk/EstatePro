import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]); //[cite: 19]
  const [loading, setLoading] = useState(true); //[cite: 19]

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("/api/properties", {
          params: { isFeatured: true, limit: 8 }, //[cite: 19]
        });
        setProperties(res.data.properties); //[cite: 19]
      } catch (error) {
        console.error("Failed to fetch featured properties:", error); //[cite: 19]
      } finally {
        setLoading(false); //[cite: 19]
      }
    };
    fetchFeatured(); //[cite: 19]
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-10 w-64 md:w-96 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-4 w-48 bg-gray-100 rounded-lg mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Premium Skeleton Loading Grid */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-50 rounded-3xl h-[400px] w-full border border-gray-100 shadow-sm"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) return null; //[cite: 19]

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-1 { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-2 { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; opacity: 0; }
        .animate-fade-in-3 { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-fade-in-4 { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards; opacity: 0; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="animate-fade-in-1 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-500 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
            Handpicked Stays
          </span>
          <h2 className="animate-fade-in-2 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our{" "}
            <span className="italic font-serif text-gray-400 font-light">
              Finest
            </span>{" "}
            Retreats
          </h2>
          <p className="animate-fade-in-3 text-lg text-gray-500 mt-4 max-w-xl mx-auto font-light leading-relaxed">
            Discover our most exceptional guesthouses, carefully selected by our
            local experts for their unique charm and hospitality.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="animate-fade-in-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} /> //[cite: 19]
          ))}
        </div>

        {/* Call to Action */}
        {properties.length > 0 && ( //[cite: 19]
          <div className="animate-fade-in-4 text-center mt-16 pt-8 border-t border-gray-100">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5" //[cite: 19]
            >
              Explore All Homes
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
