// src/controllers/countryDistance.ts

import { getCountryOutline } from '../services/getCountryOutline.ts';
import { stringToNumberArray } from '../utilities/conversion.ts';
import { distanceToPolygon, isPointInPolygon } from '../utilities/geospatial.ts';

// deno-lint-ignore no-explicit-any
export async function countryDistance(ctx: any) {
    const isoCode = ctx.params.isoCode.toUpperCase();
    const pointGeom = ctx.request.url.searchParams.get('point') || '';
    const header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Country Distance'
    };

    if (!pointGeom) {
        ctx.response.status = 400;
        ctx.response.body = {
            ...header,
            error: {
                code: 400,
                desc: 'Point coordinates (point) are missing.',
            },
        };
        return;
    }

    const pointGeomArray = stringToNumberArray(pointGeom);

    if (!pointGeomArray || pointGeomArray.length != 2) {
        ctx.response.status = 400;
        ctx.response.body = {
            ...header,
            error: {
                code: 400,
                desc: 'Point coordinates (point) are invalid.',
            },
        };
        return;
    }

    try {
        const country = await getCountryOutline(isoCode);

        if (!country.properties) {
            ctx.response.status = 404;
            ctx.response.body = {
                ...header,
                error: {
                    code: 404,
                    desc: 'The ISO_A2 code (\'isoCode\') provided is invalid.',
                },
            };
            return;
        }

        const isPointWithinPolygon = isPointInPolygon(
            pointGeomArray,
            country.geometry,
        );

        ctx.response.body = {
            ...header,
            source: {
                lng: pointGeomArray[0],
                lat: pointGeomArray[1],
            },
            target: {
                ADMIN: country.properties.ADMIN,
                ISO_A2: country.properties.ISO_A2,
            },
            distance: {
                within: isPointWithinPolygon,
                minimum: (isPointWithinPolygon) ? 0 : distanceToPolygon(pointGeomArray, country),
            },
        };
    } catch {
        ctx.response.status = 500;
        ctx.response.body = {
            ...header,
            error: {
                code: 500,
                desc: 'Internal Service Error. Please try again later.',
            },
        };
    }
}
