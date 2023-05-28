// src/utilities/cors.ts

export { corsConfig, initCorsConfig }

const corsConfig = {
    origin: "*"
}

function initCorsConfig() {
    const origin = Deno.env.get("CORS_ORIGIN") || "";
    // todo: domain validation
    if (origin && !origin.includes(" ")) {
        console.log(`CORS Custom Origin Added: "${origin}".`);
        corsConfig.origin = origin;
    }
}