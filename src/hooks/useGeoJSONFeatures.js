import { useEffect, useState } from "react";

import { randomColor } from "../utils/random";

export default function useGeoJSONFeatures(geoJSON, matchFeature) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (geoJSON === null) return;

    const features = [];
    geoJSON.features.forEach((feature) => {
      const [indexFeature, name] = matchFeature(feature, features);
      if (indexFeature === -1) {
        features.push({
          color: randomColor(),
          geoJSON: {
            ...geoJSON,
            name,
            features: [feature],
          },
        });
      } else {
        features[indexFeature].geoJSON.features.push(feature);
      }
    });

    setFeatures(features);
  }, [geoJSON, matchFeature]);

  return features;
}
