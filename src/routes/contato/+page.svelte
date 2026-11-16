<script lang="ts">
	import { enhance } from '$app/forms';
	import { LoaderCircle } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Faixa from '$lib/components/Faixa.svelte';
	import { CONTACT } from '$lib/site';
	import type { ContactValues, ReportValues } from './+page.server';

	type FormState = {
		kind?: 'contato' | 'denuncia';
		success?: boolean;
		values?: ContactValues;
		reportValues?: ReportValues;
		errors?: Record<string, string>;
		message?: string;
		protocol?: string;
	} | null;

	let { form }: { form: FormState } = $props();

	// Cada formulário só enxerga o resultado da própria action.
	const contactForm = $derived(form?.kind === 'contato' ? form : null);
	const reportForm = $derived(form?.kind === 'denuncia' ? form : null);

	let sending = $state(false);
	let sendingReport = $state(false);
	// Sem marcar = denúncia anônima (padrão).
	let identify = $state(false);
	$effect.pre(() => {
		if (reportForm?.reportValues?.identify !== undefined) identify = reportForm.reportValues.identify;
	});

	const categories = [
		{ value: 'assedio_moral', label: 'Assédio moral' },
		{ value: 'assedio_sexual', label: 'Assédio sexual' },
		{ value: 'discriminacao', label: 'Discriminação' },
		{ value: 'corrupcao', label: 'Corrupção ou suborno' },
		{ value: 'fraude', label: 'Fraude ou desvio' },
		{ value: 'conflito_interesses', label: 'Conflito de interesses' },
		{ value: 'seguranca_trabalho', label: 'Segurança do trabalho' },
		{ value: 'outro', label: 'Outro' }
	];

	const relationships = [
		{ value: 'colaborador', label: 'Colaborador(a) da WB' },
		{ value: 'ex_colaborador', label: 'Ex-colaborador(a)' },
		{ value: 'cliente', label: 'Cliente ou órgão contratante' },
		{ value: 'fornecedor', label: 'Fornecedor' },
		{ value: 'outro', label: 'Outro' }
	];

	const subjects = [
		{ value: 'duvida', label: 'Dúvida' },
		{ value: 'orcamento', label: 'Orçamento' },
		{ value: 'sugestao', label: 'Sugestão' },
		{ value: 'reclamacao', label: 'Reclamação' }
	];

	// Campos iguais aos do formulário Elementor antigo
	const field =
		'block w-full rounded-[3px] border border-[#69727d] bg-white px-4 py-2 text-[15px] leading-[22px] text-[#1f2124] placeholder:text-[#8a8f96] outline-none focus:ring-2 focus:ring-white/60 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-300';
</script>

<Seo
	title="Contato"
	description="Fale com a WB Serviços e solicite um orçamento. WhatsApp (51) 99778-7816, e-mail adm@wbservicos.com. Canal de Denúncias anônimo. Rua Ramiro Barcelos, 630, Porto Alegre / RS."
/>

<section
	class="bg-cover bg-top-left px-[20px] py-[40px] md:px-0 md:py-[80px]"
	style="background-image: url('/img/contato-fundo.webp')"
