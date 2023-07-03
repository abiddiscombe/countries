// src/services/getCountryOutline.ts

import { Feature } from 'geojsonTypes';
import { cache } from '../utilities/cache.ts';

export function getCountryOutline(isoCode: string) {
    const matches = cache.features.filter((feature: Feature) => {
        if (feature.properties?.ISO_A2 === isoCode) {
            return feature;
        }
    });
    return (matches.length) ? matches[0] : {};
}
