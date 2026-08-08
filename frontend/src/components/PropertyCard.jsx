import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeartIcon from "./HeartIcon";

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
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
    >
      {/* Image container */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {featuredImage ? (
          <img
            src={featuredImage.url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.status === "For Sale"
                ? "bg-emerald-500 text-white"
                : property.status === "For Rent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white"
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* Wishlist button */}
        {user && (
          <div className="absolute top-3 right-3">
            <HeartIcon filled={isWishlisted} onClick={handleWishlist} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900">
            {property.price.toLocaleString()}{" "}
            <span className="text-blue-600 text-sm font-semibold">TND</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {property.location}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* Beds */}
          <div className="flex items-center gap-1">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v11a1 1 0 001 1h16a1 1 0 001-1V7M3 7a1 1 0 011-1h16a1 1 0 011 1M3 7h18M7 11h2v4H7v-4zm8 0h2v4h-2v-4z"
              />
            </svg>
            <span className="font-medium">
              {property.beds}{" "}
              <span className="text-gray-400 font-normal">Beds</span>
            </span>
          </div>

          {/* Baths */}
          <div className="flex items-center gap-1">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zm3-4h10M7 8a3 3 0 013-3h4a3 3 0 013 3"
              />
            </svg>
            <span className="font-medium">
              {property.baths}{" "}
              <span className="text-gray-400 font-normal">Baths</span>
            </span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
              />
            </svg>
            <span className="font-medium">
              {property.sqft}{" "}
              <span className="text-gray-400 font-normal">m²</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
