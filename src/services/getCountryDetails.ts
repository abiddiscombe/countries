// src/handlers/countryDetails.ts

import { cache } from '../utilities/cache.ts';

function _parseResponse(feature: any, cacheStatus: boolean) {
	return {
		type: 'Feature',
		properties: {
			href: `/country/${feature.properties.ISO_A3}`,
			name: feature.properties.ADMIN,
			code: feature.properties.ISO_A3,
			flag: `https://countryflagsapi.com/svg/${feature.properties.ISO_A3}`,
			cached: cacheStatus
		},
		geometry: {
			...feature.geometry
		}
	}
}

export async function getCountryDetails(ccid: string) {

	if (!cache.validCountries.ISO_A3.includes(ccid)) {
		return {} // invalid ccid
	}

	for (const feature of cache.features) {
		if (feature.properties.ISO_A3 == ccid) {
			return _parseResponse(feature, true)
		}
	}

	const url = `https://${cache.source}/countries/features/${ccid}.json`;
	const src = await fetch(url);
	const feature = await src.json()

	cache.features.push(feature)

	return _parseResponse(feature, false);

}
