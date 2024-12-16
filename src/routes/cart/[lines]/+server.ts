/**
 * Automatically creates a new cart based on the URL and redirects straight to checkout.
 * Expected URL structure:
 * ```js
 * /cart/<variant_id>:<quantity>
 *
 * ```
 *
 * More than one `<variant_id>:<quantity>` separated by a comma, can be supplied in the URL, for
 * carts with more than one product variant.
 *
 * @example
 * Example path creating a cart with two product variants, different quantities, and a discount code in the querystring:
 * ```js
 * /cart/41007289663544:1,41007289696312:2?discount=HYDROBOARD
 *
 * ```
 */

import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ params, locals: { cart }, request, setHeaders }) => {
	const { lines } = params;

	if (!lines) {
		redirect(307, '/cart');
	}

	const linesMap = lines.split(',').map((line) => {
		const lineDetails = line.split(':');
		const variantId = lineDetails[0];
		const quantity = parseInt(lineDetails[1], 10);

		return {
			merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
			quantity
		};
	});

	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);

	const discount = searchParams.get('discount');
	const discountArray = discount ? [discount] : [];

	// create a cart
	const result = await cart.create({
		lines: linesMap,
		discountCodes: discountArray
	});

	const cartResult = result.cart;

	if (result.errors?.length || !cartResult) {
		error(410, 'Link may be expired. Try checking the URL.');
	}

	// Update cart id in cookie
	const headers = cart.setCartId(cartResult.id);

	// redirect to checkout
	if (cartResult.checkoutUrl) {
		setHeaders(Object.fromEntries(headers.entries()));

		redirect(307, cartResult.checkoutUrl);
	} else {
		error(410, 'No checkout URL found');
	}
};
