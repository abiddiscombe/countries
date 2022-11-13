// src/routes.js

import { countryList } from './handlers/countryList.js'
import { countryDetails } from './handlers/countryDetails.js'
import { countryRandomPoint } from './handlers/countryRandomPoint.js'

export const routes = {

    countries: async (ctx) => {
        const response = countryList()
        ctx.body = response.body
    },

    countries_ccid: async (ctx) => {
        const response = countryDetails({
            ccid: ctx.params.ccid
        })
        ctx.status = response.code
        ctx.body = response.body
    },

    countries_ccid_random: async (ctx) => {
        const response = countryRandomPoint({
            ccid: ctx.params.ccid,
            totalPoints: ctx.query.total || 1
        })
        ctx.body = response.body
    }

}