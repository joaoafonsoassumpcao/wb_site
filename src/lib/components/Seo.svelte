<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/site';

	let { title, description }: { title: string; description: string } = $props();

	const fullTitle = $derived(title === 'WB Serviços' ? title : `${title} | WB Serviços`);
	const canonical = $derived(SITE_URL + (page.url.pathname === '/' ? '' : page.url.pathname));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:site_name" content="WB Serviços" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{SITE_URL}/img/og.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
