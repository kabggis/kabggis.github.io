import { Checkbox, GeoJSON, If } from "../components";
import { MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { randomColor } from "../utils/random";
import useGeoJSON from "../hooks/useGeoJSON";

export default function Spatial() {
  const [
    administrasiGeoJSON,
    showAdministrasi,
    setShowAdministrasi,
    colorAdministrasi,
  ] = useGeoJSON("administrasi");
  // const [kecamatanGeoJSON, showKecamatan, setShowKecamatan, colorKecamatan] =
  //   useGeoJSON("kecamatan");
  const [
    jaringanIrigasiGeoJSON,
    showJaringanIrigasi,
    setShowJaringanIrigasi,
    colorJaringanIrigasi,
  ] = useGeoJSON("jaringan-irigasi");

  // const [featuresKecamatan, setFeaturesKecamatan] = useState([]);
  // useEffect(() => {
  //   if (kecamatanGeoJSON === null) return;

  //   const features = [];
  //   for (const feature of kecamatanGeoJSON.features) {
  //     const name = feature.properties.NAMOBJ;
  //     if (!features.find((r) => r.name === name))
  //       features.push({
  //         name,
  //         color: randomColor(),
  //         show: true,
  //       });
  //   }
  //   setFeaturesKecamatan(features);
  // }, [kecamatanGeoJSON]);

  const [featuresJaringanIrigasi, setFeaturesJaringanIrigasi] = useState([]);
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
    setFeaturesJaringanIrigasi(features);
  }, [jaringanIrigasiGeoJSON]);

  return (
    <div className="relative isolate flex h-svh">
      <NavLink
        to="/"
        className="absolute left-16 top-4 inline-flex items-center gap-2 rounded bg-slate-50 px-2 py-1 text-slate-800 shadow-md transition-colors hover:bg-slate-100"
      >
        <FaArrowLeft className="inline-block h-[1em]" /> Kembali
      </NavLink>
      <MapContainer
        center={[0.7569440156221701, 122.61520767212]}
        zoom={10}
        className="-z-10 flex-auto"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <If condition={showAdministrasi}>
          <GeoJSON data={administrasiGeoJSON} color={colorAdministrasi}>
            <Tooltip sticky>Wilayah Administrasi</Tooltip>
          </GeoJSON>
        </If>
        {/* <If condition={showKecamatan}>
          <GeoJSON
            data={kecamatanGeoJSON}
            features={featuresKecamatan}
            color={colorKecamatan}
          />
        </If> */}
        <If condition={showJaringanIrigasi}>
          <GeoJSON
            data={jaringanIrigasiGeoJSON}
            features={featuresJaringanIrigasi}
            color={colorJaringanIrigasi}
          />
        </If>
      </MapContainer>
      <aside className="flex w-80 flex-col overflow-y-auto bg-slate-100 px-8 py-4 text-slate-900">
        <h3 className="my-4 text-lg font-bold">Peta Kabupaten Gorontalo</h3>
        <Checkbox
          defaultChecked={showAdministrasi}
          onChange={() => setShowAdministrasi(!showAdministrasi)}
          label="Wilayah Administrasi"
          color={colorAdministrasi}
        />
        {/* <Checkbox
          defaultChecked={showKecamatan}
          onChange={() => setShowKecamatan(!showKecamatan)}
          label="Batas Kecamatan"
          color={colorKecamatan}
        />
        {featuresKecamatan.map(({ name, color, show }) => (
          <Checkbox
            key={name}
            defaultChecked={show}
            label={name}
            color={color}
            disabled={!showKecamatan}
            className="ms-4"
            onChange={() => {
              setFeaturesKecamatan(
                featuresKecamatan.map((feature) => {
                  return {
                    ...feature,
                    show: feature.name === name ? !feature.show : feature.show,
                  };
                }),
              );
            }}
          />
        ))} */}
        <Checkbox
          defaultChecked={showJaringanIrigasi}
          onChange={() => setShowJaringanIrigasi(!showJaringanIrigasi)}
          label="Jaringan Irigasi"
          color={colorJaringanIrigasi}
        />
        {featuresJaringanIrigasi.map(({ name, color, show }) => (
          <Checkbox
            key={name}
            defaultChecked={show}
            label={name}
            color={color}
            disabled={!showJaringanIrigasi}
            className="ms-4"
            onChange={() => {
              setFeaturesJaringanIrigasi(
                featuresJaringanIrigasi.map((feature) => {
                  return {
                    ...feature,
                    show: feature.name === name ? !feature.show : feature.show,
                  };
                }),
              );
            }}
          />
        ))}
      </aside>
    </div>
  );
}
