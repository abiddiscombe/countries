# countries-api
A lightweight HTTP REST JSON API for the [countries.geojson](https://github.com/datasets/geo-countries) dataset. Built on [Deno](https://deno.land) and KoaJS.

> **✨ Live Demo**  
> You can test-run this API at [countries.archiebiddiscombe.net](https://countries.archiebiddiscombe.net).  
> This service is for demonstration and testing use only and may be taken offline at short-notice. Please play fair.

## Documentation

### `/`
Returns the capabilities of the API.

### `/country`
Returns a list of countries supported by the API.

### `/country/ccid`
Takes a Country Code ID (CCID) and returns a GeoJSON FeatureCollection for the requested country. The CCID represents the official ISO_A3 Country Code. For example, `fin` will return the geometry of Finland, and `gbr` will return the geometry of the United Kingdom.

## No Database?
The source data (countries.geojson) is around 20 MB in size, it did not seem neccesary to store this data in a database. The GeoJSON file is stored as part of this repository, within `/src/data/`. The cost of configuring additional infastructure and ensuring data currency will be re-considered in future releases.

## No Tests?
I'm currently learning more about testing as a wider concept. I want to add tests in a future release, particularly to verify the JSON response in different situations, such as the failed loading of the cache, or the input of an invalid CCID.


## License & Changelog
License: GPL-3.0-only (see: `license.txt`)  

### 2.0 - Refactored for Deno and Gradual TypeScript Support
- Contributors: [abiddiscombe](https://github.com/abiddiscombe)
- This project has been rewritten to use [Deno](https://deno.land) and TypeScript.

### 1.0 - First Release
- Contributors: [abiddiscombe](https://github.com/abiddiscombe)
- Created the codebase as a new project.
- Implemented the `/`, `/{countryCodeID}`, and `/{countryCodeID}/random` endpoints.
