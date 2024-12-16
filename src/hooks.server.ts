import { PRIVATE_STOREFRONT_API_TOKEN, SESSION_SECRET } from '$env/static/private';
import {
	PUBLIC_STORE_DOMAIN,
	PUBLIC_CHECKOUT_DOMAIN,
	PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
	PUBLIC_CUSTOMER_ACCOUNT_API_URL
} from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';
import { handleSession } from 'svelte-kit-cookie-session';
import { storefrontRedirect, createHydrogenContext } from '@shopify/hydrogen';
import { type Handle } from '@sveltejs/kit';
import { getLocaleFromRequest } from '$lib/i18n';
import { AppSession } from '$lib/server/session';

const shopifyHydrogen: Handle = async ({ event, resolve }) => {
	const { locals, request } = event;

	console.log(locals.session.set);
	const session = new AppSession(locals.session);
	const { cart, storefront, customerAccount } = createHydrogenContext({
		env: {
			SESSION_SECRET: SESSION_SECRET,
			PUBLIC_STORE_DOMAIN: PUBLIC_STORE_DOMAIN,
			PRIVATE_STOREFRONT_API_TOKEN: PRIVATE_STOREFRONT_API_TOKEN,
			PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
			PUBLIC_CUSTOMER_ACCOUNT_API_URL: PUBLIC_CUSTOMER_ACCOUNT_API_URL,
			PUBLIC_CHECKOUT_DOMAIN: PUBLIC_CHECKOUT_DOMAIN
		},
		session,
		i18n: getLocaleFromRequest(request),
		request
	});

	locals.storefront = storefront;
	locals.cart = cart;
	locals.customerAccount = customerAccount;

	const response = await resolve(event);

	if (response.status == 404) {
		return await storefrontRedirect({
			storefront,
			request
		});
	}

	return response;
};

export const handle = sequence(
	handleSession({ secret: SESSION_SECRET }, async ({ event, resolve }) => {
		const response = await resolve(event, {
			preload: ({ type }) => ['js', 'css', 'font'].includes(type),
			transformPageChunk: ({ html }) => html.replace('%lang%', 'en')
		});

		return response;
	}),
	shopifyHydrogen
);
