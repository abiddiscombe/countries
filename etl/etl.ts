// etl/etl.ts

// this script will read in a GeoJSON file and
// export each FeatureCollection child as a single
// JSON object ('feature'). The scripe will also
// create a metadata file ('metadata.json') which
// contains a list of feature properties.

const countries = await Deno.readTextFile("./countries.geojson");
const countriesJSON = await JSON.parse(countries);

const countryMetadata: object[] = [];

countriesJSON.features.map(async (feature: any) => {
  countryMetadata.push({ ...feature.properties });
  const outFile = `./output/features/${feature.properties["ISO_A3"]}.json`;
  await Deno.writeTextFile(outFile, JSON.stringify(feature));
});

await Deno.writeTextFile(
  `./output/metadata.json`,
  JSON.stringify(countryMetadata),
);
