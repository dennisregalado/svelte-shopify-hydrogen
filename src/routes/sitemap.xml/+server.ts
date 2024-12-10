import { getSitemapIndex } from '@shopify/hydrogen';

export const GET = async ({ locals: { storefront }, request }) => {
	const response = await getSitemapIndex({
		storefront,
		request
	});

	response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

	return response;
};
