<sub>support desk · kb</sub>

# #4471 · two problems, not one

owner **InCodingEverythingIsPossible** · `closed` · reviewed 2026-10-28

[#4471](../4471/+page.svx) was marked known: one issue, one fix queued. Its reports say otherwise. They were merged on subject line ([decision 0001](../../decisions/0001-dedupe-by-subject/+page.svx)), and the subject of a date report says only that a date is wrong. The desk's own table already splits them:

**412** reports merged into #4471 · **2** causes

| cause | reports | tagged as | tenants | seen | |
|---|---|---|---|---|---|
| `parser` | 379 | parser ×356 · hint ×23 | 11 | 2026-04-01 → 2026-10-04 | #4471 |
| `hint` | 33 | hint ×18 · parser ×15 | 3 | 2026-04-17 → 2026-09-22 | **not this ticket — no ticket of its own** |

<sub>5 reports read as a one-day move; filed under `parser` by tenant.</sub>

Each row now has its own ticket:

- the `parser` row: [#1](https://github.com/InCodingEverythingIsPossible/mega-s01e03-tickets/issues/1), fixed by `fix(dates): parse dd/mm for eu locales`
- the `hint` row, the one marked "no ticket of its own": [#2](https://github.com/InCodingEverythingIsPossible/mega-s01e03-tickets/issues/2), won't fix: booking-v3 form retired

> [!WARNING]
> #4471 closed on 5 October. The parser fix does not touch the hint: until booking-v3 is gone, its reports keep coming.

## The problems

**`parser`: the shared parser reads every date month first.** A day-first tenant books 2 December and the invite says 12 February. Every channel, every tenant on file.

**`hint`: booking-v3 prints `MM/DD/YYYY` under its date field.** Alder Physio, Copper Studio and Pale Harbour run booking-v3 in day-first locales. Their people type what the hint tells them, month first, and the form reads it the tenant's way. The result looks like the parser bug, but only through the form, and the parser fix leaves it in place.

## Read as a one-day move

The note under the table counts reports the desk read as a one-day move ("Client in Lisbon got Tuesday. Client in Toronto got Monday."). They are filed under `parser` by tenant and counted there. Re-read them now that the parser fix is out: if they come back, they are a time-zone bug and need a ticket of their own.

## Why intake got the split wrong

Intake tags a report from the reporter's browser: an `en-US` browser is tagged `hint`. The cause depends on the tenant's locale and form (`causes.ts`), so intake's tags and the table above disagree. Count by tenant, not by browser.

## Lessons

- A merge on subject line counts symptoms. Different bugs share a symptom, so the count was right and the "one issue" was not.
- Before a big ticket goes to known, read the rows that don't fit the pattern.

`desk ref` **DR-GX1G-TC95**

---

<sub>Pages are written by people. Tables and charts are built from data at render time. This is the page as rendered from [`+page.svx`](+page.svx); the screenshot is [`page.png`](page.png).</sub>
