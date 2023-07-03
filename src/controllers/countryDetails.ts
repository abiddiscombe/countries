// src/controllers/country.ts

import { getCountryDetails } from '../services/getCountryDetails.ts';

// deno-lint-ignore no-explicit-any
export function countryDetails(ctx: any) {
    const isoCode = ctx.params.isoCode.toUpperCase();
    const header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Country Metadata & Service Links',
    };

    try {
        const metadata = getCountryDetails(isoCode);

        if (!metadata.properties) {
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

        header.title += ` (for ${isoCode})`;

        ctx.response.body = {
            ...header,
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
            ...header,
            error: {
                code: 500,
                desc: 'Internal Service Error. Please try again later.',
            },
        };
    }
}
