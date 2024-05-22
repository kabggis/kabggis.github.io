import "leaflet/dist/leaflet.css";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Popup,
  ScaleControl,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import { FaArrowLeft } from "react-icons/fa6";
import { GeoJSON } from "../components";
import { NavLink } from "react-router-dom";
import { useCallback } from "react";
import useGeoJSON from "../hooks/useGeoJSON";
import useGeoJSONFeatures from "../hooks/useGeoJSONFeatures";

export default function Spatial() {
  const [administrasiGeoJSON, colorAdministrasi] = useGeoJSON("administrasi");

  const [kecamatanGeoJSON] = useGeoJSON("kecamatan");
  const kecamatanMatchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.NAMOBJ === feature.properties.NAMOBJ,
      ),
      "Kecamatan " + feature.properties.NAMOBJ,
    ],
    [],
  );
  const kecamatanFeatures = useGeoJSONFeatures(
    kecamatanGeoJSON,
    kecamatanMatchFeature,
  );

  const [jaringanIrigasiGeoJSON] = useGeoJSON("jaringan-irigasi");
  const matchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.REMARK === feature.properties.REMARK,
      ),
      feature.properties.REMARK,
    ],
    [],
  );
  const jaringanIrigasiFeatures = useGeoJSONFeatures(
    jaringanIrigasiGeoJSON,
    matchFeature,
  );

  const [sawahGeoJSON] = useGeoJSON("sawah");
  const sawahMatchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.DESA === feature.properties.DESA,
      ),
      "Sawah Desa " + feature.properties.DESA,
    ],
    [],
  );
  const sawahFeatures = useGeoJSONFeatures(sawahGeoJSON, sawahMatchFeature);

  return (
    <div className="relative isolate flex h-svh">
      <NavLink
        to="/"
        className="absolute left-16 top-4 inline-flex items-center gap-2 rounded bg-slate-50 px-2 py-1 text-slate-800 shadow-md transition-colors hover:bg-slate-100"
      >
        <FaArrowLeft className="inline-block h-[1em]" /> Kembali
      </NavLink>

      <h1 className="absolute left-1/2 top-4 z-10 mx-auto w-fit -translate-x-1/2 rounded bg-white/30 px-2 py-1 text-center text-xl font-bold text-slate-800 backdrop-blur">
        Peta Spasial Kabupaten Gorontalo
      </h1>

      <MapContainer
        center={[0.7569440156221701, 122.61520767212]}
        zoom={10}
        className="-z-10 flex-auto"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satelite View">
            <TileLayer
              attribution='&copy; CNES, Distribution Airbus DS, &copy; Airbus DS, &copy; PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
              ext="jpg"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Batas Admininstrasi">
            <LayerGroup>
              <GeoJSON
                data={administrasiGeoJSON}
                color={colorAdministrasi}
                stroke
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Kecamatan">
            <LayerGroup>
              {kecamatanFeatures.map(({ geoJSON, color }) => (
                <GeoJSON
                  key={geoJSON.name}
                  data={geoJSON}
                  color={color}
                  fill
                  opacity={0.3}
                >
                  <Tooltip sticky>{geoJSON.name}</Tooltip>
                </GeoJSON>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Sawah">
            <LayerGroup>
              {sawahFeatures.map(({ geoJSON, color }) => (
                <GeoJSON
                  key={geoJSON.name}
                  data={geoJSON}
                  color={color}
                  fill
                  stroke
                  opacity={1}
                >
                  <Tooltip sticky>{geoJSON.name}</Tooltip>
                  <Popup>
                    <table>
                      <tr>
                        <th>Nama</th>
                        <td>:</td>
                        <td>{geoJSON.name}</td>
                      </tr>
                      <tr>
                        <th>Kecamatan</th>
                        <td>:</td>
                        <td>{geoJSON.features[0].properties.KECAMATAN}</td>
                      </tr>
                      <tr>
                        <th>Total Luas</th>
                        <td>:</td>
                        <td>
                          {geoJSON.features
                            .reduce(
                              (acc, feature) =>
                                acc + feature.properties.LUAS_HA,
                              0,
                            )
                            .toFixed(2)}
                          ha
                        </td>
                      </tr>
                    </table>
                  </Popup>
                </GeoJSON>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {jaringanIrigasiFeatures.map(({ geoJSON, color }) => (
            <LayersControl.Overlay
              key={geoJSON.name}
              checked
              name={geoJSON.name}
            >
              <GeoJSON data={geoJSON} color={color} stroke weight={3}>
                <Tooltip sticky>{geoJSON.name}</Tooltip>
              </GeoJSON>
            </LayersControl.Overlay>
          ))}
        </LayersControl>

        <ScaleControl position="bottomleft" maxWidth={200} />
      </MapContainer>

      <footer className="absolute bottom-4 left-1/2 right-0 w-fit -translate-x-1/2 rounded bg-white/30 px-2 py-1 text-center text-slate-800 backdrop-blur">
        Copyright &copy; 2024{" "}
        <a href="https://github.com/kabggis/" target="_blank">
          Kabggis Team
        </a>
      </footer>
    </div>
  );
}
