// src/controllers/country.ts

import { getCountryDetails } from '../services/getCountryDetails.ts';

// deno-lint-ignore no-explicit-any
export async function countryDetails(ctx: any) {
    const title = 'Country Metadata & Service Links';
    const isoCode = ctx.params.isoCode.toUpperCase();

    try {
        const metadata = await getCountryDetails(isoCode);

        if (!metadata.properties) {
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
            title: title + ` (for ${isoCode})`,
            metadata: {
                ADMIN: metadata.properties.ADMIN,
                ISO_A2: metadata.properties.ISO_A2,
                ISO_A3: metadata.properties.ISO_A3,
                services: [
                    {
                        href: `https://flagcdn.com/${metadata.properties.ISO_A2.toLowerCase()}.svg`,
                        name: 'Link to https://flagpedia.net for country flag.',
                    },
                    {
                        href: `/country/${metadata.properties.ISO_A2.toLowerCase()}/outline`,
                        name: 'Return country outline in GeoJSON format.',
                    },
                    {
                        href: `/country/${metadata.properties.ISO_A2.toLowerCase()}/distance`,
                        name: 'Calculate distance to country border from a point.',
                    },
                ],
            },
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
