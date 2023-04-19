// etl/etl.ts

// this script will read in a GeoJSON file are export each FeatureCollection child as a single JSON object within an 'output' directory. The resulting file name from each file can be manually defined from each feature's properties.
// you may wish to run with --allow-write to avoid a headache!

const countries = await Deno.readTextFile("./countries.geojson");
const countriesJSON = await JSON.parse(countries);

const countryMetadata: object[] = []

countriesJSON.features.map(async (feature: any) => {
    countryMetadata.push({...feature.properties})
    const outFile = `./output/features/${feature.properties["ISO_A3"]}.json`;
    await Deno.writeTextFile(outFile, JSON.stringify(feature));
});

await Deno.writeTextFile(`./output/metadata.json`, JSON.stringify(countryMetadata));