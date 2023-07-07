// src/utilities/geospatial.ts

import { Feature } from 'geojsonTypes';
import * as turf from '@turf/turf';

export function isPointInPolygon(point: number[], polygon: Feature) {
    return turf.booleanPointInPolygon(point, polygon);
}

export function distanceToPolygon(point: number[], polygon: Feature) {
    const output = turf.polygonToLine(polygon).features.map((feature: Feature) => {
        const featureGeom = (feature.geometry.type === 'MultiLineString')
            ? turf.flatten(feature).features
            : [feature];

        return featureGeom.map((feature: Feature) => {
            return turf.pointToLineDistance(point, feature);
        }).sort()[0];
    });

    return output.sort((eleA: number, eleB: number) => {
        return eleA - eleB;
    })[0] || 0;
}
