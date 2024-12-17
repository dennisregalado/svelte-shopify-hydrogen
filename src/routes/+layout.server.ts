import { getShopAnalytics } from '@shopify/hydrogen';
import {
	PUBLIC_STORE_DOMAIN,
	PUBLIC_STOREFRONT_ID,
	PUBLIC_STOREFRONT_API_TOKEN,
	PUBLIC_CHECKOUT_DOMAIN
} from '$env/static/public';

export const load = async ({ locals: { storefront, cart, customerAccount } }) => {
	return {
		isLoggedIn: customerAccount.isLoggedIn(),
		cart: cart.get(),
		publicStoreDomain: PUBLIC_STORE_DOMAIN,
		shop: getShopAnalytics({
			storefront,
			publicStorefrontId: PUBLIC_STOREFRONT_ID
		}),
		consent: {
			checkoutDomain: PUBLIC_CHECKOUT_DOMAIN,
			storefrontAccessToken: PUBLIC_STOREFRONT_API_TOKEN,
			withPrivacyBanner: false,
			// localize the privacy banner
			country: storefront.i18n.country,
			language: storefront.i18n.language
		}
	};
};
