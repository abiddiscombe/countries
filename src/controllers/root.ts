// src/controllers/root.ts

import { corsConfig } from "../utilities/cors.ts";

// deno-lint-ignore no-explicit-any
export function root(ctx: any) {
  ctx.response.body = {
    ...ctx.state.header,
    title: "Homepage & API Capabilities",
    about: {
      source: "https://github.com/abiddiscombe/countries",
      version: "4.0.0",
      corsOrigin: corsConfig.origin
    },
    capabilities: [
      {
        href: "/country",
        desc: "A directory service for countries and related metadata.",
      },
    ],
  };
}
