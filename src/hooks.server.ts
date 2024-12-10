import { SESSION_SECRET, PRIVATE_STOREFRONT_API_TOKEN } from '$env/static/private';
import { PUBLIC_CHECKOUT_DOMAIN, PUBLIC_STORE_DOMAIN } from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';
import { type Handle } from '@sveltejs/kit';

import { handleSession } from 'svelte-kit-cookie-session';

import {
	createStorefrontClient,
	createCartHandler,
	cartGetIdDefault,
	cartSetIdDefault,
	storefrontRedirect
} from '@shopify/hydrogen';
import { error } from '@sveltejs/kit';

const storefront: Handle = async ({ event, resolve }) => {
	const { getClientAddress, locals, request } = event;

	if (!PUBLIC_STORE_DOMAIN) {
		error(500, 'PUBLIC_STORE_DOMAIN is required');
	}

	if (!PRIVATE_STOREFRONT_API_TOKEN) {
		error(500, 'PRIVATE_STOREFRONT_TOKEN is required');
	}

	function getStorefrontHeaders(request: Request): StorefrontHeaders {
		const headers = request.headers;
		return {
			requestGroupId: headers.get('request-id'),
			buyerIp: getClientAddress(),
			cookie: headers.get('cookie'),
			purpose: headers.get('purpose')
		};
	}

	const { storefront } = createStorefrontClient({
		//	i18n: { language: locals.market.language, country: locals.market.country },
		privateStorefrontToken: PRIVATE_STOREFRONT_API_TOKEN,
		storeDomain: PUBLIC_STORE_DOMAIN,
		storefrontHeaders: getStorefrontHeaders(request)
	});

	locals.storefront = storefront;

	locals.cart = createCartHandler({
		getCartId: cartGetIdDefault(request.headers),
		setCartId: cartSetIdDefault(),
		storefront
	});

	const response = await resolve(event);

	if (response.status == 404) {
		return await storefrontRedirect({
			storefront,
			request
		});
	}

	return response;
};

type StorefrontHeaders = {
	/** A unique ID that correlates all sub-requests together. */
	requestGroupId: string | null;
	/** The IP address of the client. */
	buyerIp: string | null;
	/** The cookie header from the client  */
	cookie: string | null;
	/** The purpose header value for debugging */
	purpose: string | null;
};

export const handle = sequence(
	handleSession(
		{
			secret: SESSION_SECRET
		},
		async ({ event, resolve }) => {
			const { locals, request } = event;

			const response = await resolve(event, {
				preload: ({ type }) => ['js', 'css', 'font'].includes(type),
				transformPageChunk: ({ html }) => html.replace('%lang%', 'en')
			});

			return response;
		}
	),
	storefront
);
