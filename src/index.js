// src/index.js

import Koa from 'koa'
import Router from '@koa/router'

import { routes } from './routes.js'

import { loadCache } from './utils/cache.js'

loadCache()

const app = new Koa()
const router = new Router()

const config = {
    port: 8080
}

router
    .get('/', routes.countries)
    .get('/:ccid', routes.countries_ccid)
    .get('/:ccid/random', routes.countries_ccid_random)

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    await next()
})

app.use(router.routes())

app.listen(config.port, () => {
    console.log(`🚀 Server running on ${config.port}`)
})