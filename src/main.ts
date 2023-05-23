// src/main.ts

import { Application, Router } from "oak";
import { oakCors } from "cors";

import { makeHeader } from "./middlewares/header.ts";
import { initMongoClient } from "./utilities/database.ts";
import { resourceNotFound } from "./middlewares/notFound.ts";
import { authentication, initAuthentication } from "./middlewares/auth.ts";

import { root } from "./controllers/root.ts";
import { country } from "./controllers/country.ts";
import { countryDetails } from "./controllers/countryDetails.ts";
import { countryOutline } from "./controllers/countryOutline.ts";

initAuthentication();
await initMongoClient();

const server = new Application();
const router = new Router();

router.get("/", root);
router.get("/country", country);
router.get("/country/:isoCode", countryDetails);
router.get("/country/:isoCode/outline", countryOutline);

server.use(oakCors());
server.use(makeHeader);
server.use(authentication);
server.use(router.routes());
server.use(router.allowedMethods());
server.use(resourceNotFound);

server.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https" : "http";
  hostname = hostname ?? "localhost";
  console.info(`Ready. Listening on ${protocol}://${hostname}:${port}.`);
});

await server.listen({
  port: 8080,
});
