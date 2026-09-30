// O site é institucional: tudo vira HTML estático no build. A única exceção é
// /contato, que tem form action (ver contato/+page.server.ts).
export const prerender = true;
export const trailingSlash = 'never';
