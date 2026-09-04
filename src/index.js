/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const allowed = env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim());
		const origin = request.headers.get('Origin');

		const isAllowed = allowed.includes(origin) || /^http:\/\/localhost(:\d{1,5})?$/.test(origin);

		return new Response(`Hello ${origin}, ${isAllowed}!`);
	},
};
