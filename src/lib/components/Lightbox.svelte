<script lang="ts">
	import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';

	type Item = { src: string; alt: string };
	let { items, index = $bindable<number | null>(null) }: { items: Item[]; index?: number | null } =
		$props();

	function close() {
		index = null;
	}
	function step(delta: number) {
		if (index === null) return;
		index = (index + delta + items.length) % items.length;
	}
	function onKey(e: KeyboardEvent) {
		if (index === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:window onkeydown={onKey} />

<!-- Equivalente ao lightbox do Elementor na galeria -->
{#if index !== null}
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
		role="dialog"
		aria-modal="true"
		aria-label={items[index].alt}
	>
		<button type="button" class="absolute inset-0 cursor-default" aria-label="Fechar" onclick={close}></button>
		<img src={items[index].src} alt={items[index].alt} class="relative max-h-[90vh] max-w-[92vw] object-contain" />
		<button type="button" class="absolute top-4 right-4 p-2 text-white/80 hover:text-white" aria-label="Fechar" onclick={close}>
			<X class="h-7 w-7" />
		</button>
		<button type="button" class="absolute left-2 p-2 text-white/80 hover:text-white" aria-label="Anterior" onclick={() => step(-1)}>
			<ChevronLeft class="h-9 w-9" />
		</button>
		<button type="button" class="absolute right-2 p-2 text-white/80 hover:text-white" aria-label="Próxima" onclick={() => step(1)}>
			<ChevronRight class="h-9 w-9" />
		</button>
	</div>
{/if}
