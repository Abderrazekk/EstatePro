import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/api/users/wishlist");
        setProperties(res.data || []);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            Saved Residences
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Saved Stays
          </h1>
          <p className="text-stone-500 mt-2 text-base font-light">
            Keep track of your favorite guest houses and retreats for your next
            escape.
          </p>
        </div>

        {/* Skeleton Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-3xl p-4 animate-pulse space-y-4"
              >
                <div className="w-full h-52 bg-stone-100 rounded-2xl" />
                <div className="h-5 bg-stone-100 rounded-lg w-3/4" />
                <div className="h-4 bg-stone-100 rounded-lg w-1/2" />
                <div className="h-4 bg-stone-100 rounded-lg w-1/4" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-stone-200/80 rounded-3xl py-16 px-6 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h3>
            <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto font-light leading-relaxed">
              Explore our curated selection of Tunisian *maisons d'hôte* and
              save your favorite residences to view them later.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3.5 bg-gray-900 hover:bg-stone-800 text-white rounded-full text-sm font-bold transition shadow-sm"
            >
              <span>Explore Houses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Grid Display */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
