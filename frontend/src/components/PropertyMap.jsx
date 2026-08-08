import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

// Custom amber marker icon
const amberIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PropertyMap = ({ lat, lng }) => {
  if (!lat || !lng || (lat === 0 && lng === 0)) {
    return (
      <div className="bg-stone-100 rounded-2xl border border-stone-200 p-8 text-center text-stone-400">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-stone-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-sm font-medium">Location not available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-stone-200">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "320px", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={amberIcon} />
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
