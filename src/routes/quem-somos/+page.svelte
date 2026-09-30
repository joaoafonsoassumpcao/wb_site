<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	const gallery = [
		{ src: '/img/galeria/fachada.webp', alt: 'Fachada do prédio do escritório' },
		{ src: '/img/galeria/recepcao.webp', alt: 'Recepção do escritório' },
		{ src: '/img/galeria/lobby.webp', alt: 'Lobby do escritório' },
		{ src: '/img/galeria/sala-reuniao.webp', alt: 'Sala de reunião' },
		{ src: '/img/galeria/corredor.webp', alt: 'Corredor do escritório' },
		{ src: '/img/galeria/escritorio.webp', alt: 'Estações de trabalho' },
		{ src: '/img/galeria/carro.webp', alt: 'Veículo da frota WB Serviços' }
	];
	let lightbox = $state<number | null>(null);

	// Capa com botão de play por cima, como o widget de vídeo do Elementor
	let video = $state<HTMLVideoElement>();
	let playing = $state(false);
	function play() {
		playing = true;
		queueMicrotask(() => video?.play());
	}

	const pillars = [
		{
			title: 'Missão',
			text: 'Oferecer soluções personalizadas para cada cliente, eliminando os custos adicionais de contratação e os desafios de lidar diretamente com diversos profissionais e fornecedores. Com processos sempre atualizados, mão de obra qualificada e a mais avançada tecnologia do mercado, temos o compromisso com a excelência em todas as etapas dos serviços que prestamos.'
		},
		{
			title: 'Visão',
			text: 'Nossa visão é ser referência no setor de mão de obra terceirizada, reconhecidos não apenas pela excelência dos nossos serviços, mas também pela integridade e transparência nas relações com nossos clientes e colaboradores.'
		},
		{
			title: 'Valores',
			text: 'Valorizamos a ética, a responsabilidade social e o respeito ao meio ambiente em todas as nossas atividades. Estamos em constante evolução, buscando aprimorar nossos processos e oferecer soluções inovadoras que agreguem valor ao negócio dos nossos clientes.'
		}
	];

	const clientLogos = [
		{ file: 'banrisul', name: 'Banrisul', w: 174, h: 74 },
		{ file: 'assistencia-social-rs', name: 'Secretaria de Assistência Social do RS', w: 174, h: 74 },
		{ file: 'movere', name: 'Movere Locadora de Veículos', w: 174, h: 74 },
		{ file: 'kowal', name: 'Kowal Engenharia Ambiental', w: 150, h: 74 },
		{ file: 'maasef', name: 'Grupo Maasef', w: 174, h: 74 },
		{ file: 'defensoria-rs', name: 'Defensoria Pública do Estado do RS', w: 200, h: 75 },
		{ file: 'pge-rs', name: 'Procuradoria-Geral do Estado do RS', w: 106, h: 75 },
		{ file: 'dmlu', name: 'Departamento Municipal de Limpeza Urbana', w: 250, h: 101 },
		{ file: 'saude-rs-hps', name: 'Secretaria da Saúde do RS, Hospital Psiquiátrico São Pedro', w: 231, h: 100 },
		{ file: 'assembleia-rs', name: 'Assembleia Legislativa do RS', w: 166, h: 75 }
	];

	const clientNames = [
		'Excellence Tower Empreendimentos Imobiliários',
		'Rmx2 Consultoria Empresarial',
		'Fapay Meios de Pagamento',
		'Orien Participações e Investimentos',
		'WWA – World Wild Assistance',
		'Grupo R&C Negócios'
	];
</script>

<Seo
	title="Quem Somos"
	description="A WB Serviços atende empresas privadas e órgãos públicos municipais, estaduais e federais com soluções completas em terceirização e assessoria jurídica própria."
/>

