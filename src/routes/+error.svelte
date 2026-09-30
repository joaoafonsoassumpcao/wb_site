<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Página não encontrada' : 'Erro'} | WB Serviços</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto flex max-w-3xl flex-col items-start px-4 py-24">
	<p class="text-sm font-semibold tracking-widest text-brand-dark uppercase">Erro {page.status}</p>
	<h1 class="mt-2 text-3xl font-bold md:text-4xl">
		{page.status === 404 ? 'Esta página não existe mais.' : 'Algo deu errado.'}
	</h1>
	<div class="brand-stripe mt-5"></div>
	<p class="mt-6 text-lg text-muted">
		O site da WB Serviços foi renovado e alguns endereços mudaram. Use o menu acima ou volte para o
		início.
	</p>
	<a
		href="/"
		class="mt-8 inline-flex items-center rounded-md bg-brand px-5 py-3 font-semibold text-ink hover:bg-brand-dark"
	>
		Ir para o início
	</a>
</section>
