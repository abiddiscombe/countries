// src/services/getCountryDetails.ts

import { Feature } from 'geojsonTypes';
import { cache } from '../utilities/cache.ts';

export function getCountryDetails(isoCode: string) {
    const matches = cache.features.filter((feature: Feature) => {
        if (feature.properties?.ISO_A2 === isoCode) {
            return {
                type: 'Feature',
                properties: feature.properties,
            };
        }
    });
    return (matches.length) ? matches[0] : {};
}
