import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Advanced Holographic Marker
const holoMarkerIcon = new L.DivIcon({
  className: "bg-transparent border-none",
  html: `
    <div class="relative flex items-center justify-center w-20 h-20 group">
      <div class="absolute inset-0 border border-amber-400/40 rounded-full animate-[spin_3s_linear_infinite] border-t-amber-500/90"></div>
      <div class="absolute inset-2 bg-amber-500/20 rounded-full animate-ping duration-1000"></div>
      
      <div class="relative z-10 flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-500">
        <div class="w-8 h-8 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 border-[3px] border-white rounded-full shadow-[0_10px_20px_rgba(234,88,12,0.6)] flex items-center justify-center">
          <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
        </div>
        <div class="w-1 h-4 bg-gradient-to-b from-orange-600 to-transparent"></div>
      </div>
      
      <div class="absolute bottom-1 w-6 h-1.5 bg-black/50 blur-[2px] rounded-[100%] group-hover:scale-75 group-hover:opacity-50 transition-all duration-500"></div>
    </div>
  `,
  iconSize: [80, 80],
  iconAnchor: [40, 60],
});

// Clean 2D UI Overlay (Now safe from map distortions)
const AdvancedMapUI = ({ map, center, zoom }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2000]">

      {/* Top Right: Controls */}
      <div className="absolute top-5 right-5 flex flex-col gap-3 pointer-events-auto">
        <div className="flex flex-col bg-white/90 backdrop-blur-md border border-white shadow-xl rounded-2xl overflow-hidden">
          <button
            onClick={() => map.zoomIn()}
            className="w-12 h-12 flex items-center justify-center text-stone-700 hover:text-amber-600 hover:bg-stone-50 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 6v12M6 12h12"
              />
            </svg>
          </button>
          <div className="w-8 h-[2px] bg-stone-200 mx-auto"></div>
          <button
            onClick={() => map.zoomOut()}
            className="w-12 h-12 flex items-center justify-center text-stone-700 hover:text-amber-600 hover:bg-stone-50 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => map.flyTo(center, zoom, { duration: 1.5 })}
          className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md border border-white shadow-xl rounded-2xl text-stone-700 hover:text-amber-600 hover:bg-stone-50 transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Left: Compass */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white flex flex-col items-center justify-between py-1.5 relative">
          <span className="text-[10px] font-bold text-red-500 z-10">N</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-stone-300/80 rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-stone-300/80 -rotate-45"></div>
          <span className="text-[8px] font-bold text-stone-400 z-10">S</span>
        </div>
      </div>
    </div>
  );
};

const PropertyMap = ({ lat, lng }) => {
  const [mapInstance, setMapInstance] = useState(null);

  if (!lat || !lng || (lat === 0 && lng === 0)) {
    return (
      <div className="bg-stone-100 rounded-[2.5rem] border-2 border-stone-200 p-12 text-center text-stone-400 flex flex-col items-center justify-center min-h-[500px]">
        <p className="text-xl font-semibold text-stone-500">
          Awaiting Coordinates
        </p>
      </div>
    );
  }

  const defaultCenter = [lat, lng];
  const defaultZoom = 13;

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#ebe8e2] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 h-[550px] w-full">
      {/* Map layer - 100% stable 2D */}
      <div className="absolute inset-0 w-full h-full">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          zoomControl={false}
          whenReady={(e) => setMapInstance(e.target)}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />

          <Circle
            center={defaultCenter}
            radius={1200}
            pathOptions={{
              color: "#f59e0b",
              fillColor: "#fcd34d",
              fillOpacity: 0.1,
              weight: 1,
              dashArray: "4 8",
            }}
          />
          <Circle
            center={defaultCenter}
            radius={300}
            pathOptions={{
              color: "#ea580c",
              fillColor: "transparent",
              weight: 2,
            }}
          />

          <Marker position={defaultCenter} icon={holoMarkerIcon} />
        </MapContainer>
      </div>

      {/* UI Layer - Renders strictly on top */}
      {mapInstance && (
        <AdvancedMapUI
          map={mapInstance}
          center={defaultCenter}
          zoom={defaultZoom}
        />
      )}
    </div>
  );
};

export default PropertyMap;
