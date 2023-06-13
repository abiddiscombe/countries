// src/middlewares/resourceNotFound.ts

export const resourceNotFound = {
    handler
}

// deno-lint-ignore no-explicit-any
function handler(ctx: any) {
    ctx.response.status = 404;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 404,
            desc: 'Resource not found. Please check your URL.',
        },
    };
}
