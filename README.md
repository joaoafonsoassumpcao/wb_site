# wb_site: site institucional wbservicos.com

Substitui o antigo WordPress/Elementor. SvelteKit + Tailwind 4, deploy na Vercel (`adapter-vercel`).

- Todas as páginas são **prerenderizadas** (HTML estático). A única rota com servidor é
  `/contato`: a form action repassa a mensagem para o `wb_backend` (`POST /v2/contato`),
  que grava o lead e avisa por e-mail. Os leads aparecem no intra em **Contatos do site** (`/contatos`).
- URLs antigas do WordPress (`/trabalhe-conosco`, `/vagas-emprego`, `/login`, `/wp-admin`…)
  recebem 301 em `src/hooks.server.ts`.
- Textos, contatos e menu: `src/lib/site.ts` e as páginas em `src/routes/`.
- PDFs de compliance: `static/compliance/`.

## Desenvolvimento

```bash
npm install
BACK_END_API_URL=http://localhost:8080/v2 npm run dev
```

`npm run build` no Windows falha no final (symlink do adapter-vercel exige o Modo de
Desenvolvedor do Windows). A compilação e o prerender terminam antes disso, e na Vercel (Linux) funciona.

## Variáveis de ambiente (Vercel)

| Nome | Exemplo |
|---|---|
| `BACK_END_API_URL` | `https://server.wbservicos.com/v2` |

No backend: `CONTACT_NOTIFY_EMAIL` (default `adm@wbservicos.com`) recebe o aviso de cada contato.

## Virada de DNS (Locaweb)

1. Na Vercel, adicionar os domínios `wbservicos.com` e `www.wbservicos.com` ao projeto (www → redirect para o apex).
2. Na Locaweb, um dia antes, baixar o TTL de `@` e `www` para 300.
3. Trocar `A @` de `82.112.247.106` para `76.76.21.21` e `www` para `CNAME cname.vercel-dns.com`.
4. **Não mexer** em MX, SPF, TXT `brevo-code`, `intra` e `server`: o e-mail continua na Locaweb.
5. Manter a hospedagem antiga até o vencimento, para poder voltar atrás.
