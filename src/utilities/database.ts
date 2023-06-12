// src/utilities/database.ts

import { MongoClient } from 'mongo';

// deno-lint-ignore no-explicit-any
export let mongoClient: any;

export async function initMongoClient() {
    if (mongoClient) {
        console.warn('Client previously initialized.');
        return;
    }

    const mongoURI = Deno.env.get('MONGO_URI');
    if (!mongoURI) throw Error('Variable \'MONGO_URI\' is missing.');

    try {
        const MongoConnection = new MongoClient();
        await MongoConnection.connect(mongoURI);
        mongoClient = await MongoConnection.database().collection('features');
    } catch {
        throw Error(
            'Connection to MongoDB Failed. Check connection and credentials.',
        );
    }
}
