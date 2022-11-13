// src/handlers/countryRandomPoint.js

import bbox from '@turf/bbox'
import { randomPoint } from '@turf/random'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

import { cache } from '../utils/cache.js'
import { time } from "../utils/time.js"

export {
    countryRandomPoint
}

function countryRandomPoint(params) {

    params.ccid = params.ccid.toLowerCase()

    let responseObject = {
        code: 200,
        body: {}
    }

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

    } else if (params.totalPoints > 1000 || params.totalPoints < 1) {

        responseObject = {
            code: 400,
            body: {
                ts: time.now(),
                metadata: {
                    title: `Invalid number of random points.`,
                    description: 'This API will only return a range of 1 to 1,000 features per request.',
                }
            }
        }

    } else {

        responseObject.body = {
            ts: time.now(),
            metadata: {
                title: `GeoJSON Random-Point(s) Response for '${params.ccid}'`,
                description: 'Returns random points contained within the aforementioned country.',
            },
            type: "FeatureCollection",
            features: []
        }

        for (let country of cache.countries.features) {
            if (country.properties.ISO_A3 == params.ccid) {

                let ccBbox = bbox(country)
                
                for (let i = 0; i < params.totalPoints; i++) {

                    let statusFlag = false
                    let tempPoint

                    while (!statusFlag) {
                        tempPoint = randomPoint(1, {bbox: ccBbox}).features[0]
                        statusFlag = booleanPointInPolygon(tempPoint, country)
                    }
                    
                    responseObject.body.features.push(tempPoint)

                }

            }
        }

    }

    return responseObject
}