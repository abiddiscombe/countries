// src/controllers/country.ts

import { getCountryOutline } from '../services/getCountryOutline.ts';

// deno-lint-ignore no-explicit-any
export function countryOutline(ctx: any) {
    const isoCode = ctx.params.isoCode.toUpperCase();
    const header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Country Outline',
    };

    try {
        const country = getCountryOutline(isoCode);

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

        ctx.response.body = {
            ...header,
            type: 'FeatureCollection',
            features: [country],
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
