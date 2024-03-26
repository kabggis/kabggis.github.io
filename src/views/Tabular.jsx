import { useEffect, useState } from "react";

import { Table } from "../components";

export default function Tabular() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold">WEBGIS LAHAN PERTANIAN</h1>
      <h2 className="my-2 text-center text-lg font-bold">
        DINAS PERTANIAN KOTA BIMA
      </h2>
      <Table data={data} />
    </div>
  );
}
