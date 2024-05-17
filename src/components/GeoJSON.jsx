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
export default function GeoJSON({
  data,
  features,
  color = "#3399ff",
  fill = false,
  stroke = false,
  weight = 2,
  opacity = 0.5,
  bound = false,
  findMatchingFeature = () => false,
  ...props
}) {
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
      style={(featureGeoJSON) => {
        const defaultStyle = {
          color,
          weight,
          fillOpacity: fill ? opacity : 0,
          stroke,
        };
        if (!features) return defaultStyle;
        const foundFeature = features.find((feature) =>
          findMatchingFeature(feature, featureGeoJSON),
        );
        if (foundFeature) return { ...defaultStyle, color: foundFeature.color };
      }}
      filter={(featureGeoJSON) => {
        if (!features) return true;
        const foundFeature = features.find((feature) =>
          findMatchingFeature(feature, featureGeoJSON),
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
  color: PropTypes.string,
  fill: PropTypes.bool,
  stroke: PropTypes.bool,
  weight: PropTypes.number,
  opacity: PropTypes.number,
  features: PropTypes.arrayOf(PropTypes.object),
  bound: PropTypes.bool,
  findMatchingFeature: PropTypes.func,
  props: PropTypes.object,
};