>
	<div class="boxed grid gap-0 md:grid-cols-[273fr_423fr_444fr]">
		<div class="p-[10px] text-center text-white md:text-left">
			<h1 class="text-[24px] leading-[24px] font-semibold">
				Entre em contato e solicite um orçamento com os nossos consultores.
			</h1>
			<a
				href={CONTACT.whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="btn mt-[20px] bg-whatsapp">WHATSAPP</a
			>
			<p class="mt-[20px] text-[20px] leading-[30px] font-bold">
				{CONTACT.whatsappDisplay}<br />
				<a href="mailto:{CONTACT.email}" class="text-white">{CONTACT.email}</a>
			</p>
		</div>

		<div class="p-[10px]">
			{#if contactForm?.success}
				<div class="rounded-[3px] bg-white/95 px-6 py-10 text-center" role="status">
					<p class="text-[20px] font-bold text-heading">Mensagem enviada!</p>
					<p class="mt-2 text-body">
						Obrigado pelo contato. Nossa equipe vai responder em breve pelo e-mail ou telefone
						informado.
					</p>
					<a href="/contato" class="btn-dark mt-6">Enviar outra mensagem</a>
				</div>
			{:else}
				<form
					method="POST"
					action="?/contato"
					class="flex flex-col gap-[10px]"
					use:enhance={() => {
						sending = true;
						return async ({ update }) => {
							await update({ reset: false });
							sending = false;
						};
					}}
				>
					<!-- Honeypot: escondido de pessoas, visível para robôs -->
					<div class="absolute -left-[9999px]" aria-hidden="true">
						<label>Site <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
					</div>

					<label class="sr-only" for="name">Nome</label>
					<input id="name" name="name" placeholder="Nome" required autocomplete="name"
						value={contactForm?.values?.name ?? ''} aria-invalid={!!contactForm?.errors?.name} class={field} />

					<label class="sr-only" for="email">Email</label>
					<input id="email" name="email" type="email" placeholder="Email" required autocomplete="email"
						value={contactForm?.values?.email ?? ''} aria-invalid={!!contactForm?.errors?.email} class={field} />

					<label class="sr-only" for="phone">Telefone</label>
					<input id="phone" name="phone" type="tel" placeholder="Telefone" autocomplete="tel"
						value={contactForm?.values?.phone ?? ''} class={field} />

					<label class="sr-only" for="subject">Assunto</label>
					<select id="subject" name="subject" required aria-invalid={!!contactForm?.errors?.subject}
						class="{field} text-[#555]">
						<option value="" selected={!contactForm?.values?.subject}>Selecione um assunto</option>
						{#each subjects as s (s.value)}
							<option value={s.value} selected={contactForm?.values?.subject === s.value}>{s.label}</option>
						{/each}
					</select>

					<label class="sr-only" for="message">Mensagem</label>
					<textarea id="message" name="message" rows="4" style="height: 95px" placeholder="Digite sua mensagem" required
						aria-invalid={!!contactForm?.errors?.message} class={field}>{contactForm?.values?.message ?? ''}</textarea>

					{#if contactForm?.errors || contactForm?.message}
						<div class="rounded-[3px] bg-white px-3 py-2 text-sm text-red-700" role="alert">
							{#if contactForm?.message}<p>{contactForm.message}</p>{/if}
							{#each Object.values(contactForm?.errors ?? {}) as err}<p>{err}</p>{/each}
						</div>
					{/if}

					<button
						type="submit"
						disabled={sending}
						class="flex h-[40px] w-full items-center justify-center gap-2 rounded-[20px] bg-dark text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
					>
						{#if sending}<LoaderCircle class="h-4 w-4 animate-spin" />{/if}
						Enviar
					</button>
				</form>
			{/if}
		</div>

		<div class="p-[10px]">
			<img
				src="/img/fachada.webp"
				alt="Fachada do prédio do escritório da WB Serviços em Porto Alegre"
				width="700"
				height="465"
				class="h-auto w-full"
			/>
			<div class="mt-[20px] py-[15px]"><span class="block h-px w-full bg-white"></span></div>
			<p class="mt-[20px] text-center text-base leading-6 text-white md:text-left">
				{CONTACT.address}<br />{CONTACT.district}<br />{CONTACT.zip}
			</p>
		</div>
	</div>
</section>

<section id="denuncia" class="scroll-mt-[90px] bg-dark px-[20px] py-[40px] text-white md:px-0 md:py-[80px]">
	<div class="boxed grid gap-0 md:grid-cols-[5fr_7fr]">
		<div class="p-[10px]">
			<h2 class="text-[28px] leading-[1] font-bold md:text-[24px]">CANAL DE DENÚNCIAS</h2>
			<Faixa />
			<div class="space-y-[14px] text-base leading-6">
				<p>
					Viu algo que parece suspeito, inadequado ou contrário ao nosso Código de Ética e Conduta?
					Relate aqui. Colaboradores, clientes, fornecedores e o público em geral podem usar este
					canal.
				</p>
				<p>
					<b>Você não precisa se identificar.</b> Na denúncia anônima não pedimos nem registramos
					nome, e-mail ou telefone. O relato é tratado com sigilo pelo Comitê de Ética, e a WB
					Serviços não admite retaliação contra quem denuncia de boa-fé.
				</p>
				<p>
					Ao enviar, você recebe um número de protocolo. Guarde-o para acompanhar ou complementar a
					denúncia pelos telefones abaixo.
				</p>
			</div>
			<p class="mt-[20px] text-base leading-6">
				Também é possível denunciar pelos telefones
				<a href="tel:+555135194565" class="font-bold text-brand">(51) 3519-4565</a> ou
				<a href="tel:+5551996046033" class="font-bold text-brand">(51) 9960-46033</a>, ou pelo
				e-mail
				<a href="mailto:{CONTACT.ethicsEmail}" class="font-bold break-all text-brand">{CONTACT.ethicsEmail}</a>.
			</p>
			<div class="mt-[20px] flex flex-wrap gap-[10px]">
				<a href="/compliance/fluxograma-denuncia.pdf" target="_blank" rel="noopener" class="btn-orange">
					Fluxograma Denúncia
				</a>
				<a href="/compliance" class="btn-orange">Programa de Compliance</a>
			</div>
		</div>

		<div class="p-[10px]">
			{#if reportForm?.success}
				<div class="rounded-[3px] bg-white/95 px-6 py-10 text-center" role="status">
					<p class="text-[20px] font-bold text-heading">Denúncia registrada</p>
					<p class="mt-2 text-body">Anote o número do seu protocolo:</p>
					<p class="mt-3 font-mono text-[26px] font-bold tracking-wider text-heading select-all">
						{reportForm.protocol}
					</p>
					<p class="mt-3 text-body">
						Ele é a única forma de se referir a esta denúncia, principalmente se ela for anônima.
					</p>
					<a href="/contato#denuncia" class="btn-dark mt-6" data-sveltekit-reload>Fazer outra denúncia</a>
				</div>
			{:else}
				<form
					method="POST"
					action="?/denuncia"
					class="flex flex-col gap-[10px]"
					use:enhance={() => {
						sendingReport = true;
						return async ({ update }) => {
							await update({ reset: false, invalidateAll: false });
							sendingReport = false;
						};
					}}
				>
					<div class="absolute -left-[9999px]" aria-hidden="true">
						<label>Site <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
					</div>

					<label class="text-sm font-semibold" for="den-category">Tipo de denúncia *</label>
					<select id="den-category" name="category" required aria-invalid={!!reportForm?.errors?.category}
						class="{field} text-[#555]">
						<option value="" selected={!reportForm?.reportValues?.category}>Selecione</option>
						{#each categories as c (c.value)}
							<option value={c.value} selected={reportForm?.reportValues?.category === c.value}>{c.label}</option>
						{/each}
					</select>

					<label class="text-sm font-semibold" for="den-relationship">Sua relação com a WB</label>
					<select id="den-relationship" name="relationship" class="{field} text-[#555]">
						<option value="" selected={!reportForm?.reportValues?.relationship}>Prefiro não informar</option>
						{#each relationships as r (r.value)}
							<option value={r.value} selected={reportForm?.reportValues?.relationship === r.value}>{r.label}</option>
						{/each}
					</select>

					<label class="text-sm font-semibold" for="den-location">Onde aconteceu</label>
					<input id="den-location" name="location" maxlength="255"
						placeholder="Local, posto de trabalho, órgão ou setor (opcional)"
						value={reportForm?.reportValues?.location ?? ''} class={field} />

					<label class="text-sm font-semibold" for="den-message">Relato *</label>
					<textarea id="den-message" name="message" rows="7" required minlength="20" maxlength="5000"
						placeholder="Conte o que aconteceu, quando, quem estava envolvido e se há testemunhas ou provas."
						aria-invalid={!!reportForm?.errors?.message} class={field}>{reportForm?.reportValues?.message ?? ''}</textarea>

					<label class="mt-[6px] flex cursor-pointer items-start gap-[10px] text-[15px] leading-[22px]">
						<input type="checkbox" name="identify" bind:checked={identify}
							class="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[#ff9900]" />
						<span>
							Quero me identificar
							<span class="block text-sm text-white/70">
								Sem marcar, a denúncia é enviada de forma anônima.
							</span>
						</span>
					</label>

					{#if identify}
						<label class="sr-only" for="den-name">Nome</label>
						<input id="den-name" name="name" placeholder="Nome *" required autocomplete="name" maxlength="160"
							value={reportForm?.reportValues?.name ?? ''} aria-invalid={!!reportForm?.errors?.name} class={field} />

						<label class="sr-only" for="den-email">E-mail</label>
						<input id="den-email" name="email" type="email" placeholder="E-mail" autocomplete="email" maxlength="160"
							value={reportForm?.reportValues?.email ?? ''} aria-invalid={!!reportForm?.errors?.email} class={field} />

						<label class="sr-only" for="den-phone">Telefone</label>
						<input id="den-phone" name="phone" type="tel" placeholder="Telefone" autocomplete="tel" maxlength="40"
							value={reportForm?.reportValues?.phone ?? ''} class={field} />
					{/if}

					{#if reportForm?.errors || reportForm?.message}
						<div class="rounded-[3px] bg-white px-3 py-2 text-sm text-red-700" role="alert">
							{#if reportForm?.message}<p>{reportForm.message}</p>{/if}
							{#each Object.values(reportForm?.errors ?? {}) as err}<p>{err}</p>{/each}
						</div>
					{/if}

					<button
						type="submit"
						disabled={sendingReport}
						class="mt-[6px] flex h-[40px] w-full items-center justify-center gap-2 rounded-[20px] bg-brand text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
					>
						{#if sendingReport}<LoaderCircle class="h-4 w-4 animate-spin" />{/if}
						Enviar denúncia
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
