import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Table } from "../components";
import useGeoJSON from "../hooks/useGeoJSON";
import { useMemo } from "react";

export default function Tabular() {
  const [geoJSON] = useGeoJSON("sawah");
  const features = useMemo(
    () =>
      geoJSON
        ? geoJSON.features
            .map((feature) => feature.properties)
            .filter(
              (value, index, self) =>
                self.findIndex((t) => t.DESA === value.DESA) === index,
            )
            .map((record) => ({
              Desa: record.DESA,
              Kecamatan: record.KECAMATAN,
              Luas: record.LUAS_HA + " Ha",
              Keterangan: record.KETERANGAN,
            }))
        : [],
    [geoJSON],
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded bg-slate-50 px-2 py-1 text-slate-800 transition-colors hover:bg-slate-100"
      >
        <FaArrowLeft className="inline-block h-[1em]" /> Kembali
      </Link>
      <h1 className="text-center text-3xl font-bold uppercase">
        kawasan pertanian
      </h1>
      <h2 className="my-2 text-center text-lg font-bold uppercase">
        kabupaten gorontalo
      </h2>
      <Table data={features} />
    </div>
  );
}
