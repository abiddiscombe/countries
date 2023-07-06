// src/utilities/cache.ts

import { FeatureCollection } from 'geojsonTypes';

export const cache: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
};

export async function initCache() {
    try {
        const dataRaw = await Deno.readTextFile('src/data/countries.geojson');
        const dataParsed = JSON.parse(dataRaw);
        for (const feature of dataParsed.features) {
            cache.features.push(feature);
        }
    } catch {
        throw new Error('Failed to read or parse the source dataset.');
    }
}
