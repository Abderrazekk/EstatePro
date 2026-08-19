import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  Building,
  Sparkles,
  ImageOff,
  MapPin,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Users,
  Bed,
  Bath,
  ArrowUpDown,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced Filter State
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    status: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
    isFeatured: "all", // 'all', 'true', 'false'
    sort: "newest",
  });

  // Fetch unique available locations for dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("/api/properties/locations");
        setLocationsList(res.data || []);
      } catch (err) {
        console.error("Failed to fetch locations list:", err);
      }
    };
    fetchLocations();
  }, []);

  // Construct Query String and Fetch Properties
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);
      if (filters.location) params.append("location", filters.location);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.guests) params.append("guests", filters.guests);
      if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
      if (filters.bathrooms) params.append("bathrooms", filters.bathrooms);
      if (filters.isFeatured !== "all")
        params.append("isFeatured", filters.isFeatured);
      if (filters.sort) params.append("sort", filters.sort);

      // Admin view limit setting
      params.append("limit", "100");

      const res = await axios.get(`/api/properties?${params.toString()}`);
      setProperties(res.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Debounced API call on filter update
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProperties]);

  // Handle Input Changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Reset All Filters
  const resetFilters = () => {
    setFilters({
      search: "",
      type: "",
      status: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      guests: "",
      bedrooms: "",
      bathrooms: "",
      isFeatured: "all",
      sort: "newest",
    });
  };

  // Count active non-default filters
  const activeFiltersCount = Object.entries(filters).filter(([key, val]) => {
    if (key === "sort" || key === "isFeatured")
      return val !== "newest" && val !== "all";
    return val !== "";
  }).length;

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/properties/${deleteId}`);
      setProperties((prev) => prev.filter((p) => p._id !== deleteId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete property. Please try again.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            Admin Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Manage Properties
          </h1>
          <p className="text-stone-500 text-sm mt-1 font-light">
            Filter, inspect, and manage luxury residences listed across Tunisia.
          </p>
        </div>

        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-3 rounded-full text-sm font-bold shadow-xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Primary Search & Filter Bar */}
      <div className="bg-white border border-stone-200/80 rounded-3xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search title, city, street or keyword..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-stone-50/60 border border-stone-200/80 pl-11 pr-10 py-2.5 rounded-2xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange("search", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 overflow-x-auto pb-1 md:pb-0">
            {/* Type Quick Dropdown */}
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
            >
              <option value="">All Residence Types</option>
              <option value="Maison d'Hôte">Maison d'Hôte</option>
              <option value="Dar Traditionnelle">Dar Traditionnelle</option>
              <option value="Villa de Charme">Villa de Charme</option>
              <option value="Gîte Rural">Gîte Rural</option>
              <option value="Chambre d'Hôte">Chambre d'Hôte</option>
            </select>

            {/* Status Quick Dropdown */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-2 rounded-2xl text-xs font-semibold text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Viewed</option>
              </select>
            </div>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition shrink-0 ${
                showAdvancedFilters || activeFiltersCount > 0
                  ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center font-extrabold">
                  {activeFiltersCount}
                </span>
              )}
              {showAdvancedFilters ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Location Select */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Location / Governorate
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="">All Locations in Tunisia</option>
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Price Range / Night (TND)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <span className="text-stone-400 font-bold">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Capacity Filters */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Capacity Requirements
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Guests"
                  value={filters.guests}
                  onChange={(e) => handleFilterChange("guests", e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <input
                  type="number"
                  placeholder="Beds"
                  value={filters.bedrooms}
                  onChange={(e) =>
                    handleFilterChange("bedrooms", e.target.value)
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <input
                  type="number"
                  placeholder="Baths"
                  value={filters.bathrooms}
                  onChange={(e) =>
                    handleFilterChange("bathrooms", e.target.value)
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Featured Status Toggle */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                Featured Spotlight
              </label>
              <select
                value={filters.isFeatured}
                onChange={(e) =>
                  handleFilterChange("isFeatured", e.target.value)
                }
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="all">All Residences</option>
                <option value="true">Featured Only</option>
                <option value="false">Standard Listings Only</option>
              </select>
            </div>
          </div>
        )}

        {/* Active Filter Chips & Reset Row */}
        {activeFiltersCount > 0 && (
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="font-bold text-stone-500 text-[11px] uppercase mr-1">
                Active:
              </span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-medium">
                  Search: "{filters.search}"
                  <X
                    className="w-3 h-3 text-stone-500 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("search", "")}
                  />
                </span>
              )}
              {filters.type && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-medium">
                  Type: {filters.type}
                  <X
                    className="w-3 h-3 text-stone-500 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("type", "")}
                  />
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-medium">
                  Status: {filters.status}
                  <X
                    className="w-3 h-3 text-stone-500 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("status", "")}
                  />
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-medium">
                  Location: {filters.location}
                  <X
                    className="w-3 h-3 text-stone-500 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("location", "")}
                  />
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-medium">
                  Price: {filters.minPrice || "0"} - {filters.maxPrice || "∞"}{" "}
                  TND
                  <X
                    className="w-3 h-3 text-stone-500 cursor-pointer hover:text-stone-900"
                    onClick={() => {
                      handleFilterChange("minPrice", "");
                      handleFilterChange("maxPrice", "");
                    }}
                  />
                </span>
              )}
              {filters.isFeatured !== "all" && (
                <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-amber-900 font-semibold">
                  Featured Only
                  <X
                    className="w-3 h-3 text-amber-700 cursor-pointer hover:text-amber-950"
                    onClick={() => handleFilterChange("isFeatured", "all")}
                  />
                </span>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-bold hover:text-rose-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>
          Showing{" "}
          <strong className="text-stone-900 font-bold">
            {properties.length}
          </strong>{" "}
          property listings
        </span>
      </div>

      {/* Properties Table / Loading / Empty States */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-stone-100 rounded-2xl w-full" />
            ))}
          </div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center shadow-xs">
          <div className="w-14 h-14 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            No properties match your criteria
          </h3>
          <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto font-light">
            Try resetting your filters or adjusting your search parameters.
          </p>
          {activeFiltersCount > 0 ? (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 mt-5 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          ) : (
            <Link
              to="/admin/properties/new"
              className="inline-flex items-center gap-2 mt-5 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200/80 text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Title & Location</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Specs</th>
                  <th className="py-4 px-6">Price / Night</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {properties.map((prop) => {
                  const displayPrice = prop.pricePerNight ?? prop.price ?? 0;
                  const imageUrl = prop.images?.[0]?.url || prop.images?.[0];

                  return (
                    <tr
                      key={prop._id}
                      className="hover:bg-stone-50/60 transition-colors group"
                    >
                      {/* Image Preview */}
                      <td className="py-4 px-6 shrink-0">
                        <div className="relative w-14 h-12 rounded-xl bg-stone-100 border border-stone-200/80 overflow-hidden flex items-center justify-center shrink-0">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={prop.title || "Property"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <ImageOff className="w-5 h-5 text-stone-400" />
                          )}
                          {prop.isFeatured && (
                            <span
                              className="absolute top-1 right-1 bg-amber-400 text-stone-950 p-0.5 rounded-full shadow-xs"
                              title="Featured Property"
                            >
                              <Star className="w-3 h-3 fill-stone-950 text-stone-950" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title & Location */}
                      <td className="py-4 px-6 min-w-[200px]">
                        <p className="font-bold text-stone-900 truncate">
                          {prop.title || "Untitled Property"}
                        </p>
                        {prop.location && (
                          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                            <span className="truncate">{prop.location}</span>
                          </p>
                        )}
                      </td>

                      {/* Residence Type */}
                      <td className="py-4 px-6 font-medium text-stone-600 whitespace-nowrap">
                        {prop.type || "N/A"}
                      </td>

                      {/* Capacity Specs */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span
                            className="flex items-center gap-1"
                            title="Max Guests"
                          >
                            <Users className="w-3.5 h-3.5 text-stone-400" />
                            {prop.maxGuests || 2}
                          </span>
                          <span
                            className="flex items-center gap-1"
                            title="Bedrooms"
                          >
                            <Bed className="w-3.5 h-3.5 text-stone-400" />
                            {prop.bedrooms || 1}
                          </span>
                          <span
                            className="flex items-center gap-1"
                            title="Bathrooms"
                          >
                            <Bath className="w-3.5 h-3.5 text-stone-400" />
                            {prop.bathrooms || 1}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-bold text-stone-900 whitespace-nowrap">
                        {displayPrice.toLocaleString()} TND
                        <span className="text-xs text-stone-400 font-normal ml-0.5">
                          / night
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                            prop.status === "Available"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
                              : prop.status === "Maintenance"
                                ? "bg-amber-50 text-amber-800 border-amber-200/80"
                                : "bg-stone-100 text-stone-700 border-stone-200"
                          }`}
                        >
                          {prop.status || "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/properties/${prop._id}/edit`}
                            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                            title="Edit Property"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(prop._id)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all"
                            title="Delete Property"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl space-y-6 text-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600 border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Delete Residence?
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                This action cannot be undone. This property listing will be
                permanently removed from your platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full text-sm transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
