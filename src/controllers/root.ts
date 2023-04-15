// src/controllers/root.ts

import { newHeader } from "../utilities/header.ts"

export function root(ctx) {
	
	const res = newHeader("Countries API - Service Capabilities");

	ctx.response.body = {
		...res,
		capabilities: [
			{
				href: '/country',
				desc: 'Lists all countries by Country Code ID (CCID) and provides links to their respective geometries.',
			},
			{
				href: "/country/<ccid>",
				desc: "Returns details and geometry for the specified Country Code ID (CCID)"
			}
		]
	}

}