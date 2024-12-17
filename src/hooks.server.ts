import { PRIVATE_STOREFRONT_API_TOKEN, SESSION_SECRET } from '$env/static/private';
import {
	PUBLIC_STORE_DOMAIN,
	PUBLIC_CHECKOUT_DOMAIN,
	PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
	PUBLIC_CUSTOMER_ACCOUNT_API_URL,
	PUBLIC_SHOP_ID,
	PUBLIC_STOREFRONT_API_TOKEN,
	PUBLIC_STOREFRONT_ID
} from '$env/static/public';
import {
	storefrontRedirect,
	createHydrogenContext,
	cartGetIdDefault,
	cartSetIdDefault
} from '@shopify/hydrogen';
import { getLocaleFromRequest } from '$lib/i18n';
import { AppSession } from '$lib/server/session';

export const handle = async ({ event, resolve }) => {
	const { locals, request, getClientAddress, setHeaders, cookies } = event;

	const headers = request.headers;

	const [session] = await Promise.all([AppSession.init(request, [SESSION_SECRET])]);

	const { cart, storefront, customerAccount } = createHydrogenContext({
		env: {
			SHOP_ID: PUBLIC_SHOP_ID,
			SESSION_SECRET: SESSION_SECRET,
			PUBLIC_STOREFRONT_API_TOKEN: PUBLIC_STOREFRONT_API_TOKEN,
			PUBLIC_STOREFRONT_ID: PUBLIC_STOREFRONT_ID,
			PUBLIC_STORE_DOMAIN: PUBLIC_STORE_DOMAIN,
			PRIVATE_STOREFRONT_API_TOKEN: PRIVATE_STOREFRONT_API_TOKEN,
			PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
			PUBLIC_CHECKOUT_DOMAIN: PUBLIC_CHECKOUT_DOMAIN,
			PUBLIC_CUSTOMER_ACCOUNT_API_URL: PUBLIC_CUSTOMER_ACCOUNT_API_URL
		},
		session,
		i18n: getLocaleFromRequest(request),
		storefront: {
			headers: {
				requestGroupId: headers.get('request-id'),
				buyerIp: getClientAddress(),
				cookie: headers.get('cookie'),
				purpose: headers.get('purpose')
			}
		},
		cart: {
			getId: () => {
				const id = cookies.get('cartId');
				const cartId = decodeURIComponent(id);
				return 'gid://shopify/Cart/' + cartId;
			},
			setId: cartSetIdDefault()
			//	setId: (id) => cookies.set('cartId', id, { path: '/' })
		},
		request
	});

	locals.storefront = storefront;
	locals.cart = cart;
	locals.customerAccount = customerAccount;
	locals.session = session;

	let response = await resolve(event, {
		preload: ({ type }) => ['js', 'css', 'font'].includes(type),
		transformPageChunk: ({ html }) => html.replace('%lang%', locals.storefront.i18n.language)
	});

	if (session.isPending) {
		const cookies = await session.commit();

		setHeaders({
			'Set-Cookie': cookies
		});
	}

	if (response.status == 404) {
		return await storefrontRedirect({
			storefront,
			request
		});
	}

	return response;
};
