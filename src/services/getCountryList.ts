// // src/services/getCountryList.ts

import { Feature } from 'geojsonTypes';
import { cache } from '../utilities/cache.ts';

export function getCountryList() {
    return cache.features.map((feature: Feature) => {
        return [
            feature.properties!.ADMIN,
            feature.properties!.ISO_A2,
        ];
    });
}
