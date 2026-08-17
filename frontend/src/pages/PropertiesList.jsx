import { useState, useEffect, useCallback, useMemo } from "react";
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
  Users,
  Bed,
  Bath,
  ListFilter,
  Plus,
  Minus,
} from "lucide-react";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  // Show More / Show Less States (Limit 8 by default)
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Filters State
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minNights, setMinNights] = useState("");

  const [amenities, setAmenities] = useState([]);
  const [features, setFeatures] = useState([]);
  const [sort, setSort] = useState("newest");

  // Dynamically extract unique amenities from existing properties
  const availableAmenities = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      if (Array.isArray(p.amenities)) {
        p.amenities.forEach((a) => {
          if (a) set.add(a);
        });
      }
    });
    amenities.forEach((a) => {
      if (a) set.add(a);
    });
    return Array.from(set);
  }, [properties, amenities]);

  // Dynamically extract unique features from existing properties
  const availableFeatures = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      if (Array.isArray(p.features)) {
        p.features.forEach((f) => {
          if (f) set.add(f);
        });
      }
    });
    features.forEach((f) => {
      if (f) set.add(f);
    });
    return Array.from(set);
  }, [properties, features]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 16 };

      if (search) params.search = search;
      if (type) params.type = type;
      if (status) params.status = status;
      if (location) params.location = location;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (guests) params.guests = guests;
      if (bedrooms) params.bedrooms = bedrooms;
      if (bathrooms) params.bathrooms = bathrooms;
      if (minNights) params.minNights = minNights;
      if (amenities.length > 0) params.amenities = amenities.join(",");
      if (features.length > 0) params.features = features.join(",");
      if (sort) params.sort = sort;

      const res = await axios.get("/api/properties", { params });
      setProperties(res.data.properties || []);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    search,
    type,
    status,
    location,
    minPrice,
    maxPrice,
    guests,
    bedrooms,
    bathrooms,
    minNights,
    amenities,
    features,
    sort,
  ]);

  useEffect(() => {
    fetchProperties();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProperties]);

  const clearFilters = () => {
    setSearch("");
    setType("");
    setStatus("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setGuests("");
    setBedrooms("");
    setBathrooms("");
    setMinNights("");
    setAmenities([]);
    setFeatures([]);
    setSort("newest");
    setPage(1);
  };

  const activeFiltersCount =
    [
      search,
      type,
      status,
      location,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
      bathrooms,
      minNights,
    ].filter(Boolean).length +
    amenities.length +
    features.length;

  const toggleArrayItem = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
    setPage(1);
  };

  const visibleAmenities = showAllAmenities
    ? availableAmenities
    : availableAmenities.slice(0, 8);
  const visibleFeatures = showAllFeatures
    ? availableFeatures
    : availableFeatures.slice(0, 8);

  const getGridClass = () => {
    switch (gridCols) {
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Edge-to-Edge Hero Header Touching Navbar */}
        <div className="relative w-full overflow-hidden bg-stone-900 text-white border-b border-stone-200">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/85 backdrop-blur-[0.5px]" />

          <div className="relative z-10 pt-16 pb-28 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-amber-200 bg-stone-900/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Curated Stays
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
              Découvrir les Maisons & Retraites
            </h1>
            <p className="text-stone-200 mt-4 text-sm sm:text-base font-light max-w-lg leading-relaxed drop-shadow">
              {total} résidences d'exception disponibles pour vos séjours
              inoubliables.
            </p>
          </div>

          {/* Full-Width Control Bar at Bottom of Hero Banner */}
          <div className="absolute bottom-0 inset-x-0 bg-stone-950/50 backdrop-blur-md border-t border-white/15 py-3 px-4 sm:px-6 lg:px-8 2xl:px-10 z-20">
            <div className="w-full flex items-center justify-between gap-4">
              {/* Grid Columns Switcher */}
              <div className="hidden lg:flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/15">
                {[3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setGridCols(num)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      gridCols === num
                        ? "bg-white text-gray-900 shadow-md"
                        : "text-stone-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Total count badge for mobile */}
              <div className="text-xs font-medium text-stone-300 lg:hidden">
                {total} résidences disponibles
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <ListFilter className="w-4 h-4 text-amber-300 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm focus:ring-2 focus:ring-amber-300 outline-none cursor-pointer transition appearance-none pr-8 bg-no-repeat"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25em 1.25em",
                  }}
                >
                  <option value="newest" className="text-gray-900 bg-white">
                    Plus Récents
                  </option>
                  <option value="popular" className="text-gray-900 bg-white">
                    Plus Populaires
                  </option>
                  <option value="price_asc" className="text-gray-900 bg-white">
                    Prix: Croissant
                  </option>
                  <option value="price_desc" className="text-gray-900 bg-white">
                    Prix: Décroissant
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Layout Area */}
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            {/* Sidebar Filters - Max Left Alignment */}
            <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 lg:sticky lg:top-24 z-10">
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xl shadow-stone-200/40 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar">
                <div
                  className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 cursor-pointer lg:cursor-default"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>
                      Filtres Avancés{" "}
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full">
                          {activeFiltersCount}
                        </span>
                      )}
                    </span>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFilters();
                      }}
                      className="text-xs text-stone-500 hover:text-gray-900 font-bold flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />{" "}
                      <span className="hidden lg:inline">Réinitialiser</span>
                    </button>
                  )}
                  <div className="lg:hidden ml-1 flex items-center justify-center bg-stone-50 rounded-full w-8 h-8 border border-stone-200">
                    {isMobileFilterOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-600" />
                    )}
                  </div>
                </div>

                <div
                  className={
                    isMobileFilterOpen
                      ? "block space-y-6"
                      : "hidden lg:block space-y-6"
                  }
                >
                  {/* Search & Location */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Mots-clés
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Nom, ville, style..."
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                          }}
                          className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 transition outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Région / Ville
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          list="tunisia-regions"
                          placeholder="Ex: Djerba, Sidi Bou Said..."
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            setPage(1);
                          }}
                          className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 transition outline-none"
                        />
                        <datalist id="tunisia-regions">
                          <option value="Sidi Bou Said" />
                          <option value="Djerba" />
                          <option value="Hammamet" />
                          <option value="Tozeur" />
                          <option value="Tunis Medina" />
                        </datalist>
                      </div>
                    </div>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Type */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Type de Logement
                    </label>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setPage(1);
                      }}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none cursor-pointer"
                    >
                      <option value="">Tous les Types</option>
                      <option value="Maison d'Hôte">Maison d'Hôte</option>
                      <option value="Dar Traditionnelle">
                        Dar Traditionnelle
                      </option>
                      <option value="Villa de Charme">Villa de Charme</option>
                      <option value="Gîte Rural">Gîte Rural</option>
                      <option value="Chambre d'Hôte">Chambre d'Hôte</option>
                    </select>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Capacity */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
                      Capacité & Intérieur
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-stone-400 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          placeholder="Personnes (min)"
                          value={guests}
                          onChange={(e) => {
                            setGuests(e.target.value);
                            setPage(1);
                          }}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-stone-400 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          placeholder="Chambres (min)"
                          value={bedrooms}
                          onChange={(e) => {
                            setBedrooms(e.target.value);
                            setPage(1);
                          }}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-stone-400 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          placeholder="Salles de bain (min)"
                          value={bathrooms}
                          onChange={(e) => {
                            setBathrooms(e.target.value);
                            setPage(1);
                          }}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Price */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Prix par Nuitée (TND)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => {
                          setMinPrice(e.target.value);
                          setPage(1);
                        }}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => {
                          setMaxPrice(e.target.value);
                          setPage(1);
                        }}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Dynamic Amenities Section */}
                  {availableAmenities.length > 0 && (
                    <>
                      <hr className="border-stone-100" />
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
                          Équipements Inclus
                        </label>
                        <div className="space-y-2">
                          {visibleAmenities.map((amenity) => (
                            <label
                              key={amenity}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                  amenities.includes(amenity)
                                    ? "bg-gray-900 border-gray-900"
                                    : "bg-white border-stone-300 group-hover:border-gray-500"
                                }`}
                              >
                                {amenities.includes(amenity) && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-xs font-medium text-stone-600 group-hover:text-gray-900">
                                {amenity}
                              </span>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={amenities.includes(amenity)}
                                onChange={() =>
                                  toggleArrayItem(
                                    amenity,
                                    amenities,
                                    setAmenities,
                                  )
                                }
                              />
                            </label>
                          ))}
                        </div>

                        {availableAmenities.length > 8 && (
                          <button
                            type="button"
                            onClick={() =>
                              setShowAllAmenities(!showAllAmenities)
                            }
                            className="mt-3 text-xs font-bold text-stone-900 flex items-center gap-1 hover:underline"
                          >
                            {showAllAmenities ? (
                              <>
                                <Minus className="w-3 h-3" /> Voir moins
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" /> Voir plus (
                                {availableAmenities.length - 8})
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  {/* Dynamic Features Section */}
                  {availableFeatures.length > 0 && (
                    <>
                      <hr className="border-stone-100" />
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
                          Caractéristiques
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {visibleFeatures.map((feature) => (
                            <button
                              key={feature}
                              onClick={() =>
                                toggleArrayItem(feature, features, setFeatures)
                              }
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                                features.includes(feature)
                                  ? "bg-gray-900 text-white border-gray-900"
                                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                              }`}
                            >
                              {feature}
                            </button>
                          ))}
                        </div>

                        {availableFeatures.length > 8 && (
                          <button
                            type="button"
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                            className="mt-3 text-xs font-bold text-stone-900 flex items-center gap-1 hover:underline"
                          >
                            {showAllFeatures ? (
                              <>
                                <Minus className="w-3 h-3" /> Voir moins
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" /> Voir plus (
                                {availableFeatures.length - 8})
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  <div className="lg:hidden mt-6 pt-4 border-t border-stone-100">
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full bg-gray-900 text-white rounded-xl py-3.5 text-sm font-bold shadow-md active:scale-95 transition-transform"
                    >
                      Voir les résultats ({total})
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Properties Grid Area */}
            <div className="flex-1 w-full min-w-0">
              {loading ? (
                <div className="flex items-center justify-center py-40">
                  <div className="w-10 h-10 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-3xl border border-stone-200/80 shadow-sm p-8">
                  <Search className="mx-auto w-14 h-14 text-stone-300 mb-5" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Aucune résidence trouvée
                  </h3>
                  <p className="text-stone-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                    Modifiez vos critères de recherche ou supprimez des filtres.
                  </p>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="mt-8 bg-gray-900 hover:bg-stone-800 text-white px-8 py-3.5 rounded-full text-sm font-bold transition shadow-sm"
                    >
                      Réinitialiser tous les filtres
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${getGridClass()}`}>
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>

                  {/* Pagination Section (Displays when total properties exceed 16) */}
                  {total > 16 && (
                    <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 pt-8">
                      <div className="text-xs font-semibold text-stone-500">
                        Page{" "}
                        <span className="text-stone-900 font-bold">{page}</span>{" "}
                        sur{" "}
                        <span className="text-stone-900 font-bold">
                          {pages}
                        </span>{" "}
                        ({total} résidences au total)
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => setPage(Math.max(1, page - 1))}
                          disabled={page === 1}
                          className="px-3.5 py-2 text-xs font-bold rounded-xl border border-stone-200 text-stone-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition shadow-sm flex items-center gap-1.5"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Précédent</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: pages }, (_, i) => i + 1).map(
                            (p) => (
                              <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                                  page === p
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                                }`}
                              >
                                {p}
                              </button>
                            ),
                          )}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => setPage(Math.min(pages, page + 1))}
                          disabled={page === pages}
                          className="px-3.5 py-2 text-xs font-bold rounded-xl border border-stone-200 text-stone-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition shadow-sm flex items-center gap-1.5"
                        >
                          <span>Suivant</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
      `,
        }}
      />
    </div>
  );
};

export default PropertiesList;
