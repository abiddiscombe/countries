// src/handlers/countryList.js

import { cache } from '../utils/cache.js'

import { time } from '../utils/time.js'

export {
    countryList
}

function countryList() {

    let responseObject = {
        code: 200,
        body: {
            ts: time.now(),
            metadata: {
                title: 'Country List',
                description: 'Returns a list of each country in the dataset, and its relative link.',
            },
            countries: []
        }
    }

    for (let country of cache.countries.features) {
        responseObject.body.countries.push({
            name: country.properties.ADMIN,
            href: `/${country.properties.ISO_A3.toLowerCase()}`
        })
    }

    return responseObject

}