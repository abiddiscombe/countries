// src/controllers/country.ts

import { getCountryOutline } from '../services/getCountryOutline.ts';

// deno-lint-ignore no-explicit-any
export async function countryOutline(ctx: any) {
    const title = 'Country Outline';
    const isoCode = ctx.params.isoCode.toUpperCase();

    try {
        const country = await getCountryOutline(isoCode);

        if (!country.properties) {
            ctx.response.status = 404;
            ctx.response.body = {
                ...ctx.state.header,
                title: title,
                error: {
                    code: 404,
                    desc: 'The ISO_A2 code (\'isoCode\') provided is invalid.',
                },
            };
            return;
        }

        ctx.response.body = {
            ...ctx.state.header,
            title: title,
            type: 'FeatureCollection',
            features: [country],
        };
    } catch {
        ctx.response.status = 500;
        ctx.response.body = {
            ...ctx.state.header,
            title: title,
            error: {
                code: 500,
                desc: 'Internal Service Error. Please try again later.',
            },
        };
    }
}
