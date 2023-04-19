// src/controllers/countryData.ts

import { newHeader } from "../utilities/header.ts";
import { getCountryDetails } from "../services/getCountryDetails.ts";

export async function countryData(ctx) {
  const ccid = ctx.params.ccid.toUpperCase();
  const res = newHeader(`Countries API - Country Data: ${ccid}`);

  const returnedCountries = await getCountryDetails(ccid);

  if (!returnedCountries.type) {
    ctx.response.status = 404;
    ctx.response.body = {
      ...res,
      error: "CCID not recognised.",
    };
    return;
  }

  ctx.response.body = {
    ...res,
    type: "FeatureCollection",
    features: [
      returnedCountries,
    ],
  };
}
