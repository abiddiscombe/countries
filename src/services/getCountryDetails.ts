// src/handlers/countryDetails.js

import { cache } from '../data/cache.ts';

export function getCountryDetails(ccid) {
	ccid = ccid.toLowerCase();

	const countryDetails = [];

	for (const country of cache.countries.features) {
		if (country.properties.ISO_A3 == ccid) {
			countryDetails.push({
				type: 'Feature',
				properties: {
					href: `/country/${ccid}`,
					name: country.properties.ADMIN,
					code: country.properties.ISO_A3,
					flag: `https://countryflagsapi.com/svg/${country.properties.ISO_A3}`,
				},
				geometry: country.geometry,
			});
		}
	}

	return countryDetails;
}
