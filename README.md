# countries-api 🗺️
A lightweight read-only HTTP API for the [countries.geojson](https://github.com/datasets/geo-countries) dataset.  
Serves the geometry of each country alongside a series of helper functions. Built with [KoaJS](https://koajs.com).

> **Demo**  
> Check out a demo of the API at [countries.abws.io](https://countries.abws.io) - testing usage only!

## API Documentation
This API currently does not support authentication.  
This API will return (Geo)JSON data.

### Path: `/`
Returns a list of all countries in the dataset, with links to geometry.

### Path: `/{countryCodeID}`
Returns a GeoJSON FeatureCollection containing the geometry of the country requested.  
The countryCodeID (CCID) represents a three-digit ISO_A3 country code. For example, `fin` will return the geometry of Finland, and `gbr` will return the geometry of the United Kingdom.

### Path: `/{countryCodeID}/random`
Returns a GeoJSON Feature Collection containing a randomised point(s) within the geometry of the country (as designed via the countryCodeID). By default, a single (1) point will be generated and returned. Any number of points between 1 and 1,000 can returned per request by passing the `?total=numberOfPoints` (integer) query parameter to the endpoint/

## Docker Image
The Dockerfile included in this repository will create a stateless container version of this server. The countries GeoJSON dataset is included. The container exposes an HTTP server on port `8080`.

## Developer Installation
If you wish to fork or clone this repo, run the following commands to get started:

``` bash
# install packages
npm install

# updates the countries.geojson dataset
node sandbox/preflight.js

# run the dev server (via nodemon)
npm run dev
```

## License & Changelog
License: GPL-3.0-only (see: `license.txt`)  

### 1.0.0 - First Release
- Contributors: [abiddiscombe](https://github.com/abiddiscombe)
- Created the codebase as a new project.
- Implemented the `/`, `/{countryCodeID}`, and `/{countryCodeID}/random` endpoints.