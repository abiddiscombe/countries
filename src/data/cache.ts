// src/data/cache.js

export { cache, loadCache };

const cache = {
	countries: {},
	acceptedCountryCodes: [],
};

async function loadCache() {
	const countries = await Deno.readTextFile('./src/data/countries.geojson');
	cache.countries = await JSON.parse(countries);
	for (let i = 0; i < cache.countries.features.length; i++) {
		cache.countries.features[i].properties.ISO_A3 = cache.countries.features[i].properties.ISO_A3.toLowerCase();
		cache.acceptedCountryCodes.push(cache.countries.features[i].properties.ISO_A3);
	}
}
