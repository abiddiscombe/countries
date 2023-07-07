// src/middlewares/corsOriginRules.ts

import { type Context } from 'oak';

let _cors = '*';

export const corsOriginRules = {
    setup,
    handler,
};

function setup() {
    const origin = Deno.env.get('CORS_ORIGIN') || '';
    if (origin && !origin.includes(' ')) {
        _cors = origin;
    }
    console.info('[ INFO ] Enabled Custom CORS Origin: ' + _cors);
}

async function handler(ctx: Context, next: () => Promise<unknown>) {
    ctx.response.headers.set('Access-Control-Allow-Origin', _cors);
    await next();
}
