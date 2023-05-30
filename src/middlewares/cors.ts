// src/middlewares/cors.ts

export { cors, initCors };

let _cors = "*";

// deno-lint-ignore no-explicit-any
async function cors(ctx: any, next: any) {
  ctx.response.headers.set("Access-Control-Allow-Origin", _cors);
  await next();
}

function initCors() {
  const origin = Deno.env.get("CORS_ORIGIN") || "";
  if (origin && !origin.includes(" ")) {
    console.log(`CORS Accepting Custom Origin (${origin}).`);
    _cors = origin;
  } else {
    console.warn("CORS Accepting All Origins (*).")
  }
}
