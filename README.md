# Countries API

![Banner image showing country outlines](./media/banner.png)

An API for returning country metadata and GeoJSON geometry. I've built it using the [Deno](https://deno.com/runtime) runtime, with the [Oak](https://oakserver.github.io/oak/) HTTP framework and [MongoDB](https://mongodb.com). It is licensed under GNU GPL-3, and is available on [Docker Hub](https://hub.docker.com/r/abiddiscombe/countries).

The dataset behind this service is adapted from the [countries.geojson](https://github.com/datasets/geo-countries) project, with all `-99` ISO_A3 countries removed.

## API Endpoints
This API is read-only; all endpoints permit a `GET` request and will return formatted JSON or GeoJSON. Where specified, an `isoCode` represents the official `ISO_A2` code of each country in the dataset, [read more](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) here.


**`/`**\
Returns API metadata and a list of primary service capabilities.

**`/country`**\
Returns a list of the countries supported by the API and a link to each countries' properties.

**`/country/:isoCode`**\
Returns the metadata for the country represented by the `isoCode`, alongside links to related API capabilities and third-party services.

**`/country/:isoCode/outline`**\
Returns a GeoJSON FeatureCollection containing a polygon feature, which represents the outline of the specified country.

**`/country/:isoCode/distance`**\
Accepts a `point` argument in `lng,lat` format.\
Returns whether the user-specified point resides within the boundaries of the specified country, and if not, the minimum distance (in kilometers) to the country border.

## Deployment
The Countries API is designed for deployment behind an API Gateway (which will provide enhanced statistics and authentication mechanisms). Optional [Bearer Token Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/) can be enabled to validate traffic between the gateway and the API server.

The server image (`amd64`) can be pulled directly from [Docker Hub](https://hub.docker.com/r/abiddiscombe/countries) as `abiddiscombe/countries`. The following environment variables are supported:

- `MONGO_URI` (Mandatory)  
A valid connection string to your MongoDB database. Your MongoDB database must contain a collection labelled `features` containing each feature from the source dataset ([countries.geojson](https://github.com/datasets/geo-countries)).

- `AUTH_TOKEN`  
Accepts a string for use as a security token. For security reasons, this token must be at least 20 characters long.  
You must keep this token secure. **If a token is not supplied authentication will be disabled**.
