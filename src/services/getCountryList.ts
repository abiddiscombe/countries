// src/services/getCountryList.ts

import { cache } from "../utilities/cache.ts";

export function getCountryList() {
  const countries = [];
  for (const id in cache.validCountries.ISO_A3) {
    countries.push({
      name: cache.validCountries.ADMIN[id],
      href: `/country/${cache.validCountries.ISO_A3[id]}`,
    });
  }
  return countries;
}
