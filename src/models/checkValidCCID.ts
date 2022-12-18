// src/handlers/countryDetails.js

import { cache } from '../data/cache.ts';

export function checkValidCCID(ccid: string) {
	return cache.acceptedCountryCodes.includes(ccid);
}
