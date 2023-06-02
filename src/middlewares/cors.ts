// src/middlewares/cors.ts

import { logInfo } from "../utilities/logging.ts";

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
    _cors = origin;
  }
  logInfo("CORS Origin Setting: " + _cors);
}
