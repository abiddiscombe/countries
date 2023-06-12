// src/middlewares/header.ts

// deno-lint-ignore no-explicit-any
export async function makeHeader(ctx: any, next: any) {
    ctx.state.header = {
        time: Math.floor(Date.now() / 1000),
        host: 'Countries API',
    };
    await next();
}
