// src/main.ts

import { Application, Router } from 'oak';

import { initMongoClient } from './utilities/database.ts';

import { telemetry } from './middlewares/telemetry.ts';
import { authentication } from './middlewares/authentication.ts';
import { corsOriginRules } from './middlewares/corsOriginRules.ts';
import { resourceNotFound } from './middlewares/resourceNotFound.ts';

import { root } from './controllers/root.ts';
import { country } from './controllers/country.ts';
import { countryDetails } from './controllers/countryDetails.ts';
import { countryOutline } from './controllers/countryOutline.ts';
import { countryDistance } from './controllers/countryDistance.ts';

authentication.setup();
corsOriginRules.setup();
await initMongoClient();

const server = new Application();
const router = new Router();

router.get('/', root);
router.get('/country', country);
router.get('/country/:isoCode', countryDetails);
router.get('/country/:isoCode/outline', countryOutline);
router.get('/country/:isoCode/distance', countryDistance);

server.use(telemetry.handler);
server.use(authentication.handler);
server.use(corsOriginRules.handler);
server.use(router.routes());
server.use(router.allowedMethods());
server.use(resourceNotFound.handler);

server.addEventListener('listen', ({ secure, hostname, port }) => {
    const protocol = secure ? 'https' : 'http';
    hostname = hostname ?? 'localhost';
    console.info(`[ INFO ] Listening on ${protocol}://${hostname}:${port}.`);
});

await server.listen({
    port: 8080,
});
