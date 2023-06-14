// src/controllers/root.ts

// deno-lint-ignore no-explicit-any
export function root(ctx: any) {
    const header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
        title: 'Country Outline'
    };
    ctx.response.body = {
        ...header,
        title: 'Homepage & API Capabilities',
        about: {
            source: 'https://github.com/abiddiscombe/countries',
            version: '4.2.0',
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
