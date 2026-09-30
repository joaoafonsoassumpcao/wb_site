<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';

	const reasons = [
		{ icon: 'icon-experiencia', html: '<b>Experiência</b> <br>comprovada no mercado.' },
		{ icon: 'icon-prazo', html: '<b>Compromisso</b><br>com prazos e resultados.' },
		{ icon: 'icon-equipe', html: '<b>Equipe dedicada </b><br>e comprometida com o sucesso <br>do cliente.' },
		{ icon: 'icon-solucao', html: '<b>Soluções personalizadas<br></b>para cada necessidade.' },
		{ icon: 'icon-contrato', html: 'Contratos <b>flexíveis</b>.' },
		{ icon: 'icon-valor', html: 'Preços <b>competitivos</b>.' }
	];
</script>

<Seo
	title="WB Serviços"
	description="Terceirização de serviços gerais para empresas privadas e órgãos públicos: limpeza, segurança, portaria, jardinagem, apoio administrativo e mais. Do Sul para todo o Brasil."
/>

<!-- Destaque: imagem larga no desktop, recorte quadrado no celular -->
<section class="hidden px-[10px] pt-[10px] pb-[30px] md:block">
	<div class="relative">
		<img
			src="/img/hero.webp"
			alt="Colaboradores da WB Serviços sobre as cores da marca"
			width="1489"
			height="467"
			class="h-auto w-full"
			fetchpriority="high"
		/>
		<h1 class="t-h2 absolute top-[61%] left-[14%] leading-[1]">
			Cuidar do seu negócio<br />é <b>nossa especialidade</b>
		</h1>
	</div>
</section>
<section
	class="flex h-[326px] flex-col justify-end bg-cover bg-center pb-[40px] md:hidden"
	style="background-image: url('/img/hero-mobile.webp')"
>
	<h1 class="px-[10px] text-[24px] leading-[24px] text-navy">
		Cuidar do seu negócio<br />é <b>nossa especialidade</b>
	</h1>
</section>

<!-- Por que escolher -->
<section class="bg-brand px-[20px] py-[40px] md:px-0 md:py-[80px]">
	<div class="boxed text-center text-white">
		<h2 class="text-[28px] leading-[1.05] md:text-[32px] md:leading-[1]">
			Por que escolher <br />a <b>WB Serviços</b>
		</h2>
		<div class="mt-[20px] py-[15px]">
			<span class="mx-auto block h-[3px] w-[35px] bg-white md:w-[114px]"></span>
		</div>
		<p class="mt-[20px] text-[20px] leading-[20px]">
			Menos burocracia para contratações. <b>Mais facilidades.</b> <b>Menos custos.</b> Mais recursos
			para o seu negócio.
		</p>
		<ul class="mt-[20px] grid gap-[20px] p-[10px] md:grid-cols-3">
			{#each reasons as reason (reason.icon)}
				<li class="flex flex-col items-center p-[10px] md:min-h-[175px]">
					<img
						src="/img/{reason.icon}.webp"
						alt=""
						width="100"
						height="100"
						class="h-[90px] w-[90px] md:h-[75px] md:w-[75px]"
						loading="lazy"
					/>
					<p class="mt-[20px] text-[20px] leading-[20px]">{@html reason.html}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Abrangência -->
<section class="px-[20px] py-[40px] md:px-0 md:py-[80px]">
	<div class="boxed">
		<h2 class="t-h2">
			Do Sul <b>para todo Brasil</b>: <br />a gente vai <b>até onde você estiver</b>.
		</h2>
		<Faixa />
		<div class="grid items-center gap-[20px] p-[10px] md:grid-cols-2">
			<img
				src="/img/mapa-brasil.webp"
				alt="Mapa do Brasil com o Rio Grande do Sul em destaque"
				width="700"
				height="700"
				class="mx-auto w-full max-w-[550px]"
				loading="lazy"
			/>
			<img
				src="/img/cidades.webp"
				alt="Porto Alegre, Lajeado, Encantado, Carazinho, Passo Fundo, Santa Maria, Pelotas, Marau, Novo Hamburgo, Caxias do Sul e Gramado"
				width="400"
				height="400"
				class="mx-auto w-full max-w-[330px] md:max-w-[325px]"
				loading="lazy"
			/>
		</div>
	</div>
</section>
