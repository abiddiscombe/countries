// src/controllers/countryDistance.ts

import { type RouterContext } from 'oak';
import { Feature } from 'geojsonTypes';

import { getCountryFeature } from '../services/getCountryFeature.ts';
import { distanceToPolygon, isPointInPolygon } from '../utilities/geospatial.ts';

export function countryDistance(ctx: RouterContext<'/country/:isoCode/distance'>) {
    ctx.state = {
        ...ctx.state,
        header: {
            time: Math.floor(Date.now() / 1000),
            host: 'Countries API',
            title: 'Country Distance',
        },
        cleansedParams: {
            isoCode: (ctx.params.isoCode || '').toUpperCase(),
            pointGeom: _convertCoordsToNumber(ctx.request.url.searchParams.get('point') || ''),
        },
    };

    if (ctx.state.cleansedParams.pointGeom.length != 2) {
        handleInvalidPointGeom(ctx);
        return;
    }

    const country = getCountryFeature(ctx.state.cleansedParams.isoCode);

    if (!country) { // also catches invalid isoCode
        handleInvalidCountryCode(ctx);
        return;
    }

    handleDistanceOperation(ctx, country);
}

function handleInvalidCountryCode(ctx: RouterContext<'/country/:isoCode/distance'>) {
    ctx.response.status = 404;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 404,
            desc: 'The ISO_A2 code (\'isoCode\') provided is invalid.',
        },
    };
}

function handleInvalidPointGeom(ctx: RouterContext<'/country/:isoCode/distance'>) {
    ctx.response.status = 400;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 400,
            desc: 'Point coordinates (point) are invalid.',
        },
    };
}

function handleDistanceOperation(
    ctx: RouterContext<'/country/:isoCode/distance'>,
    country: Feature,
) {
    const isPointWithinPolygon = isPointInPolygon(ctx.state.cleansedParams.pointGeom, country);

    ctx.response.body = {
        ...ctx.state.header,
        source: {
            lng: ctx.state.cleansedParams.pointGeom[0],
            lat: ctx.state.cleansedParams.pointGeom[1],
        },
        target: {
            ADMIN: country.properties?.ADMIN,
            ISO_A2: country.properties?.ISO_A2,
        },
        distance: {
            within: isPointWithinPolygon,
            minimum: (isPointWithinPolygon)
                ? 0
                : distanceToPolygon(ctx.state.cleansedParams.pointGeom, country),
        },
    };
}

function _convertCoordsToNumber(raw: string) {
    try {
        const array = raw.split(',');
        return array.map((element) => {
            if (/[a-zA-Z]/.test(element) || !element.length) {
                throw new Error();
            }
            return parseFloat(element);
        });
    } catch {
        return [];
    }
}
