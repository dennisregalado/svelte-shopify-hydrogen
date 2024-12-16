import { CartForm, type CartQueryDataReturn } from '@shopify/hydrogen';
import { json, redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { cart } = await parent();

	return { cart: await cart.get() };
};

export const actions = {
	default: async ({ request, locals: { cart }, setHeaders }) => {
		const formData = await request.formData();

		const { action, inputs } = CartForm.getFormInput(formData);

		let result: CartQueryDataReturn;

		if (!action) {
			error(400, 'No action provided');
		}

		switch (action) {
			case CartForm.ACTIONS.LinesAdd:
				result = await cart.addLines(inputs.lines);
				break;
			case CartForm.ACTIONS.LinesUpdate:
				result = await cart.updateLines(inputs.lines);
				break;
			case CartForm.ACTIONS.LinesRemove:
				result = await cart.removeLines(inputs.lineIds);
				break;
			case CartForm.ACTIONS.DiscountCodesUpdate: {
				const formDiscountCode = inputs.discountCode;

				// User inputted discount code
				const discountCodes = (formDiscountCode ? [formDiscountCode] : []) as string[];

				// Combine discount codes already applied on cart
				discountCodes.push(...inputs.discountCodes);

				result = await cart.updateDiscountCodes(discountCodes);
				break;
			}
			case CartForm.ACTIONS.GiftCardCodesUpdate: {
				const formGiftCardCode = inputs.giftCardCode;

				// User inputted gift card code
				const giftCardCodes = (formGiftCardCode ? [formGiftCardCode] : []) as string[];

				// Combine gift card codes already applied on cart
				giftCardCodes.push(...inputs.giftCardCodes);

				result = await cart.updateGiftCardCodes(giftCardCodes);
				break;
			}
			case CartForm.ACTIONS.BuyerIdentityUpdate: {
				result = await cart.updateBuyerIdentity({
					...inputs.buyerIdentity
				});
				break;
			}
			default:
				error(400, `${action} cart action is not defined`);
		}

		const cartId = result?.cart?.id;
		const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

		setHeaders(Object.fromEntries(headers.entries()));

		const { cart: cartResult, errors, warnings } = result;

		const redirectTo = formData.get('redirectTo') ?? null;

		if (typeof redirectTo === 'string') {
			redirect(303, redirectTo);
		}

		return json({
			cart: cartResult,
			errors,
			warnings,
			analytics: {
				cartId
			}
		});
	}
};
