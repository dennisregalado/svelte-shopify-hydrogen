<script lang="ts">
	import '../app.css';

	let { children, data } = $props();

	let { cart } = $derived(data);

</script>

<svelte:head>
	<link rel="preconnect" href="https://cdn.shopify.com" />
	<link rel="preconnect" href="https://shop.app" />
</svelte:head>

<a href="#main" class="sr-only">Skip to main content</a>
{#await cart then data}
	<pre>{JSON.stringify(data)}</pre>
{/await}

<main id="main">
	{@render children()}
</main>
