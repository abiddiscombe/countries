# 🗺️ Countries API

![Example country outline for "gb", demonstrated on top of an OpenStreetMap basemap.](./media/banner.png)
Example: `/country/gb/outline`

---

An API for returning country metadata and GeoJSON geometry. It's built on the [Deno](https://deno.com/runtime) runtime with the [Oak](https://oakserver.github.io/oak/) HTTP framework and [MongoDB](https://mongodb.com). It is licensed under GNU GPL-3 and is available to pull from [Docker Hub](https://hub.docker.com/r/abiddiscombe/countries).

The dataset behind this service is adapted from the [countries.geojson](https://github.com/datasets/geo-countries) project, with all `-99` ISO_A3 countries removed.

## API Endpoints
This API is read-only, all endpoints permit a `GET` request and will return formatted JSON or GeoJSON. Where specified, an `isoCode` represents the official `ISO_A2` code of each country in the dataset, [read more here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3).


**`/`**\
Returns API metadata and lists service capabilities.

**`/country`**\
Returns a list of the countries supported by the API and a link to each countries' metadata.

**`/country/:isoCode`**\
Returns the metadata for the country represented by the `isoCode`, alongside links to related API capabilities and third-party services.

**`/country/:isoCode/outline`**\
Returns a GeoJSON FeatureCollection containing a (multi)polygon feature to represent the outline/border of the specified country.

**`/country/:isoCode/distance`**\
Requires a `point` query parameter in `lng,lat` format (e.g. `?point=-17.7986,64.7814`).\
Returns whether the `point` resides within the boundaries of the specified country, and if not, the minimum distance (in kilometers) to the country border.

## Deployment
The Countries API is designed for deployment behind an API Gateway (which will provide enhanced statistics and authentication mechanisms). Optional [Bearer Token Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/) can be enabled to validate traffic between the gateway and this microservice-style instance.

The server image (`amd64`) can be pulled directly from [Docker Hub](https://hub.docker.com/r/abiddiscombe/countries) as `abiddiscombe/countries`. The following environment variables are supported:

- `MONGO_URI` (Mandatory)  
A valid connection string to your MongoDB database. The database must contain a collection named `features` containing each feature from the [countries.geojson](https://github.com/datasets/geo-countries) dataset as a seperate document.\
 *The Countries API does not currently support territories with an ISO_A3 value of `-99`. Please remove these instances from your database.*

- `AUTH_TOKEN` (Optional)  
Accepts a string for use as a security token with a minimum length of 20 characters. **If a token is not supplied, authentication will be disabled**.
