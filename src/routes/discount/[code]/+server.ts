import { redirect } from '@sveltejs/kit';

export async function GET({ url, params, locals, setHeaders }) {
	const { cart } = locals;
	const { code } = params;

	const searchParams = new URLSearchParams(url.search);
	let redirectParam = searchParams.get('redirect') || searchParams.get('return_to') || '/';

	if (redirectParam.includes('//')) {
		// Avoid redirecting to external URLs to prevent phishing attacks
		redirectParam = '/';
	}

	searchParams.delete('redirect');
	searchParams.delete('return_to');

	const redirectUrl = `${redirectParam}?${searchParams}`;

	if (!code) {
		redirect(303, redirectUrl);
	}

	const result = await cart.updateDiscountCodes([code]);
	const headers = cart.setCartId(result.cart.id);

	setHeaders(Object.fromEntries(headers.entries()));

	// Using set-cookie on a 303 redirect will not work if the domain origin have port number (:3000)
	// If there is no cart id and a new cart id is created in the progress, it will not be set in the cookie
	// on localhost:3000
	redirect(303, redirectUrl);
}
