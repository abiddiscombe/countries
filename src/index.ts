// src/index.js

import { Koa } from './deps.ts';
import { Router } from './deps.ts';

import { loadCache } from './data/cache.ts';

import * as root from './controllers/root.ts';
import * as country from './controllers/country.ts';

const app = new Koa();
const router = new Router();

const config = {
	port: 8080,
};

router.get('/', root.returnCapabilities);
router.get('/country', country.returnCountryList);
router.get('/country/:ccid', country.returnCountryDetails);

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	await next();
});

app.use(router.routes());

console.log('[OK] Loading cache from source file...');
await loadCache();
console.log('[OK] Starting server...');
app.listen(config.port, () => {
	console.log(`[OK] Listening on port ${config.port}`);
});
