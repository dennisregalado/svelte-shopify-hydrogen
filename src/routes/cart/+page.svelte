<script lang="ts">
	let { data } = $props();
	let { cart } = $derived(data);
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

{JSON.stringify(cart)}
