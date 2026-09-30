<script lang="ts">
	let { class: klass = '' }: { class?: string } = $props();
</script>

<!-- Faixa de 4 cores usada sob os títulos no site antigo (widget de 24px, 20px de respiro) -->
<div class="my-[20px] flex h-[24px] items-center {klass}">
	<img src="/img/faixa.png" alt="" width="228" height="3" class="block h-[3px] w-[228px] max-w-full" />
</div>
