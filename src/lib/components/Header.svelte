<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { Menu, X } from '@lucide/svelte';
	import { NAV, INTRA_URL, type NavItem } from '$lib/site';

	let open = $state(false);

	afterNavigate(() => (open = false));

	const items: NavItem[] = [...NAV, { label: 'Acesso WB', href: INTRA_URL, external: true, strong: true }];

	function isActive(item: { href: string; external?: boolean }) {
		if (item.external) return false;
		return item.href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(item.href);
	}
</script>

<header class="relative bg-white">
	<div class="relative flex justify-center pt-[10px] pb-[50px] lg:pb-0">
		<a href="/" aria-label="WB Serviços, página inicial">
			<img src="/img/logo.webp" alt="WB Serviços" width="640" height="266" class="h-[71px] w-[171px]" />
		</a>
		<button
			type="button"
			class="absolute top-[10px] right-[10px] p-2 text-dark lg:hidden"
			aria-label={open ? 'Fechar menu' : 'Abrir menu'}
			aria-expanded={open}
			aria-controls="menu-mobile"
			onclick={() => (open = !open)}
		>
			{#if open}<X class="h-7 w-7" strokeWidth={3} />{:else}<Menu class="h-7 w-7" strokeWidth={3} />{/if}
		</button>
	</div>

	<!-- Desktop: menu centralizado abaixo do logo, item ativo laranja com sublinhado -->
	<nav class="hidden justify-center pt-[30px] pb-[20px] lg:flex" aria-label="Principal">
		<ul class="flex">
			{#each items as item (item.href)}
				<li>
					<a
						href={item.href}
						aria-current={isActive(item) ? 'page' : undefined}
						class="relative block px-5 py-[13px] text-[13px] leading-5 text-dark transition-colors hover:text-brand aria-[current=page]:text-brand {item.strong
							? 'font-bold'
							: ''} after:absolute after:inset-x-5 after:bottom-0 after:h-[3px] after:bg-brand after:opacity-0 aria-[current=page]:after:opacity-100"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Celular: lista centralizada sobre o conteúdo -->
	{#if open}
		<nav id="menu-mobile" class="absolute inset-x-0 top-[55px] z-40 bg-white shadow-md lg:hidden" aria-label="Principal">
			<ul>
				{#each items as item (item.href)}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item) ? 'page' : undefined}
							class="block px-5 py-[10px] text-center text-[18px] leading-5 text-[#33373d] aria-[current=page]:bg-[#3f444b] aria-[current=page]:text-white"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
