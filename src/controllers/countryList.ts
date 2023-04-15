// src/controllers/countryList.ts

import { newHeader } from "../utilities/header.ts";
import { getCountryList } from "../models/getCountryList.ts"

export function countryList(ctx) {

    const res = newHeader("Countries API - Country List");

    ctx.response.body = {
        ...res,
        countries: getCountryList()
    }

}