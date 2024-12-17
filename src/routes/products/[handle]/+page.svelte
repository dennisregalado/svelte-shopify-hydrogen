<script lang="ts">
	import { CartForm as CartFormComponent } from '@shopify/hydrogen';
	import type { ProductFragment } from '$storefrontapi';
	import CartForm from '$components/custom/CartForm.svelte';

	let {
		data
	}: {
		data: {
			product: ProductFragment;
		};
	} = $props();

	let { product } = $derived(data);

	let { title, handle } = $derived(product);

	let selectedVariant = $derived(product.selectedOrFirstAvailableVariant);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href="/products/{handle}" />
</svelte:head>

{#if selectedVariant}
	<CartForm
		action={CartFormComponent.ACTIONS.LinesAdd}
		inputs={{ lines: [{ quantity: 1, merchandiseId: selectedVariant.id }] }}
	>
		{#snippet children({ loading })}
			<button class="cursor-pointer disabled:cursor-wait" disabled={loading}>Add to Cart</button>
		{/snippet}
	</CartForm>
{/if}
