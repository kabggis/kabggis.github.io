import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import { GeoJSONBound } from "../components";

export default function Spatial() {
  const [geojson, setGeojson] = useState(null);
  useEffect(() => {
    fetch("/kabgor.geojson")
      .then((res) => res.json())
      .then((data) => setGeojson(data));
  }, []);

  return (
    <MapContainer
      center={[0.7569440156221701, 122.61520767212]}
      zoom={10}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSONBound data={geojson}></GeoJSONBound>
    </MapContainer>
  );
}
