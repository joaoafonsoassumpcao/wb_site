<script lang="ts">
	import { enhance } from '$app/forms';
	import { LoaderCircle } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { CONTACT } from '$lib/site';
	import type { ContactValues } from './+page.server';

	type FormState = {
		success?: boolean;
		values?: ContactValues;
		errors?: Record<string, string>;
		message?: string;
	} | null;

	let { form }: { form: FormState } = $props();

	let sending = $state(false);

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
	description="Fale com a WB Serviços e solicite um orçamento. WhatsApp (51) 99778-7816, e-mail adm@wbservicos.com. Rua Ramiro Barcelos, 630, Porto Alegre / RS."
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
			{#if form?.success}
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
						value={form?.values?.name ?? ''} aria-invalid={!!form?.errors?.name} class={field} />

					<label class="sr-only" for="email">Email</label>
					<input id="email" name="email" type="email" placeholder="Email" required autocomplete="email"
						value={form?.values?.email ?? ''} aria-invalid={!!form?.errors?.email} class={field} />

					<label class="sr-only" for="phone">Telefone</label>
					<input id="phone" name="phone" type="tel" placeholder="Telefone" autocomplete="tel"
						value={form?.values?.phone ?? ''} class={field} />

					<label class="sr-only" for="subject">Assunto</label>
					<select id="subject" name="subject" required aria-invalid={!!form?.errors?.subject}
						class="{field} text-[#555]">
						<option value="" selected={!form?.values?.subject}>Selecione um assunto</option>
						{#each subjects as s (s.value)}
							<option value={s.value} selected={form?.values?.subject === s.value}>{s.label}</option>
						{/each}
					</select>

					<label class="sr-only" for="message">Mensagem</label>
					<textarea id="message" name="message" rows="4" style="height: 95px" placeholder="Digite sua mensagem" required
						aria-invalid={!!form?.errors?.message} class={field}>{form?.values?.message ?? ''}</textarea>

					{#if form?.errors || form?.message}
						<div class="rounded-[3px] bg-white px-3 py-2 text-sm text-red-700" role="alert">
							{#if form?.message}<p>{form.message}</p>{/if}
							{#each Object.values(form?.errors ?? {}) as err}<p>{err}</p>{/each}
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
