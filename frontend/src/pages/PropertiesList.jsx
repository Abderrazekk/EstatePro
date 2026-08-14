import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mobile filter toggle state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Column layout state (3, 4, or 5)
  const [gridCols, setGridCols] = useState(3);

  // Filters tuned specifically for Maison d'Hôte listings
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (type) params.type = type;
      if (status) params.status = status;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (location) params.location = location;

      const res = await axios.get("/api/properties", { params });
      setProperties(res.data.properties || []);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, type, status, minPrice, maxPrice, location]);

  useEffect(() => {
    fetchProperties();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProperties]);

  const clearFilters = () => {
    setSearch("");
    setType("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
    setPage(1);
  };

  const hasActiveFilters =
    search || type || status || minPrice || maxPrice || location;

  // Dynamic grid class based on user selection (3, 4, or 5)
  // Base class 'grid-cols-1' ensures mobile is always 1 column
  const getGridClass = () => {
    switch (gridCols) {
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      {/* Main container spanned to full width */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            Curated Stays
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Houses & Retreats
          </h1>
          <p className="text-stone-500 mt-3 text-base font-light">
            {total}{" "}
            {total === 1 ? "exceptional residence" : "exceptional residences"}{" "}
            waiting for your stay
          </p>

          {/* Grid Column Selector (3, 4, or 5) */}
          {/* Added 'hidden lg:flex' so it completely disappears on mobile/tablets */}
          <div className="mt-8 hidden lg:flex items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mr-2">
              Layout:
            </span>
            {[3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setGridCols(num)}
                title={`${num} Cards Inline`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  gridCols === num
                    ? "bg-gray-900 text-white shadow-lg scale-110"
                    : "bg-white text-stone-500 border border-stone-200 hover:bg-stone-50 hover:text-gray-900"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24 z-10">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xl shadow-stone-200/40">
              {/* Header / Mobile Toggle */}
              <div
                className={`flex items-center justify-between cursor-pointer lg:cursor-default transition-all duration-300 ${
                  isMobileFilterOpen
                    ? "pb-4 mb-6 border-b border-stone-100"
                    : "pb-0 mb-0 lg:pb-4 lg:mb-6 border-transparent lg:border-b lg:border-stone-100"
                }`}
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter Stays</span>
                  <div className="lg:hidden ml-1 flex items-center justify-center bg-stone-50 rounded-full w-7 h-7 border border-stone-200">
                    {isMobileFilterOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-600" />
                    )}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilters();
                    }}
                    className="text-xs text-stone-500 hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span
                      className={!isMobileFilterOpen ? "hidden lg:inline" : ""}
                    >
                      Reset
                    </span>
                  </button>
                )}
              </div>

              {/* Filter Content */}
              <div className={isMobileFilterOpen ? "block" : "hidden lg:block"}>
                {/* Search */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Search Keyword
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Name, area, style..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      className="w-full pl-10 pr-3 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm text-gray-900 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Residence Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 transition cursor-pointer"
                  >
                    <option value="">All Types</option>
                    <option value="Maison d'hôte">Maison d'Hôte</option>
                    <option value="Dar">Traditional Dar</option>
                    <option value="Villa">Private Villa</option>
                    <option value="Gîte Rural">Gîte Rural</option>
                    <option value="Eco-Lodge">Eco-Lodge</option>
                  </select>
                </div>

                {/* Booking Status / Rental Option */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Rental Type
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl px-3 py-3 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 transition cursor-pointer"
                  >
                    <option value="">All Arrangements</option>
                    <option value="Per Night">Per Night</option>
                    <option value="Per Week">Per Week</option>
                    <option value="Full Exclusive Hire">
                      Full Exclusive Hire
                    </option>
                    <option value="For Sale">For Sale</option>
                  </select>
                </div>

                {/* Location Selector */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Region / City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      list="tunisia-regions"
                      placeholder="e.g. Sidi Bou Said, Djerba..."
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setPage(1);
                      }}
                      className="w-full pl-10 pr-3 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl text-sm text-gray-900 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-gray-900 transition"
                    />
                    <datalist id="tunisia-regions">
                      <option value="Sidi Bou Said" />
                      <option value="Djerba" />
                      <option value="Hammamet" />
                      <option value="Tozeur" />
                      <option value="Tunis Medina" />
                      <option value="Bizerte" />
                      <option value="Tabarka" />
                      <option value="Mahdia" />
                      <option value="Kélibia" />
                    </datalist>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                    Nightly Rate (TND)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min TND"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl px-3 py-3 text-sm text-gray-900 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-gray-900 transition"
                    />
                    <input
                      type="number"
                      placeholder="Max TND"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl px-3 py-3 text-sm text-gray-900 placeholder-stone-400 focus:bg-white focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                </div>

                {/* Mobile Action Button */}
                <div className="lg:hidden mt-6">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-gray-900 text-white rounded-2xl py-3 text-sm font-bold shadow-md active:scale-95 transition-transform"
                  >
                    View Properties
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Properties Grid Area */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-10 h-10 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-200/80 shadow-sm p-8">
                <Search className="mx-auto w-12 h-12 text-stone-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">
                  No matching residences found
                </h3>
                <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto">
                  Try relaxing your price limits or changing the region filter.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-6 bg-gray-900 hover:bg-stone-800 text-white px-6 py-3 rounded-full text-sm font-bold transition shadow-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Dynamically applied Grid Classes here */}
                <div className={`grid gap-6 ${getGridClass()}`}>
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-white hover:text-gray-900 disabled:opacity-30 transition shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-11 h-11 rounded-full text-sm font-bold transition ${
                          page === p
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(Math.min(pages, page + 1))}
                      disabled={page === pages}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-white hover:text-gray-900 disabled:opacity-30 transition shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesList;
