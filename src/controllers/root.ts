// src/controllers/root.ts

import { type RouterContext } from 'oak';

export function root(ctx: RouterContext<'/'>) {
    ctx.response.body = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Homepage & API Capabilities',
        about: {
            source: 'https://github.com/abiddiscombe/countries',
            version: '4.3.0',
            cors: {
                origin: ctx.response.headers.get('Access-Control-Allow-Origin'),
            },
        },
        capabilities: [
            {
                href: '/country',
                desc: 'A directory service for countries and related metadata.',
            },
        ],
    };
}
