// import { getLocaleFromUrl } from '$i18n';

/**
 * Reroutes sub-path URLs into defined routes
 * /en-us -> /
 * /en-mx/products -> /products
 * /en-ca/collections/all -> /collections/all
 */
export function reroute({ url }) {
	const locale = false;

	// getLocaleFromUrl(url);

	if (locale) {
		const path = url.pathname.replace(`/${locale}`, '');
		return path || '/';
	}
}
