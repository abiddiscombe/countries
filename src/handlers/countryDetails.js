// src/handlers/countryDetails.js

import { cache } from '../utils/cache.js'
import { time } from "../utils/time.js"

export {
    countryDetails
}

function countryDetails(params) {

    let responseObject = {
        code: 200,
        body: {}
    }

    params.ccid = params.ccid.toLowerCase()

    if (!cache.acceptedCountryCodes.includes(params.ccid)) {

        responseObject = {
            code: 404,
            body: {
                ts: time.now(),
                metadata: {
                    title: `Not Found: CCID '${params.ccid}'`,
                    description: 'The provided Country Code ID was not recognised.',
                }
            }
        }

    } else {

        responseObject.body = {
            ts: time.now(),
            metadata: {
                title: `GeoJSON Country-Territory Response for '${params.ccid}'`,
                description: 'Returns geometry and attribution for the aforementioned country.',
            },
            type: "FeatureCollection",
            features: []
        }

        for (let country of cache.countries.features) {
            if (country.properties.ISO_A3 == params.ccid) {
                responseObject.body.features.push({
                    type: "Feature",
                    properties: {
                        href: `/${params.ccid}`,
                        name: country.properties.ADMIN,
                        code: country.properties.ISO_A3,
                        flag: `https://countryflagsapi.com/svg/${country.properties.ISO_A3}`
                    },
                    geometry: country.geometry
                })
            }
        }

    }

    return responseObject
}