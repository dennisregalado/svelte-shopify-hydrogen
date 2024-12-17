<script lang="ts">
	import Analytics from '$lib/analytics';

	import '../app.css';

	let { children, data } = $props();

	let { cart, isLoggedIn } = $derived(data);
 
</script>

<svelte:head>
	<link rel="preconnect" href="https://cdn.shopify.com" />
	<link rel="preconnect" href="https://shop.app" />
</svelte:head>

<a href="#main" class="sr-only">Skip to main content</a>
<Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
	{#await cart then data}
		<pre>{JSON.stringify(data)}</pre>
	{/await}
	<main id="main">
		{@render children()}
	</main>
</Analytics.Provider>
