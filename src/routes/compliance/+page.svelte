<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';
	import { CONTACT } from '$lib/site';

	const intro = [
		{
			title: 'O que é Compliance?',
			paragraphs: [
				'Compliance, palavra de origem inglesa, tem como significado primordial “conformidade”.',
				'No ambiente corporativo, o conceito vai além do simples cumprimento das leis e regulamentos. Refere-se também à adesão estrita às normas internas da empresa, com especial destaque para o Código de Ética e Conduta.'
			]
		},
		{
			title: 'O que é o Programa de Compliance da WB Serviços?',
			paragraphs: [
				'A trajetória da WB SERVIÇOS é marcada pela integração de uma cultura ética no mundo dos negócios ao longo dos anos. Para assegurar a contínua consolidação desse valor crucial, a empresa dispõe do departamento de Compliance, encarregado de supervisionar a conformidade com as normas internas da WB SERVIÇOS, incluindo o Código de Ética e Conduta, além do cumprimento das leis e regulamentos aplicáveis.'
			]
		},
		{
			title: 'Comitê de ética e Compliance',
			paragraphs: [
				'O Comitê de Ética e Conformidade é a instância na WB SERVIÇOS encarregada de supervisionar e monitorar todas as iniciativas vinculadas ao Programa de Conformidade, com ênfase nas áreas abordadas pelo Código de Ética, incluindo a gestão das denúncias recebidas.'
			]
		}
	];

	const foundations = [
		{
			title: 'PREVENÇÃO',
			text: 'Este alicerce visa evitar práticas irregulares, mediante a aplicação das normas internas da WB SERVIÇOS, como o Código de Ética e Conduta, e políticas específicas de Conformidade. São planejados treinamentos e campanhas de comunicação para conscientizar todos os colaboradores sobre a importância da conduta ética nos negócios.'
		},
		{
			title: 'MONITORAMENTO',
			text: 'Sua função é supervisionar as medidas preventivas implementadas e detectar eventuais irregularidades. A empresa disponibiliza o Canal de Ética a todos os colaboradores e ao público externo para comunicar quaisquer comportamentos suspeitos.'
		},
		{
			title: 'REMEDIAÇÃO',
			text: 'Uma vez identificadas falhas ou irregularidades, estas são prontamente tratadas e corrigidas, visando evitar danos tanto à empresa quanto aos demais parceiros e à esfera pública.'
		}
	];
</script>

<Seo
	title="Compliance"
	description="Programa de Compliance da WB Serviços: Código de Ética e Conduta, Manual de Integridade, Comitê de Ética e Canal de Ética com anonimato garantido."
/>

<section class="px-[20px] pt-[40px] md:px-0 md:pt-[80px] md:pb-[40px]">
	<div class="boxed grid gap-[20px] md:grid-cols-2 md:items-center">
		<div class="p-[10px]">
			<h1 class="t-h4 font-bold">Compliance</h1>
			<Faixa />
			<p class="t-body mb-[38px]">
				A <b>WB SERVIÇOS</b> considera a integridade como um alicerce essencial, imprescindível para
				estabelecer relações sólidas, transparentes e confiáveis com seus colaboradores e o público
				externo. A conquista de uma reputação empresarial exemplar, fundamentada na ética, é intrínseca
				à identidade da <b>WB SERVIÇOS</b>, e cada colaborador desempenha um papel essencial na
				preservação desse percurso bem-sucedido.
			</p>
		</div>
		<img src="/img/compliance.webp" alt="" width="1600" height="910" class="h-auto w-full" />
	</div>
</section>

