import { Checkbox, GeoJSON, If } from "../components";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import { randomColor } from "../utils/random";
import useGeoJSON from "../hooks/useGeoJSON";

export default function Spatial() {
  const [showBatasWilayah, setShowBatasWilayah] = useState(true);
  const [showJaringanIrigasi, setShowJaringanIrigasi] = useState(true);

  const jaringanIrigasiGeoJSON = useGeoJSON("/jaringan-irigasi.geojson");
  const batasWilayahGeoJSON = useGeoJSON("/kabgor.geojson");

  const [features, setFeatures] = useState([]);
  useEffect(() => {
    if (jaringanIrigasiGeoJSON === null) return;

    const features = [];
    for (const feature of jaringanIrigasiGeoJSON.features) {
      const remark = feature.properties.REMARK;
      if (!features.find((r) => r.name === remark))
        features.push({
          name: remark,
          color: randomColor(),
          show: true,
        });
    }
    setFeatures(features);
  }, [jaringanIrigasiGeoJSON]);

  return (
    <div className="flex h-full">
      <MapContainer
        center={[0.7569440156221701, 122.61520767212]}
        zoom={10}
        className="flex-auto"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <If condition={showBatasWilayah}>
          <GeoJSON data={batasWilayahGeoJSON} bound={true} />
        </If>
        <If condition={showJaringanIrigasi}>
          <GeoJSON data={jaringanIrigasiGeoJSON} features={features} />
        </If>
      </MapContainer>
      <aside className="flex w-80 flex-col gap-2 overflow-y-auto bg-slate-100 px-8 py-4 text-slate-900">
        <h3 className="my-4 text-lg font-bold">Peta Kabupaten Gorontalo</h3>
        <Checkbox
          defaultChecked={showBatasWilayah}
          onChange={() => setShowBatasWilayah(!showBatasWilayah)}
          label="Batas Wilayah"
        />
        <Checkbox
          defaultChecked={showJaringanIrigasi}
          onChange={() => setShowJaringanIrigasi(!showJaringanIrigasi)}
          label="Jaringan Irigasi"
        />
        {features.map(({ name, color, show }) => {
          return (
            <Checkbox
              key={name}
              defaultChecked={show}
              label={name}
              color={color}
              disabled={!showJaringanIrigasi}
              className="ms-4"
              onChange={() => {
                setFeatures(
                  features.map((feature) => {
                    return {
                      ...feature,
                      show:
                        feature.name === name ? !feature.show : feature.show,
                    };
                  }),
                );
              }}
            />
          );
        })}
      </aside>
    </div>
  );
}
