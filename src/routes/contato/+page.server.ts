import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import type { Actions } from './$types';

// Única página dinâmica do site: a form action precisa de servidor.
export const prerender = false;

// Espelha ContactLeadSubjects em wb_backend/models/contact_leads.go.
const SUBJECTS = ['duvida', 'orcamento', 'sugestao', 'reclamacao'] as const;

const schema = z.object({
	name: z.string().trim().min(2, 'Informe seu nome').max(160),
	email: z.string().trim().email('Informe um e-mail válido').max(160),
	phone: z.string().trim().max(40).optional().default(''),
	subject: z.enum(SUBJECTS, { message: 'Selecione um assunto' }),
	message: z.string().trim().min(5, 'Escreva sua mensagem').max(5000)
});

export type ContactValues = Partial<Record<keyof z.infer<typeof schema>, string>>;

export const actions = {
	default: async ({ request, fetch, getClientAddress }) => {
		const form = await request.formData();
		const values: ContactValues = {
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			phone: String(form.get('phone') ?? ''),
			subject: String(form.get('subject') ?? ''),
			message: String(form.get('message') ?? '')
		};

		// Honeypot: campo escondido que só robô preenche. Finge sucesso e descarta.
		if (String(form.get('website') ?? '').trim() !== '') {
			return { success: true };
		}

		const parsed = schema.safeParse(values);
		if (!parsed.success) {
			const errors: Record<string, string> = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0]);
				errors[key] ??= issue.message;
			}
			return fail(400, { values, errors });
		}

		const baseUrl = env.BACK_END_API_URL;
		if (!baseUrl) {
			console.error('[CONTATO] BACK_END_API_URL não configurada');
			return fail(500, { values, message: 'Não foi possível enviar agora. Tente pelo WhatsApp.' });
		}

		try {
			const response = await fetch(`${baseUrl}/contato`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// O backend limita envios por visitante; sem isso veria só o IP da Vercel.
					'X-Client-IP': getClientAddress()
				},
				body: JSON.stringify(parsed.data)
			});

			if (response.status === 429) {
				return fail(429, {
					values,
					message: 'Muitas mensagens em pouco tempo. Tente novamente em alguns minutos.'
				});
			}
			const data = (await response.json().catch(() => null)) as {
				status?: boolean;
				message?: string;
			} | null;
			if (!response.ok || !data?.status) {
				return fail(response.status >= 400 ? response.status : 500, {
					values,
					message: data?.message || 'Não foi possível enviar sua mensagem.'
				});
			}
		} catch (err) {
			console.error('[CONTATO] Erro ao enviar para o backend:', err);
			return fail(502, { values, message: 'Não foi possível enviar agora. Tente pelo WhatsApp.' });
		}

		return { success: true };
	}
} satisfies Actions;
