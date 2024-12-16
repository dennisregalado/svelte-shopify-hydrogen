<script module lang="ts">
	import type {
		AttributeInput,
		CartBuyerIdentityInput,
		CartInput,
		CartLineInput,
		CartLineUpdateInput,
		CartSelectedDeliveryOptionInput,
		Scalars
	} from '@shopify/hydrogen-react/dist/types/storefront-api-types';

	type OtherFormData = {
		[key: string]: unknown;
	};

	type CartAttributesUpdateProps = {
		action: 'AttributesUpdateInput';
		inputs?: {
			attributes: AttributeInput[];
		} & OtherFormData;
	};
	type CartAttributesUpdateRequire = {
		action: 'AttributesUpdateInput';
		inputs: {
			attributes: AttributeInput[];
		} & OtherFormData;
	};

	type CartBuyerIdentityUpdateProps = {
		action: 'BuyerIdentityUpdate';
		inputs?: {
			buyerIdentity: CartBuyerIdentityInput;
		} & OtherFormData;
	};
	type CartBuyerIdentityUpdateRequire = {
		action: 'BuyerIdentityUpdate';
		inputs: {
			buyerIdentity: CartBuyerIdentityInput;
		} & OtherFormData;
	};

	type CartCreateProps = {
		action: 'Create';
		inputs?: {
			input: CartInput;
		} & OtherFormData;
	};
	type CartCreateRequire = {
		action: 'Create';
		inputs: {
			input: CartInput;
		} & OtherFormData;
	};
	type CartDiscountCodesUpdateProps = {
		action: 'DiscountCodesUpdate';
		inputs?: {
			discountCodes: string[];
		} & OtherFormData;
	};
	type CartDiscountCodesUpdateRequire = {
		action: 'DiscountCodesUpdate';
		inputs: {
			discountCodes: string[];
		} & OtherFormData;
	};
	type CartGiftCardCodesUpdateProps = {
		action: 'GiftCardCodesUpdate';
		inputs?: {
			giftCardCodes: string[];
		} & OtherFormData;
	};
	type CartGiftCardCodesUpdateRequire = {
		action: 'GiftCardCodesUpdate';
		inputs: {
			giftCardCodes: string[];
		} & OtherFormData;
	};

	export type OptimisticCartLineInput = CartLineInput & {
		selectedVariant?: unknown;
	};

	type CartLinesAddProps = {
		action: 'LinesAdd';
		inputs?: {
			lines: Array<OptimisticCartLineInput>;
		} & OtherFormData;
	};

	type CartLinesAddRequire = {
		action: 'LinesAdd';
		inputs: {
			lines: Array<OptimisticCartLineInput>;
		} & OtherFormData;
	};

	type CartLinesUpdateProps = {
		action: 'LinesUpdate';
		inputs?: {
			lines: CartLineUpdateInput[];
		} & OtherFormData;
	};
	type CartLinesUpdateRequire = {
		action: 'LinesUpdate';
		inputs: {
			lines: CartLineUpdateInput[];
		} & OtherFormData;
	};

	type CartLinesRemoveProps = {
		action: 'LinesRemove';
		inputs?: {
			lineIds: string[];
		} & OtherFormData;
	};
	type CartLinesRemoveRequire = {
		action: 'LinesRemove';
		inputs: {
			lineIds: string[];
		} & OtherFormData;
	};

	type CartNoteUpdateProps = {
		action: 'NoteUpdate';
		inputs?: {
			note: string;
		} & OtherFormData;
	};
	type CartNoteUpdateRequire = {
		action: 'NoteUpdate';
		inputs: {
			note: string;
		} & OtherFormData;
	};

	type CartSelectedDeliveryOptionsUpdateProps = {
		action: 'SelectedDeliveryOptionsUpdate';
		inputs?: {
			selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
		} & OtherFormData;
	};

	type CartSelectedDeliveryOptionsUpdateRequire = {
		action: 'SelectedDeliveryOptionsUpdate';
		inputs: {
			selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
		} & OtherFormData;
	};

	type CartMetafieldsSetProps = {
		action: 'MetafieldsSet';
		inputs?: {
			metafields: MetafieldWithoutOwnerId[];
		} & OtherFormData;
	};
	type CartMetafieldsSetRequire = {
		action: 'MetafieldsSet';
		inputs: {
			metafields: MetafieldWithoutOwnerId[];
		} & OtherFormData;
	};

	type CartMetafieldDeleteProps = {
		action: 'MetafieldsDelete';
		inputs?: {
			key: Scalars['String']['input'];
		} & OtherFormData;
	};
	type CartMetafieldDeleteRequire = {
		action: 'MetafieldsDelete';
		inputs: {
			key: Scalars['String']['input'];
		} & OtherFormData;
	};

	type CartCustomProps = {
		action: `Custom${string}`;
		inputs?: Record<string, unknown>;
	};
	type CartCustomRequire = {
		action: `Custom${string}`;
		inputs: Record<string, unknown>;
	};

	type CartFormCommonProps = {
		/**
		 * Children nodes of CartForm.
		 */
		children: Snippet<[{ loading: boolean }]>;
		/**
		 * The route to submit the form to. Defaults to the current route.
		 */
		route?: string;
	};

	type CartActionInputProps =
		| CartAttributesUpdateProps
		| CartBuyerIdentityUpdateProps
		| CartCreateProps
		| CartDiscountCodesUpdateProps
		| CartGiftCardCodesUpdateProps
		| CartLinesAddProps
		| CartLinesUpdateProps
		| CartLinesRemoveProps
		| CartNoteUpdateProps
		| CartSelectedDeliveryOptionsUpdateProps
		| CartMetafieldsSetProps
		| CartMetafieldDeleteProps
		| CartCustomProps;

	export type CartActionInput =
		| CartAttributesUpdateRequire
		| CartBuyerIdentityUpdateRequire
		| CartCreateRequire
		| CartDiscountCodesUpdateRequire
		| CartGiftCardCodesUpdateRequire
		| CartLinesAddRequire
		| CartLinesUpdateRequire
		| CartLinesRemoveRequire
		| CartNoteUpdateRequire
		| CartSelectedDeliveryOptionsUpdateRequire
		| CartMetafieldsSetRequire
		| CartMetafieldDeleteRequire
		| CartCustomRequire;

	const INPUT_NAME = 'cartFormInput';

	const ACTIONS = {
		AttributesUpdateInput: 'AttributesUpdateInput',
		BuyerIdentityUpdate: 'BuyerIdentityUpdate',
		Create: 'Create',
		DiscountCodesUpdate: 'DiscountCodesUpdate',
		GiftCardCodesUpdate: 'GiftCardCodesUpdate',
		LinesAdd: 'LinesAdd',
		LinesRemove: 'LinesRemove',
		LinesUpdate: 'LinesUpdate',
		NoteUpdate: 'NoteUpdate',
		SelectedDeliveryOptionsUpdate: 'SelectedDeliveryOptionsUpdate',
		MetafieldsSet: 'MetafieldsSet',
		MetafieldDelete: 'MetafieldDelete'
	} as const;

	export { INPUT_NAME, ACTIONS };
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';

	type CartFormProps = CartActionInputProps & CartFormCommonProps;

	let { children, action, inputs, route = '/cart' }: CartFormProps = $props();

	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;

		return async ({ result, update }) => {
			if (result.type != 'success') return;

			await update({
				invalidateAll: true
			});

			loading = false;
		};
	}}
	action={route || ''}
>
	<input type="hidden" name={INPUT_NAME} value={JSON.stringify({ action, inputs })} />
	{@render children({ loading })}
</form>
