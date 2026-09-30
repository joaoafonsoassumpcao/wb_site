<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';

	const areas = [
		{
			img: 'limpeza',
			title: 'Limpeza e Conservação',
			text: 'Com máxima atenção aos detalhes, nossa equipe trabalha para assegurar a higienização e organização de espaços comerciais, industriais e residenciais. Além disso, oferecemos materiais de limpeza com valores diferenciados para condomínios e órgãos públicos.'
		},
		{
			img: 'seguranca',
			title: 'Segurança Patrimonial',
			text: 'Contamos com profissionais treinados e especializados nas mais modernas técnicas de segurança para proteger seu patrimônio de forma responsável e humanizada.'
		},
		{
			img: 'portaria',
			title: 'Portaria e Recepção',
			text: 'Sabemos que a primeira impressão é a que fica. Por isso, nossos colaboradores passam por um criterioso processo de seleção e treinamento para receber visitantes com cordialidade, controlar o acesso de forma eficiente e proporcionar um atendimento de excelência.'
		},
		{
			img: 'jardinagem',
			title: 'Jardinagem e Paisagismo',
			text: 'Transformamos espaços verdes em obras de arte natural, criando ambientes que inspiram beleza, harmonia e aconchego. Nossa equipe altamente qualificada trabalha para trazer à vida jardins exuberantes, repletos de cores, texturas e aromas.'
		},
		{
			img: 'administrativo',
			title: 'Serviços Administrativos',
			text: 'Oferecemos apoio administrativo, auxiliando em atividades burocráticas para otimizar o funcionamento do seu negócio e permitir que você foque no que realmente importa.'
		},
		{
			img: 'condominial',
			title: 'Gestão condominial',
			text: 'Administramos todos os processos relativos à rotina de um condomínio residencial ou empresarial, como limpeza e conservação, jardinagem, monitoramento eletrônico, fornecimento de produtos e emissão de boletos.'
		},
		{
			img: 'saude',
			title: 'Atendimento em Saúde',
			text: 'Disponibilizamos profissionais da saúde para atender às demandas de atendimento em diversos contextos, seja em empresas ou instituições.'
		},
		{
			img: 'coleta',
			title: 'Coleta de Lixo Urbano <br>e Hospitalar',
			text: 'Contribuímos para a limpeza e preservação do meio ambiente, realizando a coleta e destinação adequada de resíduos urbanos e hospitalares.'
		},
		{
			img: 'frota',
			title: 'Frota de Veículos',
			text: 'Comprometidos em proporcionar segurança, pontualidade e conforto, oferecemos soluções de transporte com uma frota de veículos moderna, garantindo máxima eficiência em todos os deslocamentos.'
		}
	];
</script>

<Seo
	title="Áreas de Atuação"
	description="Limpeza e conservação, segurança patrimonial, portaria, jardinagem, serviços administrativos, gestão condominial, saúde, coleta de resíduos e frota de veículos."
/>

<section class="px-[20px] pb-[40px] md:px-0 md:pt-[80px] md:pb-[80px]">
	<div class="boxed">
		<div class="p-[10px]">
			<h1 class="t-h2">Conheça nossas <br /><b>principais áreas</b> de atuação.</h1>
			<Faixa />
			<ul class="grid gap-[20px] md:grid-cols-3">
				{#each areas as area (area.img)}
					<li class="pr-[60px]">
						<img
							src="/img/areas/{area.img}.webp"
							alt=""
							width="293"
							height="196"
							class="h-auto w-full max-w-[293px]"
							loading="lazy"
						/>
						<h2 class="mt-[20px] text-[28px] leading-[1] font-bold text-heading md:text-[20px]">
							{@html area.title}
						</h2>
						<span class="divider w-[135px] md:w-[150px]"></span>
						<p class="t-body mt-[20px]">{area.text}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="bg-brand px-[20px] py-[40px] text-center md:px-0">
	<div class="boxed">
		<p class="text-[22px] leading-[1.5] text-white md:text-[24px] md:leading-[1]">
			Seja qual for a sua necessidade, a <b>WB SERVIÇOS</b> está preparada para atendê-lo.
		</p>
		<a href="/contato" class="btn-dark mt-[20px]">Entre em contato</a>
	</div>
</section>
