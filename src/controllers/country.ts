// src/controllers/country.ts

import { type RouterContext } from 'oak';
import { getCountryList } from '../services/getCountryList.ts';

export function country(ctx: RouterContext<'/country'>) {
    ctx.state = {
        ...ctx.state,
        header: {
            time: Math.floor(Date.now() / 1000),
            host: 'Countries API',
            title: 'Countries List',
        },
    };

    const countries = getCountryList();

    ctx.response.body = {
        ...ctx.state.header,
        countries: countries.map((country: string[]) => {
            return {
                href: `/country/${country[1].toLowerCase()}`,
                admin: country[0],
            };
        }),
    };
}
