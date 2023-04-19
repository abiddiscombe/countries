# Countries API 🗺️

A read-only GeoJSON API serving the
[countries.geojson](https://github.com/datasets/geo-countries) dataset alongside
some additional features. The API permits clients to GET a single country at a
time. Built with the [Deno](https://deno.com/runtime) runtime, using the
[Oak](https://oakserver.github.io/oak/) HTTP framework.

## Documentation

This API is read-only; all endpoints permit a `GET` request and will return
(formatted) JSON.

**`/`**\
Returns JSON. Provides metadata and a list of service endpoints.

**`/country`**\
Returns JSON. Provides a list of the countries supported by the API and a link
to each feature. The countries supported by this API are sourced from the
[countries.geojson](https://github.com/datasets/geo-countries) dataset.

**`/country/:ccid`**\
Returns GeoJSON. Provides a single feature contained within a FeatureCollection.
The feature has properties and geometries for the country represented by the
Country Code ID (CCID). A CCID is equal to an official `ISO_A3` code,
[more on this here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3).

_For example, A CCID of `fin` will return the data for Finland; and `gbr` will
return data for the United Kingdom._

## Changelog

3.0 - [@abiddiscombe](https://github.com/abiddiscombe)

- Major refactor to improve code style and readability.
- Switched to the [Oak](https://oakserver.github.io/oak/) HTTP Framework in
  order to test new forms of deployment (and because I like it!).
- Switched to a CDN-based data source with local caching to adhere to Deno Deploy's T&Cs.

2.0 - [@abiddiscombe](https://github.com/abiddiscombe)

- Code refactored to use the [Deno](https://deno.com/runtime) Runtime and
  TypeScript. Typescript support will be added gradually. The KoaJS framework
  and routing plugin are polyfilled from NPM.
- All `/<ccid>` endpoints are now located behind a `/countries` prefix.
- Removed the `<ccid>/random` endpoint due to faulty point data for countries
  with larger extents.

1.0 - [@abiddiscombe](https://github.com/abiddiscombe)

- Initialised the codebase as a new project.
- Implemented the `/` (root), `/<ccid>`, and `/<ccid>/random` endpoints.
