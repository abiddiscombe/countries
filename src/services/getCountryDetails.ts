// src/services/getCountryDetails.ts

import { mongoClient } from '../utilities/database.ts';

export async function getCountryDetails(isoCode: string) {
    const matches = await mongoClient.find({
        'properties.ISO_A2': isoCode,
    }, {
        projection: {
            _id: 0,
            properties: 1,
        },
    }).toArray();
    return (matches.length) ? matches[0] : {};
}
