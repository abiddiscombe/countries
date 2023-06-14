// src/middlewares/telemetry.ts

export const telemetry = {
    handler
}

// deno-lint-ignore no-explicit-any
async function handler(ctx: any, next: any) {

    // Future editions of this middleware may
    // opt to send telemetry to a specialist
    // reporting service. For now, reporting
    // incoming requests to the console is a
    // suitable form of telemetry reporting.

    console.log(`[ INFO ] (${Date.now()}) NewRequest: ${ctx.request.url}`);
    await next();
}
