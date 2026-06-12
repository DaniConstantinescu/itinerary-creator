"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  pins?: {
    lat?: number;
    long?: number;
    name: string;
  }[];
}

export default function Map({ pins }: MapProps) {
  return (
    <MapContainer
      center={[48.863452, 2.334594]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full rounded-4xl overflow-hidden"
    >
      <TileLayer
        attribution="&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {pins?.map((p, index) => {
        if (!p.lat || !p.long) {
          return;
        }

        return (
          <Marker key={`pin-${p.name}-${index}`} position={[p.lat, p.long]}>
            <Popup>{p.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
