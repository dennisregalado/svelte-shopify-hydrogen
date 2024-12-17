import { countries } from './server/countries';
import type { I18nLocale } from './types';

export function getLocaleFromRequest(request: Request): I18nLocale {
	const url = new URL(request.url);
	const firstPathPart = '/' + url.pathname.substring(1).split('/')[0].toLowerCase();

	return countries[firstPathPart]
		? {
				...countries[firstPathPart],
				pathPrefix: firstPathPart
			}
		: {
				...countries['default'],
				pathPrefix: ''
			};
}

export const DEFAULT_LOCALE: I18nLocale = Object.freeze({
	...countries.default,
	pathPrefix: ''
});