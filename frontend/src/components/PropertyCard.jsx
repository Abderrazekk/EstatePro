import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeartIcon from "./HeartIcon";
import { Users, Bed, Bath, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

const PropertyCard = ({ property, layout = "grid" }) => {
  const { user, toggleWishlist } = useAuth();
  const isList = layout === "list";

  const featuredImage =
    property.images?.find((img) => img.isFeatured) || property.images?.[0];

  const isWishlisted =
    user?.wishlist?.some((id) => id === property._id) ?? false;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property._id);
  };

  return (
    <Link
      to={`/property/${property._id}`}
      className={`group relative bg-white rounded-[2rem] border border-neutral-200/80 hover:border-[#0A0A0A] transition-all duration-500 overflow-hidden transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex ${
        isList ? "flex-col md:flex-row" : "flex-col h-full"
      }`}
    >
      {/* Imagery Container with Glass Badge Overlays */}
      <div
        className={`relative bg-neutral-100 overflow-hidden shrink-0 ${
          isList ? "h-64 md:h-auto md:w-5/12 lg:w-1/3" : "h-72 w-full"
        }`}
      >
        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <Building className="w-12 h-12" />
          </div>
        )}

        {/* Floating Glass Type Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/90 backdrop-blur-md text-[#0A0A0A] shadow-md border border-white/40 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {property.type || "Maison d'Hôte"}
          </span>
        </div>

        {/* Pure Black Wishlist Heart Action */}
        {user && (
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
            title="Add to wishlist"
          >
            <HeartIcon filled={isWishlisted} className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Card Content Surface */}
      <div
        className={`p-6 sm:p-7 flex flex-col flex-1 ${isList ? "md:p-8" : ""}`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#0A0A0A]" />
            {property.location}
          </p>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
            Verified Stay
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-[#0A0A0A] truncate mb-3 group-hover:text-neutral-600 transition-colors">
          {property.title}
        </h3>

        {isList && property.description && (
          <p className="hidden md:block text-sm text-neutral-500 mb-6 line-clamp-2 leading-relaxed font-light">
            {property.description}
          </p>
        )}

        {/* Property Specs Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-700 mb-6 mt-1">
          <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100">
            <Users className="w-3.5 h-3.5 text-[#0A0A0A]" />
            {property.maxGuests} Guests
          </span>
          <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100">
            <Bed className="w-3.5 h-3.5 text-[#0A0A0A]" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100">
            <Bath className="w-3.5 h-3.5 text-[#0A0A0A]" />
            {property.bathrooms} Baths
          </span>
        </div>

        {/* Pricing & Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              {property.pricePerNight?.toLocaleString()} TND
            </span>
            <span className="text-xs text-neutral-400 font-medium ml-1">
              / night
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
