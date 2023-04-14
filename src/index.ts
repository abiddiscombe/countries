// src/index.js

import { Application, Router } from "oak";

import { loadCache } from './data/cache.ts';

import * as root from './controllers/root.ts';
import * as country from './controllers/country.ts';

const app = new Application();
const router = new Router();

const config = {
	port: 8080,
};

router.get('/', root.returnCapabilities);
router.get('/country', country.returnCountryList);
router.get('/country/:ccid', country.returnCountryDetails);

app.use(router.routes());
app.use(router.allowedMethods())

console.log('[OK] Loading cache from source file...');
await loadCache();
console.log('[OK] Starting server...');
await app.listen({
	port: config.port
});
