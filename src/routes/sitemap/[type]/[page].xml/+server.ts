import { getSitemap } from '@shopify/hydrogen';

export const GET = async ({ locals: { storefront }, request, params }) => {
	return await getSitemap({
		storefront,
		request,
		params,
		locales: ['EN-US'],
		getLink: ({ type, baseUrl, handle, locale }) => {
			if (!locale) return `${baseUrl}/${type}/${handle}`;
			return `${baseUrl}/${locale}/${type}/${handle}`;
		}
	});
};
