// src/services/getCountryOutline.ts

import { mongoClient } from '../utilities/database.ts';

export async function getCountryOutline(isoCode: string) {
    const matches = await mongoClient.find({
        'properties.ISO_A2': isoCode,
    }, {
        projection: {
            _id: 0,
        },
    }).toArray();
    return (matches.length) ? matches[0] : {};
}
