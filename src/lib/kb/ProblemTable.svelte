<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, readAs, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // One row per problem in a merged ticket, counted the way CauseTable counts, with the ticket each
  // problem now has. Reports the desk read differently (desk-notes.json) stay counted where they're
  // filed, footnoted under it.
  let { ticket, issues = {} }: { ticket: number; issues?: Record<string, string> } = $props();

  const LABEL: Record<string, string> = {
    parser: 'shared parser reads day-first dates month first',
    hint: 'booking-v3 form hints MM/DD/YYYY to day-first tenants',
    unplaced: 'no tenant on file',
  };

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const problems = $derived(groupByCause(merged, tenantOf));
  const tags = (g: { taggedAs: Record<string, number> }) =>
    Object.entries(g.taggedAs)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket} · <strong>{problems.length}</strong>
  {problems.length === 1 ? 'problem' : 'problems'}
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

{#each problems as p (p.cause)}
  {@const moved = readAs(p, notes.oneDayMove)}
  {#if moved}
    <p class="note">{moved} reports read as a one-day move; filed under <code>{p.cause}</code> by tenant.</p>
  {/if}
{/each}

<style>
  .sum { font-size: 1.1rem; }
  .what { color: var(--muted); font-size: 0.85em; }
  .tags { color: var(--muted); font-size: 0.85em; }
  .note { color: var(--muted); font-size: 0.85em; }
</style>
