<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';

	let { children } = $props();
</script>

<a
	href="#conteudo"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
>
	Ir para o conteúdo
</a>
<div class="flex min-h-screen flex-col">
	<Header />
	<main id="conteudo" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
<WhatsAppButton />
