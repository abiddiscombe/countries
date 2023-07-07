// src/controllers/country.ts

import { type RouterContext } from 'oak';
import { Feature } from 'geojsonTypes';

import { FlagsAPI } from '../utilities/config.ts';
import { getCountryFeature } from '../services/getCountryFeature.ts';

export function countryDetails(ctx: RouterContext<'/country/:isoCode'>) {
    ctx.state = {
        ...ctx.state,
        header: {
            time: Math.floor(Date.now() / 1000),
            host: 'Countries API',
            title: 'Country Metadata & Service Links',
        },
        cleansedParams: {
            isoCode: (ctx.params.isoCode || '').toUpperCase(),
        },
    };

    const country = getCountryFeature(ctx.state.cleansedParams.isoCode);

    if (!country) {
        handleCountryCodeInvalid(ctx);
        return;
    } else {
        handleCountryFound(ctx, country);
    }
}

function handleCountryCodeInvalid(ctx: RouterContext<'/country/:isoCode'>) {
    ctx.response.status = 404;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 404,
            desc: 'The ISO_A2 code (\'isoCode\') provided is invalid.',
        },
    };
}

function handleCountryFound(ctx: RouterContext<'/country/:isoCode'>, country: Feature) {
    ctx.state.header.title += ` (for ${ctx.state.cleansedParams.isoCode})`;
    ctx.response.body = {
        ...ctx.state.header,
        metadata: {
            ADMIN: country.properties?.ADMIN,
            ISO_A2: country.properties?.ISO_A2,
            ISO_A3: country.properties?.ISO_A3,
            services: _populateServiceList(country.properties?.ISO_A2),
        },
    };
}

function _populateServiceList(isoCode: string) {
    isoCode = isoCode.toLowerCase();
    const services = [];

    if (FlagsAPI.enabled) {
        services.push({
            href: `https://flagcdn.com/${isoCode}.svg`,
            name: 'Link to https://flagpedia.net for country flag.',
        });
    }

    services.push({
        href: `/country/${isoCode}/outline`,
        name: 'Return country outline in GeoJSON format.',
    });

    services.push({
        href: `/country/${isoCode}/distance`,
        name: 'Calculate distance to country border from a point.',
    });

    return services;
}
