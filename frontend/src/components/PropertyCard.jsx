import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeartIcon from "./HeartIcon";
import { Users, Bed, Bath, MapPin } from "lucide-react";

const PropertyCard = ({ property }) => {
  const { user, toggleWishlist } = useAuth();

  const featuredImage =
    property.images.find((img) => img.isFeatured) || property.images[0];

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
      className="group block bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {/* Subtle gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>

        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-gray-900 shadow-sm border border-white/20">
            {property.type}
          </span>
        </div>

        {/* Wishlist Button */}
        {user && (
          <div className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-md rounded-full p-1.5 transition-colors hover:bg-white/90">
            <HeartIcon filled={isWishlisted} onClick={handleWishlist} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 truncate mb-2 group-hover:text-gray-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-5">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          {property.location}
        </p>

        {/* Guest House Capacity Stats - FIXED DESIGN */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-600 mb-5">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap">
            <Users className="w-4 h-4 text-gray-900 shrink-0" />
            <span>{property.maxGuests} Invités</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap">
            <Bed className="w-4 h-4 text-gray-900 shrink-0" />
            <span>{property.bedrooms} Chambres</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap">
            <Bath className="w-4 h-4 text-gray-900 shrink-0" />
            <span>{property.bathrooms} SDB</span>
          </div>
        </div>

        {/* Price Per Night */}
        <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {property.pricePerNight?.toLocaleString()} TND
            </span>
            <span className="text-sm text-gray-500 font-medium ml-1">
              / nuit
            </span>
          </div>

          {/* Subtle arrow to indicate action */}
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
