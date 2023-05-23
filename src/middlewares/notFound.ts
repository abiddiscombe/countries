// src/middlewares/notFound.ts

export { resourceNotFound };

// deno-lint-ignore no-explicit-any
function resourceNotFound(ctx: any) {
  ctx.response.status = 404;
  ctx.response.body = {
    ...ctx.state.header,
    error: {
      code: 404,
      desc: "Resource not found. Please check your URL.",
    },
  };
}