<section class="px-[20px] pt-[40px] pb-[40px] md:px-0 md:pt-[80px] md:pb-[80px]">
	<div class="boxed grid gap-[20px] md:grid-cols-2">
		<div class="p-[10px]">
			<h1 class="t-h2">
				<b>Cuidar</b> do seu <br />negócio é a <b>nossa <br />especialidade</b>.
			</h1>
			<Faixa />
			<div class="t-body">
				<p>
					A WB SERVIÇOS tem uma vasta experiência no fornecimento de soluções completas e
					integradas, atendendo tanto empresas privadas quanto órgãos públicos em âmbito municipal,
					estadual e federal. Com um histórico sólido em licitações e contratações nas suas mais
					diversas modalidades, estamos determinados a expandir ainda mais nossos horizontes, levando
					as mais modernas técnicas de gestão de serviços em total conformidade com as normas e
					regulamentações vigentes.
				</p>
				<p>
					Somos ainda uma das poucas empresas do mercado com assessoria jurídica, transmitindo
					credibilidade e confiabilidade desde o primeiro contato até a conclusão dos serviços.
				</p>
			</div>
		</div>
		<img
			src="/img/quem-somos.webp"
			alt="Sólida experiência de 3 anos no mercado de serviços"
			width="400"
			height="433"
			class="mx-auto h-auto w-full max-w-[350px] md:max-w-[415px]"
		/>
	</div>
</section>

<section class="px-[20px] md:px-0">
	<div class="boxed">
		<!-- Galeria (abre em tela cheia ao clicar, como no Elementor) -->
		<ul class="grid grid-cols-2 gap-[10px] md:grid-cols-3">
			{#each gallery as item, i (item.src)}
				<li>
					<button
						type="button"
						class="block aspect-[3/2] w-full overflow-hidden"
						aria-label="Ampliar: {item.alt}"
						onclick={() => (lightbox = i)}
					>
						<img src={item.src} alt={item.alt} class="h-full w-full object-cover" loading="lazy" />
					</button>
				</li>
			{/each}
		</ul>

		<div class="mx-auto mt-[100px] max-w-[422px]">
			<h2 class="t-h2 text-center">Conheça a <b>WB Serviços</b></h2>
			<div class="relative mt-[20px] aspect-[422/750] w-full bg-black">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					bind:this={video}
					class="h-full w-full object-cover"
					src="/video/wb-servicos.mp4"
					poster="/img/equipe-em-campo.webp"
					controls={playing}
					preload="none"
					playsinline
				></video>
				{#if !playing}
					<button
						type="button"
						class="group absolute inset-0 flex items-center justify-center"
						aria-label="Reproduzir vídeo"
						onclick={play}
					>
						<span
							class="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white/80 bg-black/20 transition-colors group-hover:bg-black/40"
						>
							<svg viewBox="0 0 24 24" class="ml-1 h-6 w-6 fill-white/90" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
						</span>
					</button>
				{/if}
			</div>
		</div>

		<div class="grid gap-[20px] pt-[40px] pb-[10px] md:grid-cols-3 md:pt-[100px]">
			{#each pillars as pillar (pillar.title)}
				<div class="p-[10px]">
					<h3 class="text-[28px] leading-[1] font-bold text-brand md:text-[24px]">{pillar.title}</h3>
					<span class="divider w-[66px] md:w-[69px]"></span>
					<!-- mb: parágrafo vazio (&nbsp;) que o texto original tinha no fim -->
					<p class="t-body mt-[20px] mb-[38px]">{pillar.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<div class="h-[30px] bg-brand"></div>
<section class="bg-dark px-[20px] py-[40px] md:px-0 md:py-[80px]">
	<div class="boxed text-center">
		<h2 class="t-h2 !text-white">Nossos <b>Clientes</b></h2>
		<Faixa class="justify-center" />
		<ul class="grid grid-cols-1 items-center gap-[10px] md:grid-cols-5">
			{#each clientLogos as client (client.file)}
				<li class="flex h-[88px] items-center justify-center">
					<img
						src="/img/clientes/{client.file}.webp"
						alt={client.name}
						title={client.name}
						width={client.w}
						height={client.h}
						class="max-h-full w-auto max-w-full object-contain"
						loading="lazy"
					/>
				</li>
			{/each}
		</ul>
		<ul class="mt-[20px] space-y-[26px] text-base text-white">
			{#each clientNames as name (name)}
				<li>{name}</li>
			{/each}
		</ul>
	</div>
</section>

<Lightbox items={gallery} bind:index={lightbox} />
