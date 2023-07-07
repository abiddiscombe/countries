// src/middlewares/resourceNotFound.ts

import { type Context } from 'oak';

export const resourceNotFound = {
    handler,
};

function handler(ctx: Context) {
    ctx.response.status = 404;
    ctx.response.body = {
        ...ctx.state.header,
        error: {
            code: 404,
            desc: 'Resource not found. Please check your URL.',
        },
    };
}
