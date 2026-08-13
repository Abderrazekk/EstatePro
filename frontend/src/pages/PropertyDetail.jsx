import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeartIcon from "../components/HeartIcon";
import ContactAgentModal from "../components/ContactAgentModal";
import PropertyMap from "../components/PropertyMap";
import { useAuth } from "../context/AuthContext";
import { Users, BedDouble, Bath, Moon } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { user, toggleWishlist } = useAuth();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);
        if (res.data.images?.length > 0) setActiveImage(res.data.images[0].url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Fetch booked dates for the calendar & apply time-boundary fix
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get(
          `/api/enquiries/property/${id}/booked-dates`,
        );
        const dates = res.data.map((booking) => {
          const start = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);

          // Force times to cover the absolute start and end of the days
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
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % property.images.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (i) => (i - 1 + property.images.length) % property.images.length,
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, property]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <div className="md:col-span-2 h-96 bg-gray-100 rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-[184px] bg-gray-100 rounded-lg" />
              <div className="h-[184px] bg-gray-100 rounded-lg" />
            </div>
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
              Cette maison d'hôte n'est plus disponible
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );

  const isWishlisted =
    user?.wishlist?.some((id) => id === property._id) ?? false;
  const images = property.images ?? [];
  const openLightboxAt = (url) => {
    const idx = images.findIndex((img) => img.url === url);
    setLightboxIndex(idx === -1 ? 0 : idx);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Custom Styles for Modern Classy Calendar */}
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
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="md:col-span-2">
            <img
              src={
                activeImage ||
                images[0]?.url ||
                "https://via.placeholder.com/800x600"
              }
              alt={property.title}
              onClick={() => activeImage && openLightboxAt(activeImage)}
              className="w-full h-96 object-cover rounded-xl cursor-zoom-in shadow-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((img, idx) => {
              const isLast = idx === 3 && images.length > 4;
              return (
                <div key={img._id} className="relative">
                  <img
                    src={img.url}
                    alt=""
                    onClick={() =>
                      isLast ? openLightboxAt(img.url) : setActiveImage(img.url)
                    }
                    className={`w-full h-[184px] object-cover rounded-xl cursor-pointer ring-2 transition-all ${
                      activeImage === img.url && !isLast
                        ? "ring-blue-600"
                        : "ring-transparent"
                    }`}
                  />
                  {isLast && (
                    <button
                      onClick={() => openLightboxAt(img.url)}
                      className="absolute inset-0 rounded-xl bg-black/50 text-white text-sm font-medium flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      +{images.length - 4} photos
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                {property.type}
              </span>
              {user && (
                <HeartIcon
                  filled={isWishlisted}
                  onClick={() => toggleWishlist(property._id)}
                />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {property.title}
            </h1>
            <p className="text-gray-500 mt-1">{property.location}, Tunisie</p>
          </div>
          <div className="sm:text-right shrink-0">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {property.pricePerNight?.toLocaleString()}{" "}
              <span className="text-xl">TND</span>
              <span className="text-sm font-normal text-gray-500 block sm:inline sm:ml-2">
                / nuit
              </span>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors w-full sm:w-auto shadow-sm"
            >
              Réserver maintenant
            </button>
          </div>
        </div>

        {/* Details & Sidebar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-100">
          <Stat
            icon={Users}
            label="Capacité Max"
            value={`${property.maxGuests} Personnes`}
          />
          <Stat
            icon={BedDouble}
            label="Chambres"
            value={`${property.bedrooms} Chambres`}
          />
          <Stat
            icon={Bath}
            label="Salles de Bain"
            value={`${property.bathrooms} SDB`}
          />
          <Stat
            icon={Moon}
            label="Séjour Min"
            value={`${property.minNights} Nuitée(s)`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 pt-8">
          <div className="md:w-2/3">
            <Section title="À propos du logement">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </Section>

            <Section title="Localisation">
              <div className="relative z-0 isolate rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <PropertyMap
                  lat={property.coordinates?.lat}
                  lng={property.coordinates?.lng}
                />
              </div>
              {property.address?.formattedAddress && (
                <p className="text-sm text-gray-500 mt-3">
                  {property.address.formattedAddress}
                </p>
              )}
            </Section>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Premium Calendar Container */}
              <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-base font-bold text-gray-900 mb-5">
                  Disponibilité
                </h3>
                <div className="custom-calendar-wrapper w-full">
                  <DatePicker
                    inline
                    readOnly
                    minDate={new Date()}
                    excludeDateIntervals={bookedDates}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>{" "}
                    Réservé
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full border border-gray-300"></div>{" "}
                    Libre
                  </span>
                </div>
              </div>

              {/* Host Info */}
              <div className="border border-gray-100 rounded-3xl p-6 bg-gray-50/50">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Hôte de la maison
                </h3>
                {property.host?.name ? (
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                        {property.host.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">
                          {property.host.name}
                        </p>
                        <p className="text-sm text-gray-500">Hôte vérifié</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-white border border-gray-200 text-gray-900 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Contacter l'hôte
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Aucune information sur l'hôte.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL IS HERE: Passing bookedDates prop down */}
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
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Fermer
          </button>
          <img
            src={images[lightboxIndex]?.url}
            alt=""
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    {Icon && (
      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 flex items-center justify-center shrink-0">
        <Icon size={18} strokeWidth={2} />
      </div>
    )}
    <div>
      <p className="text-sm font-bold text-gray-900 leading-tight">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const Section = ({ title, children, last }) => (
  <div className={last ? "mb-0" : "mb-10"}>
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

export default PropertyDetail;
