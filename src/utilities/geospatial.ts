// src/utilities/geospatial.ts

import * as turf from "@turf/turf";

export { distanceToPolygon, isPointInPolygon };

function isPointInPolygon(point: number[], polygon: number[]) {
  return turf.booleanPointInPolygon(point, polygon);
}

function distanceToPolygon(point: number[], polygon: number[]) {
  const polygonAsLine = turf.polygonToLine(polygon);
  return polygonAsLine.features.map((feature) => {
    return turf.pointToLineDistance(point, feature);
  }).sort()[0] || 0;
}
