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
} from "lucide-react";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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
      const params = { page, limit: 9 };
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

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
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
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 shrink-0 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xl shadow-stone-200/40">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter Stays</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-stone-500 hover:text-gray-900 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
