// src/utilities/config.ts

export const FlagsAPI = {
    enabled: true,
    setup: _setup,
};

function _setup() {
    const env = Deno.env.get('FLAGS_API') || '';
    if (env === 'false') {
        FlagsAPI.enabled = false;
    }
}
