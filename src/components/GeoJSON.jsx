import { GeoJSON as LeafletGeoJSON, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import bbox from "@turf/bbox";

/**
 * @param {object} props
 * @param {{
 *     name: string,
 *     color: string,
 *     show: boolean
 *   }[]
 * } props.features
 * @returns
 */
export default function GeoJSON({ data, features, bound = false, ...props }) {
  const map = useMap();
  useEffect(() => {
    if (data && bound) {
      const bounds = bbox(data);
      const corner1 = [bounds[1], bounds[0]];
      const corner2 = [bounds[3], bounds[2]];
      map.fitBounds([corner1, corner2]);
    }
  }, [data, map, bound]);

  const [randomKey, setRandomKey] = useState(false);
  useEffect(() => setRandomKey((prev) => !prev), [features, data]);

  return data ? (
    <LeafletGeoJSON
      key={randomKey}
      data={data}
      style={(feature) => {
        if (!features) return;
        const foundFeature = features.find(
          (f) => f.name === feature.properties.REMARK,
        );
        if (foundFeature) return { color: foundFeature.color };
      }}
      filter={(feature) => {
        if (!features) return true;

        const foundFeature = features.find(
          (f) => f.name === feature.properties.REMARK,
        );
        if (foundFeature) return foundFeature.show;
        return true;
      }}
      {...props}
    />
  ) : null;
}

GeoJSON.propTypes = {
  data: PropTypes.object,
  features: PropTypes.arrayOf(PropTypes.object),
  bound: PropTypes.bool,
  props: PropTypes.object,
};
