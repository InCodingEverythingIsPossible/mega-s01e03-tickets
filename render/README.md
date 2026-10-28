# Rendering the kb

The export has no app shell, so this folder holds the minimal SvelteKit + mdsvex setup used to
render it. `sync.sh` copies `src/` in and adds `app.html` and a prerendering `+layout.js`;
`vite build` writes the static site. The result is in `../rendered/`.

The new page: `src/routes/kb/incidents/4471/problems/+page.svx`, rendered as
`rendered/kb/incidents/4471/problems.html`.
