import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("/api/properties", {
          params: { isFeatured: true, limit: 8 },
        });
        setProperties(res.data.properties);
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          Loading featured properties...
        </div>
      </section>
    );
  }

  if (properties.length === 0) return null; // don't show section if no featured properties

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            Handpicked for you
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Featured Properties
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Our most exceptional listings – premium homes, carefully selected by
            our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {properties.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/properties"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
            >
              View All Properties
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
