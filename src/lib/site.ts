export const SITE_URL = 'https://wbservicos.com';
export const INTRA_URL = 'https://intra.wbservicos.com';

export const CONTACT = {
	whatsappDisplay: '(51) 99778-7816',
	whatsappUrl: 'https://wa.me/5551997787816',
	email: 'adm@wbservicos.com',
	ethicsEmail: 'disquedenuncia@wbservicos.com',
	address: 'Rua Ramiro Barcelos, 630, Sl. 715',
	district: 'Moinhos de Vento – Porto Alegre / RS',
	zip: 'CEP.: 90035-001',
	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=Rua+Ramiro+Barcelos+630+Porto+Alegre+RS'
};

export type NavItem = { label: string; href: string; external?: boolean; strong?: boolean };

export const NAV: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Quem Somos', href: '/quem-somos' },
	{ label: 'Licitações', href: '/licitacoes' },
	{ label: 'Áreas de Atuação', href: '/areas-de-atuacao' },
	{ label: 'Compliance', href: '/compliance' },
	{ label: 'Contato', href: '/contato' },
	{ label: 'Trabalhe Conosco', href: `${INTRA_URL}/trabalhe-conosco`, external: true },
	{ label: 'Vagas', href: `${INTRA_URL}/vagas`, external: true }
];

/** Páginas públicas prerenderizadas — alimenta o sitemap.xml. */
export const PAGES = ['/', '/quem-somos', '/licitacoes', '/areas-de-atuacao', '/compliance', '/contato'];
