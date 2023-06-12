// src/middlewares/header.ts

export { makeHeader };

// deno-lint-ignore no-explicit-any
async function makeHeader(ctx: any, next: any) {
    ctx.state.header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
    };
    await next();
}
