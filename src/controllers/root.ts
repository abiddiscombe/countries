// src/controllers/root.ts

export { returnCapabilities };

function returnCapabilities(ctx) {
	ctx.response.body = {
		ts: Math.floor(Date.now() / 1000),
		title: 'Countries API',
		capabilities: [
			{
				href: '/country',
				desc: 'Lists all countries by Country Code ID (CCID) and provides links to their respective geometries.',
			},
		],
	};
}
