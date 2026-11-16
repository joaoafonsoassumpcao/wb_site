import { redirect, type Handle } from '@sveltejs/kit';
import { INTRA_URL } from '$lib/site';

// URLs do antigo WordPress que ainda circulam (Google, links salvos, QR codes).
// Redireciona com 301 para o destino atual em vez de cair num 404.
const LEGACY_REDIRECTS: Record<string, string> = {
	'/trabalhe-conosco': `${INTRA_URL}/trabalhe-conosco`,
	'/cadastro-de-colaboradores': `${INTRA_URL}/trabalhe-conosco`,
	'/vagas-emprego': `${INTRA_URL}/vagas`,
	'/vagas': `${INTRA_URL}/vagas`,
	'/login': INTRA_URL,
	'/register': INTRA_URL,
	'/registration': INTRA_URL,
	'/my-account': INTRA_URL,
	'/edit-profile': INTRA_URL,
	'/password-reset': INTRA_URL,
	'/wp-login.php': INTRA_URL,
	'/wp-admin': INTRA_URL,
	'/ola-mundo': '/',
	// Portal de denúncias do WordPress antigo: hoje é uma seção da página de contato.
	'/denuncia': '/contato#denuncia',
	'/denuncias': '/contato#denuncia',
	'/canal-de-denuncia': '/contato#denuncia',
	'/canal-de-denuncias': '/contato#denuncia',
	'/portal-de-denuncias': '/contato#denuncia',
	'/canal-de-etica': '/contato#denuncia'
};

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname.replace(/\/+$/, '') || '/';
	const target = LEGACY_REDIRECTS[path] ?? (path.startsWith('/wp-admin/') ? INTRA_URL : undefined);
	if (target) redirect(301, target);

	return resolve(event);
};
