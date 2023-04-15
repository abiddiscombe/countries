// src/controllers/countryData.ts

import { newHeader } from "../utilities/header.ts";
import { getCountryDetails } from "../models/getCountryDetails.ts"

export function countryData(ctx) {

    const ccid = ctx.params.ccid.toLowerCase()
    const res = newHeader(`Countries API - Country Data: ${ccid}`)

    const returnedCountries = getCountryDetails(ccid)

    if (!returnedCountries.length) {
        ctx.response.status = 404;
        ctx.response.body = {
            ...res,
            error: "CCID not recognised."
        }
        return
    }

    ctx.response.body = {
        ...res,
        type: "FeatureCollection",
        features: returnedCountries
    }

}