import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import type { Actions } from './$types';

// Única página dinâmica do site: as form actions precisam de servidor.
export const prerender = false;

// Espelha ContactLeadSubjects em wb_backend/models/contact_leads.go.
const SUBJECTS = ['duvida', 'orcamento', 'sugestao', 'reclamacao'] as const;

// Espelham EthicsReportCategories / EthicsReportRelationships em
// wb_backend/models/ethics_reports.go.
const CATEGORIES = [
	'assedio_moral',
	'assedio_sexual',
	'discriminacao',
	'corrupcao',
	'fraude',
	'conflito_interesses',
	'seguranca_trabalho',
	'outro'
] as const;
const RELATIONSHIPS = ['colaborador', 'ex_colaborador', 'cliente', 'fornecedor', 'outro'] as const;

const contactSchema = z.object({
	name: z.string().trim().min(2, 'Informe seu nome').max(160),
	email: z.string().trim().email('Informe um e-mail válido').max(160),
	phone: z.string().trim().max(40).optional().default(''),
	subject: z.enum(SUBJECTS, { message: 'Selecione um assunto' }),
	message: z.string().trim().min(5, 'Escreva sua mensagem').max(5000)
});

const reportSchema = z
	.object({
		category: z.enum(CATEGORIES, { message: 'Selecione o tipo de denúncia' }),
		relationship: z.union([z.enum(RELATIONSHIPS), z.literal('')]).default(''),
		anonymous: z.boolean(),
		name: z.string().trim().max(160).default(''),
		email: z.string().trim().max(160).default(''),
		phone: z.string().trim().max(40).default(''),
		location: z.string().trim().max(255).default(''),
		message: z
			.string()
			.trim()
			.min(20, 'Descreva o ocorrido com pelo menos 20 caracteres')
			.max(5000, 'O relato pode ter até 5000 caracteres')
	})
	.superRefine((v, ctx) => {
		if (v.anonymous) return;
		if (v.name.length < 2) {
			ctx.addIssue({ code: 'custom', path: ['name'], message: 'Informe seu nome ou envie como anônimo' });
		}
		if (v.email && !z.string().email().safeParse(v.email).success) {
			ctx.addIssue({ code: 'custom', path: ['email'], message: 'Informe um e-mail válido' });
		}
	});

export type ContactValues = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
export type ReportValues = Partial<Record<Exclude<keyof z.infer<typeof reportSchema>, 'anonymous'>, string>> & {
	identify?: boolean;
};

type BackendReply = { status?: boolean; message?: string; data?: { protocol?: string } } | null;

function issuesToErrors(issues: { path: PropertyKey[]; message: string }[]) {
	const errors: Record<string, string> = {};
	for (const issue of issues) {
		const key = String(issue.path[0]);
		errors[key] ??= issue.message;
	}
	return errors;
}

/** Posta no wb_backend repassando o IP do visitante (o rate limit do backend usa ele). */
async function postToBackend(
	fetchFn: typeof fetch,
	path: string,
	clientIP: string,
	body: unknown
): Promise<{ ok: true; data: BackendReply } | { ok: false; status: number; message: string }> {
	const baseUrl = env.BACK_END_API_URL;
	if (!baseUrl) {
		console.error('[CONTATO] BACK_END_API_URL não configurada');
		return { ok: false, status: 500, message: 'Não foi possível enviar agora. Tente pelo telefone.' };
	}
	try {
		const response = await fetchFn(`${baseUrl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// O backend limita envios por visitante; sem isso veria só o IP da Vercel.
				'X-Client-IP': clientIP
			},
			body: JSON.stringify(body)
		});
		if (response.status === 429) {
			return {
				ok: false,
				status: 429,
				message: 'Muitos envios em pouco tempo. Tente novamente em alguns minutos.'
			};
		}
		const data = (await response.json().catch(() => null)) as BackendReply;
		if (!response.ok || !data?.status) {
			return {
				ok: false,
				status: response.status >= 400 ? response.status : 500,
				message: data?.message || 'Não foi possível enviar.'
			};
		}
		return { ok: true, data };
	} catch (err) {
		console.error(`[CONTATO] Erro ao enviar ${path} para o backend:`, err);
		return { ok: false, status: 502, message: 'Não foi possível enviar agora. Tente pelo telefone.' };
	}
}

export const actions = {
	contato: async ({ request, fetch, getClientAddress }) => {
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
			return { kind: 'contato' as const, success: true };
		}

		const parsed = contactSchema.safeParse(values);
		if (!parsed.success) {
			return fail(400, { kind: 'contato' as const, values, errors: issuesToErrors(parsed.error.issues) });
		}

		const result = await postToBackend(fetch, '/contato', getClientAddress(), parsed.data);
		if (!result.ok) {
			return fail(result.status, { kind: 'contato' as const, values, message: result.message });
		}
		return { kind: 'contato' as const, success: true };
	},

	denuncia: async ({ request, fetch, getClientAddress }) => {
		const form = await request.formData();
		const identify = form.get('identify') === 'on';
		const reportValues: ReportValues = {
			category: String(form.get('category') ?? ''),
			relationship: String(form.get('relationship') ?? ''),
			identify,
			name: String(form.get('name') ?? ''),
			email: String(form.get('email') ?? ''),
			phone: String(form.get('phone') ?? ''),
			location: String(form.get('location') ?? ''),
			message: String(form.get('message') ?? '')
		};

		if (String(form.get('website') ?? '').trim() !== '') {
			return { kind: 'denuncia' as const, success: true, protocol: 'DEN-0000-000000' };
		}

		const parsed = reportSchema.safeParse({
			...reportValues,
			anonymous: !identify,
			// Anônimo: não manda nada que identifique, mesmo que o navegador tenha preenchido.
			...(identify ? {} : { name: '', email: '', phone: '' })
		});
		if (!parsed.success) {
			return fail(400, {
				kind: 'denuncia' as const,
				reportValues,
				errors: issuesToErrors(parsed.error.issues)
			});
		}

		const result = await postToBackend(fetch, '/denuncia', getClientAddress(), parsed.data);
		if (!result.ok) {
			return fail(result.status, { kind: 'denuncia' as const, reportValues, message: result.message });
		}
		return {
			kind: 'denuncia' as const,
			success: true,
			protocol: result.data?.data?.protocol ?? ''
		};
	}
} satisfies Actions;
