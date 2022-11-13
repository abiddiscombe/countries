// src/data/preflight.js

/*

    This script will download the latest edition of the geo-countries data from
    https://github.com/datasets/geo-countries ready for use.

    This dataset is very large, and thus is not be bundled with git.

*/

import fs from 'fs'

const config = {
    source: 'https://datahub.io/core/geo-countries/r/countries.geojson',
    target: 'countries.geojson'
}

async function download() {
    process.stdout.write(`Requesting resource '${config.source}'... `)
    let redirResponse = await fetch(config.source)
    let redirResponseJson = await redirResponse.json()
    if (redirResponseJson.type != 'FeatureCollection') {
        // basic check if a FeatureCollection was returned.
        process.stdout.write(`🚨 \n`)
        throw new Error('Error: Failed to return valid GeoJSON')
    }
    process.stdout.write(`✅ \n`)
    process.stdout.write(`Saving to disk as '${config.target}'... `)
    fs.writeFile(`./src/data/${config.target}`, JSON.stringify(redirResponseJson), function (err) {
        if (err) {
            process.stdout.write(`🚨 \n`)
            throw new Error(`Error: ${err}`)
        } else {
            process.stdout.write(`✅ \n`)
        }
    })   
}

download()
