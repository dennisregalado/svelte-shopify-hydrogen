<script lang="ts">
	import { CartForm as CartFormComponent } from '@shopify/hydrogen';

	import CartForm from '$components/custom/CartForm.svelte';

	import { getSelectedProductOptions, useOptimisticVariant } from '@shopify/hydrogen';

	let { data } = $props();

	let { product } = $derived(data);

	let { title, handle } = $derived(product);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href={`/products/${handle}`} />
</svelte:head>

<CartForm action={CartFormComponent.ACTIONS.LinesAdd}>
	<button>Add to Cart</button>
</CartForm>
