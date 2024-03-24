import { useMemo, useState } from "react";

import PropTypes from "prop-types";
import Td from "./Td";
import Th from "./Th";

export default function Table({ title, data }) {
  const keys = useMemo(
    () => Object.keys(data.length > 0 ? data[0] : []),
    [data],
  );

  const [query, setQuery] = useState("");
  const filteredData = useMemo(
    () =>
      data.filter((datum) =>
        keys.some((key) =>
          datum[key].toString().toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    [data, query, keys],
  );

  return (
    <div>
      <form className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-xs">
            Menampilkan {filteredData.length}/{data.length} data
          </p>
        </div>
        <input
          type="search"
          className="rounded-md px-4 py-2 text-slate-600 outline-slate-400 focus:outline"
          value={query}
          placeholder="Cari data ..."
          onInput={(e) => setQuery(e.target.value)}
        />
      </form>
      <table className="mt-4 w-full bg-slate-100">
        <thead className="border-b border-slate-400 text-slate-700">
          <tr>
            <Th>#</Th>
            {keys.map((key) => (
              <Th key={key}>{key}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {filteredData.map((row, i) => (
            <tr
              key={i}
              className="bg-slate-100 odd:bg-slate-200 hover:bg-slate-300"
            >
              <Td className="text-center">{i + 1}</Td>
              {keys.map((key) => (
                <Td key={key}>{row[key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
