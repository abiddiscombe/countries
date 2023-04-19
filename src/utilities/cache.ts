// src/utilities/cache.ts

export { cache, initCache };

const cache = {
  source: "",
  features: [],
  validCountries: {
    ADMIN: [],
    ISO_A3: [],
  },
};

async function initCache() {
  const source = Deno.env.get("UPSTREAM_CDN");

  if (!source) {
    throw new Error(
      "Environment variable 'UPSTREAM_CDN' is missing. Aborting.",
    );
  }

  cache.source = source;

  const url = `https://${cache.source}/countries/metadata.json`;
  try {
    const metadata = await fetch(url);
    const metadataJSON = await metadata.json();
    metadataJSON.map((item) => {
      cache.validCountries.ADMIN.push(item.ADMIN),
        cache.validCountries.ISO_A3.push(item.ISO_A3);
    });
  } catch {
    throw new Error("Failed to reach the upstream CDN. Aborting.");
  }
}
