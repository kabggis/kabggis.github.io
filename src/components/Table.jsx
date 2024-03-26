import { useMemo, useState } from "react";

import Pagination from "./Pagination";
import PropTypes from "prop-types";
import Td from "./Td";
import Th from "./Th";

/**
 *
 * @param {object} props
 * @param {object[]} props.data
 * @returns {JSX.Element}
 */
export default function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [start, end] = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return [start, end];
  }, [currentPage, perPage]);

  const keys = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
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
  const dataToShow = useMemo(
    () => filteredData.slice(start, end),
    [filteredData, start, end],
  );

  return (
    <div className="flex flex-col gap-4">
      <form className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span>Tampilkan</span>
          <select
            className="rounded-md px-2 py-1 text-slate-600 outline-slate-400 focus:outline"
            value={perPage}
            onChange={(e) => {
              setCurrentPage(1);
              setPerPage(Number(e.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>data</span>
        </div>
        <input
          type="search"
          className="rounded-md px-4 py-2 text-slate-600 outline-slate-400 focus:outline"
          value={query}
          placeholder="Cari data ..."
          onInput={(e) => {
            setCurrentPage(1);
            setQuery(e.target.value);
          }}
        />
      </form>
      <div className="flex flex-wrap items-center justify-between gap-y-2">
        <p>
          Menampilkan {start + 1} sampai {Math.min(end, data.length)} dari{" "}
          {data.length} data
        </p>
        <Pagination
          current={currentPage}
          perPage={perPage}
          total={data.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <table className="w-full bg-slate-100">
        <thead className="border-b border-slate-400 text-slate-700">
          <tr>
            <Th>#</Th>
            {keys.map((key) => (
              <Th key={key}>{key}</Th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {dataToShow.map((row, i) => (
            <tr
              key={i}
              className="bg-slate-100 odd:bg-slate-200 hover:bg-slate-300"
            >
              <Td className="text-center">{i + start + 1}</Td>
              {keys.map((key) => (
                <Td key={key}>{row[key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap items-center justify-between gap-y-2">
        <p>
          Menampilkan {start + 1} sampai {Math.min(end, data.length)} dari{" "}
          {data.length} data
        </p>
        <Pagination
          current={currentPage}
          perPage={perPage}
          total={data.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
