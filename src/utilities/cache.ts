// src/utilities/cache.ts

import { FeatureCollection } from 'geojsonTypes';

export const cache: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
};

export async function initCache() {
    try {
        const raw = await Deno.readTextFile('src/data/countries.geojson');
        cache.features = JSON.parse(raw).features;
    } catch {
        throw new Error('Failed to read or parse the source dataset.');
    }
}
