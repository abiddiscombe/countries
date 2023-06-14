// src/middlewares/corsOriginRules.ts

let _cors = '*';

export const corsOriginRules = {
    setup,
    handler
}

function setup() {
    const origin = Deno.env.get('CORS_ORIGIN') || '';
    if (origin && !origin.includes(' ')) {
        _cors = origin;
    }
    console.info('[ INFO ] Enabled Custom CORS Origin: ' + _cors);
}


// deno-lint-ignore no-explicit-any
async function handler(ctx: any, next: any) {
    ctx.response.headers.set('Access-Control-Allow-Origin', _cors);
    await next();
}
