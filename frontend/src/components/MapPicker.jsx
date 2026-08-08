import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPicker = ({ position, setPosition, address }) => {
  const [searchAddress, setSearchAddress] = useState(address || '');

  const handleGeocode = async () => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Geocoding failed');
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Search address and press search"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button type="button" onClick={handleGeocode} className="bg-gray-200 px-4 rounded">
          Search
        </button>
      </div>
      <MapContainer center={[position.lat || 40.7128, position.lng || -74.006]} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position.lat && position.lng && <Marker position={[position.lat, position.lng]} />}
        <MapClickHandler />
      </MapContainer>
      <p className="text-sm mt-1">Click on map to set location</p>
    </div>
  );
};

export default MapPicker;