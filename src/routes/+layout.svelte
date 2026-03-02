<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/common/nav.svelte';
	import type { LayoutServerData } from './$types';
	import Footer from "$lib/components/common/footer.svelte";

	let { children, data }: { children: any; data: LayoutServerData } = $props();

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Nav user={data.user} />
{@render children()}
<Footer></Footer>