import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })],
  kit: { paths: { base: process.env.BASE_PATH ?? '' }, adapter: adapter({ strict: false }), alias: { '#lib': 'src/lib' }, prerender: { handleHttpError: 'warn', entries: ['*', '/kb/incidents/4471-problems'] } },
};
