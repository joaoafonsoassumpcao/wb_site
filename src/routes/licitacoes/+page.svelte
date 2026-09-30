<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';
</script>

<Seo
	title="Licitações"
	description="Terceirização de serviços gerais para o setor público e privado, com mão de obra qualificada, uniformes, EPIs e tudo o que estiver previsto em contrato."
/>

<section class="px-[20px] py-[40px] md:px-0 md:py-[80px]">
	<div class="boxed grid md:grid-cols-2">
		<div class="p-[10px]">
			<h1 class="t-h2">
				Excelência em atuação com<br /> <b>empresas privadas</b> e <br /><b>licitações públicas</b>.
			</h1>
			<img
				src="/img/licitacoes.webp"
				alt="Assinatura de contrato"
				width="559"
				height="148"
				class="mt-[20px] h-auto w-full"
			/>
			<Faixa />
			<div class="t-body">
				<p>
					Somos a <b>WB SERVIÇOS</b>, uma empresa especializada em terceirização de serviços gerais,
					que presta atendimento tanto a instituições do setor privado quanto do setor público, com
					total flexibilidade para adequar-se às necessidades específicas de cada cliente. Nossa
					oferta inclui mão de obra qualificada, uniformes, equipamentos de proteção individual (EPIs)
					e tudo o que estiver previsto em contrato, assegurando uma entrega completa e de alto padrão.
				</p>
				<p>
					Com uma <b>sólida experiência de 3 anos no mercado de serviços</b>, contamos desde o início
					com a expertise de nossos sócios-fundadores, reconhecidos profissionais do direito
					empresarial que possuem uma carreira jurídica de mais de 20 anos e também lideram o
					prestigiado escritório Werkhauser &amp; Bierhals Advogados.
				</p>
			</div>
			<a href="/contato" class="btn-orange mt-[20px] md:mt-[60px]">Entre em contato</a>
		</div>
	</div>
</section>
