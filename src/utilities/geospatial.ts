// src/utilities/geospatial.ts

import * as turf from '@turf/turf';

export function isPointInPolygon(point: number[], polygon: number[]) {
    return turf.booleanPointInPolygon(point, polygon);
}

export function distanceToPolygon(point: number[], polygon: number[]) {
    const output = turf.polygonToLine(polygon).features.map((feature) => {
        const featureGeom = (feature.geometry.type === 'MultiLineString') ? turf.flatten(feature).features : [feature];

        return featureGeom.map((feature) => {
            return turf.pointToLineDistance(point, feature);
        }).sort()[0];
    });

    return output.sort((eleA: number, eleB: number) => {
        return eleA - eleB;
    })[0] || 0;
}
