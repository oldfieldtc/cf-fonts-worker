export default {
	async fetch(request, env, ctx) {
		if (request.method !== 'GET') {
			return new Response('Method not allowed', { status: 405 });
		}

		const allowed = env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim());
		const origin = request.headers.get('Origin');
		const isAllowed = allowed.includes(origin) || /^http:\/\/localhost(:\d{1,5})?$/.test(origin);

		if (!isAllowed) {
			return new Response(`Forbidden`, { status: 403 })
		}

		const url = new URL(request.url);
		const path = url.pathname.slice(1);
		const font = await env.FONT_KV.get(path, 'arrayBuffer');

		if (!font) {
			return new Response("Not found", { status: 404 });
		}

		return new Response(font, {
			headers: {
				"Content-Type": "font/woff2",
				"Access-Control-Allow-Origin": origin,
				"Cache-Control": "public, max-age=31536000, immutable",
				'Access-Control-Allow-Methods': 'GET'
			},
		});
	},
};
