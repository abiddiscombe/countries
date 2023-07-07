// src/controllers/country.ts

import { type RouterContext } from 'oak';
import { Feature } from 'geojsonTypes';

import { getCountryFeature } from '../services/getCountryFeature.ts';

export function countryOutline(ctx: RouterContext<'/country/:isoCode/outline'>) {
    ctx.state = {
        ...ctx.state,
        header: {
            time: Math.floor(Date.now() / 1000),
            host: 'Countries API',
            title: 'Country Outline',
        },
        cleansedParams: {
            isoCode: (ctx.params.isoCode || '').toUpperCase(),
        },
    };

    const country = getCountryFeature(ctx.state.cleansedParams.isoCode);

    if (!country) {
        handleInvalidCountryCode(ctx);
        return;
    } else {
        handleCountryFound(ctx, country);
    }
}

function handleInvalidCountryCode(ctx: RouterContext<'/country/:isoCode/outline'>) {
    ctx.response.status = 404;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 404,
            desc: 'The ISO_A2 code (\'isoCode\') provided is invalid.',
        },
    };
}

function handleCountryFound(ctx: RouterContext<'/country/:isoCode/outline'>, country: Feature) {
    ctx.state.header.title += ` (for ${ctx.state.cleansedParams.isoCode})`;
    ctx.response.body = {
        ...ctx.state.header,
        type: 'FeatureCollection',
        features: [country],
    };
}
