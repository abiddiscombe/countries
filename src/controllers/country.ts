// src/controllers/country.ts

import { getCountryList } from '../services/getCountryList.ts';

// deno-lint-ignore no-explicit-any
export function country(ctx: any) {
    const header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Countries List',
    };

    try {
        const countries = getCountryList();

        ctx.response.body = {
            ...header,
            countries: countries.map((country: string[]) => {
                return {
                    href: `/country/${country[1].toLowerCase()}`,
                    admin: country[0],
                };
            }),
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
