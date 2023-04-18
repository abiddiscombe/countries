// src/main.ts

import { Application, Router } from "oak";

import { loadCache } from './data/cache.ts';

import { root } from "./controllers/root.ts"
import { countryList } from "./controllers/countryList.ts"
import { countryData } from "./controllers/countryData.ts"

const server = new Application();
const router = new Router();

router.get('/', root);
router.get('/country', countryList);
router.get('/country/:ccid', countryData);

server.use(router.routes());
server.use(router.allowedMethods())

console.info("Server initialised. Listening on http://127.0.0.1:8080.");

loadCache().then(async () => {
	await server.listen({
		port: 8080
	});
})
