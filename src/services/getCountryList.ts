// // src/services/getCountryList.ts

import { mongoClient } from "../utilities/database.ts";

interface Country {
  properties: {
    ADMIN: string;
    ISO_A2: string;
    ISO_A3: string;
  };
}

export async function getCountryList() {
  const countries = await mongoClient.find({
    "type": { "$ne": null },
  }, {
    projection: {
      _id: 0,
      properties: 1,
    },
  }).toArray();
  return countries.map((country: Country) => {
    return [
      country.properties.ADMIN,
      country.properties.ISO_A2,
    ];
  });
}
