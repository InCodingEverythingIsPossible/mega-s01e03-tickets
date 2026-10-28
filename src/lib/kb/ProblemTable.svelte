<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // One row per problem in a merged ticket, counted the way CauseTable counts: causes.ts places a
  // report by tenant and channel, and the desk's one-day-move reads (desk-notes.json) stay counted
  // where they're filed. They are a different bug, so they also get a row and a ticket of their own.
  let { ticket, issues = {} }: { ticket: number; issues?: Record<string, string> } = $props();

  const LABEL: Record<string, string> = {
    parser: 'shared parser reads day-first dates month first',
    hint: 'booking-v3 form hints MM/DD/YYYY to day-first tenants',
    'one-day': 'date moves by one day',
    unplaced: 'no tenant on file',
  };

  const rows = $derived(uniqueById(reports as Report[]).length);
  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const oneDay = $derived(merged.filter((r) => notes.oneDayMove.includes(r.id)));
  const problems = $derived(
    [
      ...groupByCause(merged, tenantOf),
      ...groupByCause(oneDay, () => undefined).map((g) => ({ ...g, cause: 'one-day' as const })),
    ].sort((a, b) => b.reports.length - a.reports.length),
  );
  const tags = (g: { taggedAs: Record<string, number> }) =>
    Object.entries(g.taggedAs)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{(reports as Report[]).length}</strong> rows in the export · <strong>{merged.length}</strong> unique reports
  merged into #{ticket} · <strong>{problems.length}</strong> problems
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>intake tagged as</th><th>tenants</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each problems as p (p.cause)}
      <tr>
        <td><code>{p.cause}</code><br /><span class="what">{LABEL[p.cause]}</span></td>
        <td><strong>{p.reports.length}</strong></td>
        <td class="tags">{tags(p)}</td>
        <td>{p.tenants}</td>
        <td>{p.firstSeen} → {p.lastSeen}</td>
        <td>{#if issues[p.cause]}<a href={issues[p.cause]}>#{issues[p.cause].split('/').pop()}</a>{:else}none yet{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p class="note">{rows} ids, {merged.length} of them merged into #{ticket}; the export's overlapping pages repeat {(reports as Report[]).length - rows} rows.</p>

<style>
  .sum { font-size: 1.1rem; }
  .what { color: var(--muted); font-size: 0.85em; }
  .tags { color: var(--muted); font-size: 0.85em; }
  .note { color: var(--muted); font-size: 0.85em; }
</style>
