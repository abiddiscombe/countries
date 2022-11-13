// src/data/cache.js

import fs from 'fs'

export {
    cache,
    loadCache
}

let cache = {
    countries: {},
    acceptedCountryCodes: []
}

function loadCache() {
    fs.readFile('./src/data/countries.geojson', 'utf8', function (err, data) {
        if (err) {
          return console.log(err)
        } else {
            cache.countries = JSON.parse(data)
            for (let i = 0; i < cache.countries.features.length; i++) {
                cache.countries.features[i].properties.ISO_A3 = cache.countries.features[i].properties.ISO_A3.toLowerCase()
                cache.acceptedCountryCodes.push(cache.countries.features[i].properties.ISO_A3)
            }
        }
    })

    

}