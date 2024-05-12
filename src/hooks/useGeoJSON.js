import { useEffect, useMemo, useState } from "react";

import { randomColor } from "../utils/random";

export default function useGeoJSON(name) {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(true);
  const color = useMemo(() => randomColor(), []);

  useEffect(() => {
    fetch(`/geojson/${name}.geojson`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [name]);

  return [data, show, setShow, color];
}
