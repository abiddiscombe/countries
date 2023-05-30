# 🌱 Changelog

## Version 4.1.0 
- [x] `#FIX` Hotfix removal of `-99` ISO_A3 countries from source database.
- [x] `#FEAT` Added support for a custom CORS origin.
- [x] `#FEAT` New endpoint (`/country/:isoCode/distance`) created for distance operations.
- [x] `#DOCS` Changelog file converted into Markdown format.
- [ ] `#DOCS` README.md banner recreated as a vector.

## Version 4.0.0
- [x] `#FIX` Created JSON responses for HTTP 404 & 500 errors.
- [x] `#FEAT` Created new Dockerfile and published to Docker Hub.
- [x] `#FEAT` Migrated to a MongoDB database.
- [x] `#FEAT` Added opt-in support for Bearer Token authentication.
- [x] `#FEAT` Added wildcard CORS headers on all endpoints.
- [x] `#CHORE` Applied schema changes to all endpoints.

## Version 3.0.0
- [x] #CHORE Refactors for Deno Deploy usage (pilot).
- [x] #REFACTOR Refactors to improve code readability.
- [x] #REFACTOR Migration to the Oak HTTP Framework.
- [x] #REFACTOR Switched to a CDN-based data source with caching (pilot).

## Version 2.0.0
- [x] `#FIX` Removed the `:ccid/random` endpoint due to errors processing larger countries.
- [x] `#FEAT` All `/:ccid` endpoints are now located under a `/countries` prefix.
- [x] #REFACTOR: Project migrated to the [Deno](https://deno.com/runtime) runtime.

## Version 1.0.0
- [x] `#FEAT` The initial release, built with NodeJS & Koa.
- [x] `#FEAT` Implemented the `/`, `/:ccid`, `:ccid/random` endpoints.