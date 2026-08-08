import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeartIcon from "../components/HeartIcon";
import ContactAgentModal from "../components/ContactAgentModal";
import PropertyMap from "../components/PropertyMap";
import { useAuth } from "../context/AuthContext";
import { BedDouble, Bath, Ruler, CalendarDays } from "lucide-react";

/**
 * Palette (site's primary blue, used sparingly — arbitrary values so no
 * tailwind.config.js changes are needed):
 *   blue        #1D4ED8   price, links, primary buttons, active states
 *   blue-light  #EFF4FF   soft tint for badges/backgrounds
 *   ink         gray-900  headings / body text
 *   muted       gray-500  secondary text
 *   line        gray-200  hairline borders
 */

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Lightbox state — purely presentational, added for the gallery.
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { user, toggleWishlist } = useAuth();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);
        if (res.data.images.length > 0) setActiveImage(res.data.images[0].url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
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
              <div className="h-[184px] bg-gray-100 rounded-lg" />
              <div className="h-[184px] bg-gray-100 rounded-lg" />
            </div>
          </div>
          <div className="h-7 w-2/3 bg-gray-100 rounded mb-3" />
          <div className="h-4 w-1/3 bg-gray-100 rounded" />
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
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">404</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              This listing is no longer available
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
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {/* ---------- Gallery ---------- */}
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
              className="w-full h-96 object-cover rounded-lg cursor-zoom-in"
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
                    className={`w-full h-[184px] object-cover rounded-lg cursor-pointer ring-2 transition-colors ${
                      activeImage === img.url && !isLast
                        ? "ring-[#1D4ED8]"
                        : "ring-transparent"
                    }`}
                  />
                  {isLast && (
                    <button
                      onClick={() => openLightboxAt(img.url)}
                      className="absolute inset-0 rounded-lg bg-black/50 text-white text-sm font-medium flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      +{images.length - 4} photos
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Title + price row ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#EFF4FF] text-[#1D4ED8]">
                {property.status}
              </span>
              {user && (
                <HeartIcon
                  filled={isWishlisted}
                  onClick={() => toggleWishlist(property._id)}
                />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {property.title}
            </h1>
            <p className="text-gray-500 mt-1">{property.location}</p>
          </div>
          <div className="sm:text-right shrink-0">
            <p className="text-2xl md:text-3xl font-semibold text-[#1D4ED8]">
              {property.price.toLocaleString()} TND
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 text-sm font-medium text-[#1D4ED8] hover:underline"
            >
              Enquire now
            </button>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-6 border-b border-gray-200">
          <Stat icon={BedDouble} label="Beds" value={property.beds} />
          <Stat icon={Bath} label="Baths" value={property.baths} />
          <Stat icon={Ruler} label="m²" value={property.sqft} />
          {property.yearBuilt && (
            <Stat
              icon={CalendarDays}
              label="Year built"
              value={property.yearBuilt}
            />
          )}
        </div>

        {/* ---------- Body ---------- */}
        <div className="flex flex-col md:flex-row gap-12 pt-8">
          <div className="md:w-2/3">
            <Section title="Description">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </Section>

            <Section title="Location">
              <div className="relative z-0 isolate rounded-lg overflow-hidden border border-gray-200">
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

            {property.features?.length > 0 && (
              <Section title="Features">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {property.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {property.amenities?.length > 0 && (
              <Section title="Amenities" last>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {property.amenities.map((am, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] shrink-0" />
                      {am}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          {/* ---------- Sidebar ---------- */}
          <div className="md:w-1/3">
            <div className="sticky top-8 space-y-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-900 mb-4">
                  Listing agent
                </p>
                {property.agent?.name ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-[#EFF4FF] text-[#1D4ED8] font-semibold flex items-center justify-center">
                        {property.agent.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium leading-tight">
                          {property.agent.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {property.agent.phone}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 break-all">
                      {property.agent.email}
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-[#1D4ED8] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#1741B0] transition-colors"
                    >
                      Contact agent
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No agent info provided.
                  </p>
                )}
              </div>

              {property.address?.formattedAddress && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Address
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {property.address.formattedAddress}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ---------- Lightbox ---------- */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-sm font-medium"
          >
            Close
          </button>

          {images.length > 1 && (
            <button
              onClick={() =>
                setLightboxIndex((i) => (i - 1 + images.length) % images.length)
              }
              className="absolute left-4 md:left-8 text-white/70 hover:text-white text-3xl px-2"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          <img
            src={images[lightboxIndex]?.url}
            alt=""
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />

          {images.length > 1 && (
            <button
              onClick={() => setLightboxIndex((i) => (i + 1) % images.length)}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white text-3xl px-2"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          <p className="absolute bottom-6 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {/* Contact Agent Modal */}
      {showModal && (
        <ContactAgentModal
          propertyId={property._id}
          onClose={() => setShowModal(false)}
        />
      )}

      <Footer />
    </div>
  );
};

/** Small labeled stat block with an icon. */
const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    {Icon && (
      <div className="w-9 h-9 rounded-lg bg-[#EFF4FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
        <Icon size={18} strokeWidth={2} />
      </div>
    )}
    <div>
      <p className="text-lg font-semibold text-gray-900 leading-tight">
        {value}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  </div>
);

/** Section wrapper with consistent heading + spacing rhythm. */
const Section = ({ title, children, last }) => (
  <div className={last ? "mb-0" : "mb-10"}>
    <h2 className="text-base font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

export default PropertyDetail;
