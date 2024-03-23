import { GeoJSON, useMap } from "react-leaflet";

import PropTypes from "prop-types";
import bbox from "@turf/bbox";
import { useEffect } from "react";

export default function GeoJSONBound({ data, ...props }) {
  const map = useMap();
  useEffect(() => {
    if (data) {
      const bounds = bbox(data);
      const corner1 = [bounds[1], bounds[0]];
      const corner2 = [bounds[3], bounds[2]];
      map.fitBounds([corner1, corner2]);
    }
  }, [data, map]);

  return data ? <GeoJSON data={data} {...props} /> : null;
}

GeoJSONBound.propTypes = {
  data: PropTypes.object,
  props: PropTypes.object,
};
