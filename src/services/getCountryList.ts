// src/models/getCountryList.ts

import { cache } from '../data/cache.ts';

export function getCountryList() {
	const countries = [];
	for (const country of cache.countries.features) {
		countries.push({
			name: country.properties.ADMIN,
			href: `/country/${country.properties.ISO_A3.toLowerCase()}`,
		});
	}
	return countries;
}
