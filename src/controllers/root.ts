// src/controllers/root.ts

// deno-lint-ignore no-explicit-any
export function root(ctx: any) {
    ctx.response.body = {
        ...ctx.state.header,
        title: 'Homepage & API Capabilities',
        about: {
            source: 'https://github.com/abiddiscombe/countries',
            version: '4.1.0',
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
