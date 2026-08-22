import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import HeartIcon from "./HeartIcon";
import { Users, Bed, Bath, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

const PropertyCard = ({ property, layout = "grid" }) => {
  const { user, toggleWishlist } = useAuth();
  const { t } = useTranslation("propertyCard");
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
      className={`group relative bg-white rounded-2xl sm:rounded-[2rem] border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.12)] hover:border-black transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex ${
        isList ? "flex-col md:flex-row" : "flex-col h-full"
      }`}
    >
      {/* Visual Image Shell */}
      <div
        className={`relative bg-neutral-100 overflow-hidden shrink-0 ${
          isList ? "h-64 md:h-auto md:w-5/12 lg:w-2/5" : "h-40 sm:h-72 w-full"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-300">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
          <span className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest uppercase bg-white/95 backdrop-blur-2xl text-black shadow-lg border border-white">
            {property.type || t("defaultType")}
          </span>
        </div>

        {/* Wishlist Button */}
        {user && (
          <button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-2xl flex items-center justify-center text-black border border-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <HeartIcon filled={isWishlisted} />
          </button>
        )}

        {/* Price Floating Overlay Pill */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20">
          <div className="bg-black/90 backdrop-blur-md text-white px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-neutral-800 shadow-2xl flex items-baseline gap-1">
            <span className="text-xs sm:text-lg font-black tracking-tight font-sans">
              {property.pricePerNight?.toLocaleString()} Euro
            </span>
            <span className="text-[8px] sm:text-[10px] font-medium text-neutral-400 uppercase">
              {t("perNight")}
            </span>
          </div>
        </div>
      </div>

      {/* Property Details Content Area */}
      <div
        className={`p-3.5 sm:p-6 flex flex-col flex-1 ${isList ? "md:p-8" : ""}`}
      >
        {/* Title */}
        <h3 className="text-sm sm:text-xl font-extrabold text-black truncate mb-1 sm:mb-2 group-hover:text-neutral-600 transition-colors font-serif">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1 mb-3 sm:mb-6 truncate">
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>

        {isList && property.description && (
          <p className="hidden md:block text-xs text-neutral-500 mb-6 line-clamp-2 leading-relaxed font-light">
            {property.description}
          </p>
        )}

        {/* Stats Chips */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[9px] sm:text-[11px] font-bold text-neutral-700 mb-3 sm:mb-6 mt-auto">
          <div className="flex items-center gap-1 bg-neutral-100/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-neutral-200/60">
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
            <span>
              {property.maxGuests}{" "}
              <span className="hidden sm:inline">{t("guests")}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-100/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-neutral-200/60">
            <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
            <span>
              {property.bedrooms}{" "}
              <span className="hidden sm:inline">{t("beds")}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-100/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-neutral-200/60">
            <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
            <span>
              {property.bathrooms}{" "}
              <span className="hidden sm:inline">{t("baths")}</span>
            </span>
          </div>
        </div>

        {/* Action Trigger Line */}
        <div className="pt-2 sm:pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-black group-hover:underline truncate">
            {t("viewSanctuary")}
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-800 group-hover:scale-110 shadow-md shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