{#each intro as block (block.title)}
	<section class="px-[20px] md:px-0">
		<div class="boxed">
			<div class="p-[10px] pb-[40px]">
				<h2 class="t-h4 font-bold">{block.title}</h2>
				<span class="divider w-[100px]"></span>
				<div class="t-body mt-[20px] mb-[38px]">
					{#each block.paragraphs as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</div>
		</div>
	</section>
{/each}

<section class="bg-brand px-[20px] py-[40px] text-white md:px-0 md:py-[80px]">
	<div class="boxed">
		<h2 class="text-[28px] leading-[1] font-bold md:text-[24px]">
			O Programa de Conformidade da <br />WB SERVIÇOS se apoia em três fundamentos:
		</h2>
		<div class="mt-[60px] grid gap-[20px] md:grid-cols-3">
			{#each foundations as item (item.title)}
				<div class="md:pr-[60px]">
					<h3 class="text-[28px] leading-[1] font-bold md:text-[24px]">{item.title}</h3>
					<span class="divider w-[50px] !bg-white"></span>
					<p class="mt-[20px] text-base leading-6">{item.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="px-[20px] py-[40px] md:px-0 md:py-[80px]">
	<div class="boxed">
		<div class="p-[10px]">
			<h2 class="t-h4 font-bold">CÓDIGO DE ÉTICA E CONDUTA</h2>
			<Faixa />
			<p class="t-body">
				O Código de Ética e Conduta da <b>WB SERVIÇOS</b> é um documento essencial que todos os
				colaboradores devem seguir, independentemente das circunstâncias. Ele engloba os valores
				fundamentais que norteiam as relações da <b>WB SERVIÇOS</b> com seus colaboradores, clientes,
				fornecedores, prestadores de serviços, autoridades governamentais, comunidades e outros
				parceiros.
			</p>
			<a href="/compliance/codigo-de-etica-e-conduta.pdf" target="_blank" rel="noopener" class="btn-dark mt-[20px]">
				Código de Ética e Conduta
			</a>
		</div>
		<div class="mt-[20px] p-[10px]">
			<h2 class="t-h4 font-bold">DEMAIS POLÍTICAS E DOCUMENTOS</h2>
			<span class="divider w-[100px]"></span>
			<div class="mt-[20px] flex flex-col items-start gap-[20px]">
				<a href="/compliance/manual-de-integridade.pdf" target="_blank" rel="noopener" class="btn-orange">
					Manual de Integridade
				</a>
				<a href="/compliance/mensagem-da-alta-direcao.pdf" target="_blank" rel="noopener" class="btn-orange">
					Mensagem da Alta Direção
				</a>
			</div>
		</div>
	</div>
</section>

<section id="canal-de-etica" class="bg-dark px-[20px] py-[40px] text-white md:px-0 md:py-[80px]">
	<div class="boxed">
		<div class="p-[10px]">
			<h2 class="text-[28px] leading-[1] font-bold md:text-[24px]">CANAL DE ÉTICA</h2>
			<Faixa />
			<div class="space-y-[14px] text-base leading-6">
				<p>
					A WB SERVIÇOS implementou um Canal de Ética como parte do seu Programa de Compliance,
					permitindo que colaboradores e o público externo relatem quaisquer comportamentos suspeitos
					ou contrários ao Código de Ética e Conduta, políticas internas ou leis. Este canal oferece
					categorias específicas para diferentes tipos de relatos, incluindo denúncias de corrupção,
					assédio e outras irregularidades. O anonimato e a confidencialidade são garantidos através da
					administração por uma empresa terceirizada especializada, e medidas contra represálias são
					adotadas para proteger os denunciantes de boa-fé.
				</p>
				<p><b>Relatório de Lei 14.611</b></p>
				<p>Confira no link o relatório de lei 14.611 das empresas da WB SERVIÇOS.</p>
			</div>
			<h2 class="mt-[20px] text-[28px] leading-[1] font-bold md:text-[24px]">
				Você gostaria de informar sobre algo que parece suspeito ou inadequado?
			</h2>
			<span class="divider w-[100px]"></span>
			<p class="mt-[20px] text-base leading-6">
				Veja as opções para fazer sua denúncia: preencha o
				<a href="/contato#denuncia" class="font-bold text-brand">formulário do Canal de Denúncias</a>
				(pode ser anônimo) ou ligue para os números: <br />
				<a href="tel:+555135194565" class="font-bold text-brand">(51) 3519-4565</a> ou
				<a href="tel:+5551996046033" class="font-bold text-brand">(51) 9960-46033</a>
				<br /><br />
				Se preferir, entre em contato com o departamento de Compliance pelo e-mail:
				<a href="mailto:{CONTACT.ethicsEmail}" class="font-bold text-brand">{CONTACT.ethicsEmail}</a>
			</p>
		</div>
		<div class="flex flex-wrap gap-[10px] p-[10px]">
			<a href="/contato#denuncia" class="btn-orange mt-[10px]">Fazer denúncia online</a>
			<a href="/compliance/fluxograma-denuncia.pdf" target="_blank" rel="noopener" class="btn-orange mt-[10px]">
				Fluxograma Denúncia
			</a>
		</div>
	</div>
</section>
