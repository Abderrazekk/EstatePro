import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeartIcon from "../components/HeartIcon";
import ContactAgentModal from "../components/ContactAgentModal";
import PropertyMap from "../components/PropertyMap";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  BedDouble,
  Bath,
  Moon,
  ChevronLeft,
  ChevronRight,
  X,
  Share,
  Check,
  MapPin,
  ArrowRight,
  Wifi,
  Waves,
  Wind,
  Car,
  Utensils,
  Tv,
  Trees,
  Coffee,
  Shirt,
  Flame,
  ShieldCheck,
  Dog,
  Laptop,
  Sun,
  Mountain,
  Palmtree,
  Sparkles,
  Award,
  Compass,
  CheckCircle2,
} from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Helper function to dynamically associate keywords with Lucide icons
const getOptionIcon = (label = "") => {
  const normalized = label.toLowerCase().trim();

  if (normalized.includes("wifi") || normalized.includes("internet"))
    return Wifi;
  if (normalized.includes("piscine") || normalized.includes("pool"))
    return Waves;
  if (
    normalized.includes("clim") ||
    normalized.includes("air") ||
    normalized.includes("ventilation")
  )
    return Wind;
  if (
    normalized.includes("park") ||
    normalized.includes("garage") ||
    normalized.includes("voiture")
  )
    return Car;
  if (
    normalized.includes("cuisin") ||
    normalized.includes("kitchen") ||
    normalized.includes("repas")
  )
    return Utensils;
  if (
    normalized.includes("tv") ||
    normalized.includes("télé") ||
    normalized.includes("television")
  )
    return Tv;
  if (
    normalized.includes("jardin") ||
    normalized.includes("parc") ||
    normalized.includes("espace vert")
  )
    return Trees;
  if (
    normalized.includes("déjeuner") ||
    normalized.includes("café") ||
    normalized.includes("breakfast")
  )
    return Coffee;
  if (
    normalized.includes("linge") ||
    normalized.includes("laver") ||
    normalized.includes("machine") ||
    normalized.includes("lave")
  )
    return Shirt;
  if (
    normalized.includes("chauffage") ||
    normalized.includes("cheminée") ||
    normalized.includes("feu") ||
    normalized.includes("bbq") ||
    normalized.includes("barbecue")
  )
    return Flame;
  if (
    normalized.includes("sécurit") ||
    normalized.includes("garde") ||
    normalized.includes("alarme")
  )
    return ShieldCheck;
  if (
    normalized.includes("animaux") ||
    normalized.includes("pet") ||
    normalized.includes("chien") ||
    normalized.includes("chat")
  )
    return Dog;
  if (
    normalized.includes("travail") ||
    normalized.includes("bureau") ||
    normalized.includes("workspace")
  )
    return Laptop;
  if (
    normalized.includes("terrasse") ||
    normalized.includes("balcon") ||
    normalized.includes("sun")
  )
    return Sun;
  if (
    normalized.includes("plage") ||
    normalized.includes("mer") ||
    normalized.includes("beach")
  )
    return Palmtree;
  if (normalized.includes("montagne") || normalized.includes("vue"))
    return Mountain;
  if (
    normalized.includes("jacuzzi") ||
    normalized.includes("spa") ||
    normalized.includes("luxe")
  )
    return Sparkles;
  if (normalized.includes("authent") || normalized.includes("tradition"))
    return Award;
  if (normalized.includes("calme") || normalized.includes("tranquille"))
    return Compass;

  return CheckCircle2;
};

const PropertyDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation("propertyDetail");
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [copied, setCopied] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { user, toggleWishlist } = useAuth();

  const thumbScrollRef = useRef(null);
  const thumbRefs = useRef([]);

  useEffect(() => {
    const fetchPropertyAndSimilar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/properties/${id}`);
        const propData = res.data;
        setProperty(propData);
        if (propData.images?.length > 0) setActiveImage(propData.images[0].url);

        try {
          const similarRes = await axios.get(`/api/properties`);
          const allProps = similarRes.data.properties || similarRes.data;

          const filtered = allProps
            .filter(
              (p) =>
                p._id !== id &&
                (p.location === propData.location || p.type === propData.type),
            )
            .slice(0, 4);

          if (filtered.length < 4) {
            const remaining = allProps.filter(
              (p) => p._id !== id && !filtered.some((f) => f._id === p._id),
            );
            filtered.push(...remaining.slice(0, 4 - filtered.length));
          }

          setSimilarProperties(filtered);
        } catch (simErr) {
          console.error("Failed to fetch similar properties", simErr);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyAndSimilar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get(
          `/api/enquiries/property/${id}/booked-dates`,
        );
        const dates = res.data.map((booking) => {
          const start = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);

          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);

          return { start, end };
        });
        setBookedDates(dates);
      } catch (error) {
        console.error("Failed to fetch booked dates", error);
      }
    };
    fetchBookedDates();
  }, [id]);

  useEffect(() => {
    if (!lightboxOpen || !property) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, property]);

  const images = property?.images ?? [];

  useEffect(() => {
    const index = images.findIndex((img) => img.url === activeImage);
    if (index !== -1 && thumbRefs.current[index]) {
      thumbRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeImage, images]);

  const openLightboxAt = (url) => {
    const idx = images.findIndex((img) => img.url === url);
    setLightboxIndex(idx === -1 ? 0 : idx);
    setLightboxOpen(true);
  };

  const nextLightboxImage = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % images.length);
  };

  const prevLightboxImage = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleMainImageNav = (direction) => {
    const currentIndex = images.findIndex((img) => img.url === activeImage);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % images.length;
    } else {
      nextIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setActiveImage(images[nextIndex].url);
  };

  const scrollThumbnails = (direction) => {
    if (thumbScrollRef.current) {
      const scrollAmount = thumbScrollRef.current.clientWidth / 2;
      thumbScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie du lien", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full animate-pulse">
          <div className="h-[50vh] bg-gray-100 rounded-2xl mb-4" />
          <div className="flex gap-3 overflow-hidden mb-8">
            <div className="h-24 w-32 bg-gray-100 rounded-xl shrink-0" />
            <div className="h-24 w-32 bg-gray-100 rounded-xl shrink-0" />
            <div className="h-24 w-32 bg-gray-100 rounded-xl shrink-0" />
          </div>
          <div className="h-7 w-2/3 bg-gray-100 rounded mb-3" />
        </main>
        <Footer />
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600 mb-2">404</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              {t("notFound.title")}
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );

  const isWishlisted =
    user?.wishlist?.some((wishlistId) => wishlistId === property._id) ?? false;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        .custom-calendar-wrapper .react-datepicker {
          font-family: inherit;
          border: none;
          background-color: transparent;
          width: 100%;
        }
        .custom-calendar-wrapper .react-datepicker__month-container {
          width: 100%;
        }
        .custom-calendar-wrapper .react-datepicker__header {
          background-color: transparent;
          border-bottom: none;
          padding-top: 0;
        }
        .custom-calendar-wrapper .react-datepicker__current-month {
          font-weight: 600;
          font-size: 1rem;
          color: #111827; 
          margin-bottom: 0.75rem;
        }
        .custom-calendar-wrapper .react-datepicker__day-names {
          margin-bottom: -0.25rem;
          display: flex;
          justify-content: space-between;
        }
        .custom-calendar-wrapper .react-datepicker__day-name {
          color: #9CA3AF;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          width: 2.25rem;
        }
        .custom-calendar-wrapper .react-datepicker__month {
          margin: 0;
        }
        .custom-calendar-wrapper .react-datepicker__week {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }
        .custom-calendar-wrapper .react-datepicker__day {
          color: #374151;
          width: 2.25rem;
          height: 2.25rem;
          line-height: 2.25rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
          margin: 0;
          font-size: 0.875rem;
        }
        .custom-calendar-wrapper .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
          background-color: #EFF4FF;
          color: #1D4ED8;
        }
        .custom-calendar-wrapper .react-datepicker__day--selected,
        .custom-calendar-wrapper .react-datepicker__day--keyboard-selected {
          background-color: #1D4ED8;
          color: white;
        }
        .custom-calendar-wrapper .react-datepicker__day--disabled {
          color: #D1D5DB;
          text-decoration: line-through;
          background-color: transparent;
          cursor: not-allowed;
        }
        .custom-calendar-wrapper .react-datepicker__day--disabled:hover {
          background-color: transparent;
        }
        .custom-calendar-wrapper .react-datepicker__day--outside-month {
          visibility: hidden;
        }
        .custom-calendar-wrapper .react-datepicker__navigation {
          top: 0.25rem;
        }
        .custom-calendar-wrapper .react-datepicker__navigation-icon::before {
          border-color: #6B7280;
          border-width: 2px 2px 0 0;
          width: 8px;
          height: 8px;
        }
      `}</style>

      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Gallery Section */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="w-full h-[50vh] md:h-[60vh] relative group overflow-hidden rounded-2xl bg-gray-100 border border-gray-100">
            <img
              src={
                activeImage ||
                images[0]?.url ||
                "https://via.placeholder.com/1200x800"
              }
              alt={property.title}
              onClick={() => activeImage && openLightboxAt(activeImage)}
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMainImageNav("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMainImageNav("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                openLightboxAt(activeImage || images[0]?.url);
              }}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 shadow-lg hover:bg-white transition-colors z-10"
            >
              {t("gallery.showAll")}
            </button>
          </div>

          {images.length > 1 && (
            <div className="relative group/thumbs flex items-center mt-1">
              <button
                onClick={() => scrollThumbnails("left")}
                className="absolute -left-3 z-10 bg-white border border-gray-100 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover/thumbs:opacity-100 transition-opacity hover:bg-gray-50"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={thumbScrollRef}
                className="flex gap-3 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth px-1"
              >
                {images.map((img, idx) => (
                  <div
                    key={img._id || idx}
                    ref={(el) => (thumbRefs.current[idx] = el)}
                    className="snap-start shrink-0 relative rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setActiveImage(img.url)}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className={`h-24 w-32 md:h-28 md:w-40 object-cover transition-all duration-300 ${
                        activeImage === img.url
                          ? "scale-110 opacity-100"
                          : "opacity-60 group-hover:opacity-100"
                      }`}
                    />
                    {activeImage === img.url && (
                      <div className="absolute inset-0 ring-4 ring-inset ring-blue-600 rounded-xl pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollThumbnails("right")}
                className="absolute -right-3 z-10 bg-white border border-gray-100 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover/thumbs:opacity-100 transition-opacity hover:bg-gray-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                {property.type}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleShare}
                  className="relative p-2 rounded-full hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                  title={t("share.tooltip")}
                >
                  {copied ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <Share size={20} />
                  )}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      {t("share.copied")}
                    </span>
                  )}
                </button>
                {user && (
                  <div className="p-1">
                    <HeartIcon
                      filled={isWishlisted}
                      onClick={() => toggleWishlist(property._id)}
                    />
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {property.title}
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              {property.location}, {t("location.country")}
            </p>
          </div>
          <div className="sm:text-right shrink-0 mt-2 sm:mt-0">
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              {property.pricePerNight?.toLocaleString()}{" "}
              <span className="text-xl">{t("pricing.currency")}</span>
              <span className="text-sm font-medium text-gray-500 block sm:inline sm:ml-2">
                {t("pricing.perNight")}
              </span>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors w-full sm:w-auto shadow-sm"
            >
              {t("pricing.bookNow")}
            </button>
          </div>
        </div>

        {/* Details Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-b border-gray-100">
          <Stat
            icon={Users}
            label={t("stats.maxCapacity")}
            value={`${property.maxGuests} ${t("stats.persons")}`}
          />
          <Stat
            icon={BedDouble}
            label={t("stats.bedrooms")}
            value={`${property.bedrooms} ${t("stats.bedrooms")}`}
          />
          <Stat
            icon={Bath}
            label={t("stats.bathrooms")}
            value={`${property.bathrooms} ${t("stats.sdb")}`}
          />
          <Stat
            icon={Moon}
            label={t("stats.minStay")}
            value={`${property.minNights} ${t("stats.nights")}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 pt-10">
          <div className="md:w-2/3">
            <Section title={t("sections.about")}>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {property.description}
              </p>
            </Section>

            {/* AMENITIES & FEATURES SECTION */}
            {(property.amenities?.length > 0 ||
              property.features?.length > 0) && (
              <Section title={t("sections.amenities")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {property.amenities?.map((amenity, index) => {
                    const IconComponent = getOptionIcon(amenity);
                    return (
                      <div
                        key={`amenity-${index}`}
                        className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 hover:border-gray-300 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white text-gray-900 shadow-sm border border-stone-200/80 flex items-center justify-center shrink-0">
                          <IconComponent size={20} strokeWidth={1.8} />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}

                  {property.features?.map((feature, index) => {
                    const IconComponent = getOptionIcon(feature);
                    return (
                      <div
                        key={`feature-${index}`}
                        className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100/60 hover:border-blue-200 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white shadow-sm flex items-center justify-center shrink-0">
                          <IconComponent size={20} strokeWidth={1.8} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Video Section */}
            {property.video?.url && (
              <Section title={t("sections.video")}>
                <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-md aspect-video border border-gray-100">
                  <video
                    src={property.video.url}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                  >
                    {t("sections.videoUnsupported")}
                  </video>
                </div>
              </Section>
            )}

            {/* Map Section - Increased height here from h-80 to h-[500px] */}
            <Section title={t("sections.location")}>
              <div className="relative z-0 isolate rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[500px]">
                <PropertyMap
                  lat={property.coordinates?.lat}
                  lng={property.coordinates?.lng}
                />
              </div>
              {property.address?.formattedAddress && (
                <p className="text-sm font-medium text-gray-500 mt-4 flex items-center gap-2">
                  📍 {property.address.formattedAddress}
                </p>
              )}
            </Section>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-8 space-y-6">
              <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  {t("sidebar.availability")}
                </h3>
                <div className="custom-calendar-wrapper w-full">
                  <DatePicker
                    inline
                    readOnly
                    minDate={new Date()}
                    excludeDateIntervals={bookedDates}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>{" "}
                    {t("sidebar.booked")}
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>{" "}
                    {t("sidebar.available")}
                  </span>
                </div>
              </div>

              {/* Host Section */}
              <div className="border border-gray-100 rounded-3xl p-6 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t("sidebar.hostTitle")}
                </h3>
                {property.host?.name ? (
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gray-900 text-white font-bold text-xl flex items-center justify-center shadow-sm">
                        {property.host.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-lg">
                          {property.host.name}
                        </p>
                        <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                          {t("sidebar.verified")}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      {t("sidebar.contact")}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm font-medium">
                    {t("sidebar.noInfo")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  {t("similar.title")}
                </h2>
                <p className="text-gray-500 mt-1 text-base">
                  {t("similar.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((item) => {
                const itemImg =
                  item.images?.[0]?.url ||
                  "https://via.placeholder.com/600x400";
                const isItemWishlisted =
                  user?.wishlist?.some((wId) => wId === item._id) ?? false;

                return (
                  <div
                    key={item._id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <Link to={`/properties/${item._id}`}>
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {item.type}
                      </span>

                      {user && (
                        <div className="absolute top-3 right-3 z-10">
                          <HeartIcon
                            filled={isItemWishlisted}
                            onClick={() => toggleWishlist(item._id)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                          <MapPin
                            size={14}
                            className="text-blue-600 shrink-0"
                          />
                          <span className="truncate">
                            {item.location}, {t("location.country")}
                          </span>
                        </div>
                        <Link to={`/properties/${item._id}`}>
                          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            {item.pricePerNight?.toLocaleString()}{" "}
                            {t("pricing.currency")}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            {t("similar.perNight")}
                          </span>
                        </div>
                        <Link
                          to={`/properties/${item._id}`}
                          className="bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-900 p-2.5 rounded-xl transition-colors shadow-sm"
                          title={t("similar.view")}
                        >
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <ContactAgentModal
          propertyId={property._id}
          pricePerNight={property.pricePerNight}
          bookedDates={bookedDates}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-50 group"
              >
                <ChevronLeft
                  size={36}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-50 group"
              >
                <ChevronRight
                  size={36}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-6xl px-16 md:px-24 flex items-center justify-center h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]?.url}
              alt=""
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-medium text-sm tracking-widest bg-black/50 px-6 py-2.5 rounded-full backdrop-blur-md">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4">
    {Icon && (
      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 flex items-center justify-center shrink-0">
        <Icon size={22} strokeWidth={2} />
      </div>
    )}
    <div>
      <p className="text-base font-bold text-gray-900 leading-tight">{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const Section = ({ title, children, last }) => (
  <div className={last ? "mb-0" : "mb-12"}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </div>
);

export default PropertyDetail;
