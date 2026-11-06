---
name: generate-theme-manager
description: Build pending pledge themes with a pool of 3 visible Herdr workers, refilling as each finishes.
---

# Generate Theme Manager

When Kris asks to build pledge themes (one, a batch, or all pending), run
a pool of 3 Herdr tabs, each with one fresh worker agent on one
pre-assigned theme. When a worker settles, verify it and launch the next
queued theme. Fresh context per theme is the point — a worker builds
exactly one theme and stops.

Partial pushes are fine. The one ordering rule: each worker updates
`public/pledges/themes.json` LAST, after everything else for its theme is
done and pushed. No rebases anywhere — workers pull-merge and push; a push
may include another worker's synced changes.

## References

- Pending ideas in `docs/planning/ideas/*.md` (excluding `done/`), oldest
  filesystem mtime first.
- The `generate-theme-template` skill (the worker contract, plus the pool
  overrides in the worker prompt below).
- `scripts/register-theme.mjs` — idempotent registry append used for the
  last-update step.

## Steps

1. Verify Herdr: `test "${HERDR_ENV:-}" = 1`. If it fails, stop and say
   this skill needs a Herdr session. Run from the workspace root so new
   tabs inherit the repo cwd.
2. Settle a fixed, ordered queue of slugs: named slugs, a count ("three
   themes"), or all pending oldest-first. Read each idea's Spec notes
   Registry line for its display name and category. If Kris didn't name
   a size and more than 3 are pending, state the count and ask how many
   before launching.
3. Fill up to 3 busy slots using the launch procedure (no `--wait` on
   the prompts). Then poll: every ~60s run `herdr agent get` on each
   busy worker. When one settles (`idle`/`done`), verify it (step 4)
   and immediately launch the next queued slug in a new tab. A worker
   sitting `idle` with no STATUS line and no recent progress gets one
   reprompt; if still stalled, treat it as FAILED.
4. Verify a settled worker: read its closing STATUS line via `herdr
   agent read theme-<slug> --source recent-unwrapped`, then `git fetch
   -q origin` (retry once on a ref lock) and confirm the slug is in
   `git show origin/main:public/pledges/themes.json`. STATUS: FAILED,
   a missing STATUS line, or a missing registry entry stops new
   launches — let running workers finish, then report.
5. On `blocked`, inspect with `agent get`/`agent read` and ask Kris
   before answering anything. The slot stays held; other workers
   continue.
6. When the queue is empty and all workers settled: `git pull` on the
   quiet tree, run the full `npm test` (must be green), and report
   every theme landed (slug + commit) or the failure that stopped the
   queue. Leave tabs open for inspection; close them only if Kris asks.

## Launch procedure

Tab label and agent name: `theme-<slug>`.

1. `herdr tab create --cwd "$PWD" --label theme-<slug> --no-focus`
   Read the root pane id from `.result.pane.pane_id`.
2. `herdr agent start theme-<slug> --kind muse --pane <pane-id>`
   Wait until it is idle before prompting.
3. `herdr agent prompt theme-<slug> "<worker prompt>"` with no `--wait`
   (the poll loop tracks it). Fill slug, display name, and category
   from the idea's Registry line.

## Worker prompt

Build exactly one pledge theme with the generate-theme-template skill:
slug "<slug>". Follow that skill end to end with these pool overrides.
(1) Work ONLY this slug — claim its idea file (pending or done/) and
never pick another. (2) Work on main; commit and push freely, partial
pushes fine — add only your own theme's paths, never `git add -A`. If a
push is rejected, `git pull --no-rebase` and push again (retry a few
times); your push may include other workers' synced changes. (3) Update
themes.json LAST: only after art, template, CSS, test, and screenshots
are all done and pushed and your focused test
(`node --test tests/<slug>.test.mjs`) is green. Then loop up to 5
times: pull; run
`node scripts/register-theme.mjs <slug> "<display>" "<cat>"`; add and
commit just `public/pledges/themes.json`; push — on rejection pull
again (resolve any themes.json conflict with
`git checkout --theirs -- public/pledges/themes.json`, then re-run the
script) and retry. Run the full `npm test` before registering and
proceed unless failures are confined to other not-yet-registered
themes' test files. (4) Then stop — do not start another idea. End
your final message with exactly one line: STATUS: DONE slug=<slug>
commit=<hash> — or STATUS: FAILED slug=<slug> reason=<what>.

## Why there is no race

- Slugs are pre-assigned from a fixed queue, so two workers never claim
  the same idea.
- Pushes merge instead of rebasing, and all content is additive, so a
  rejected push always converges on retry.
- The registry append is idempotent and always last, so a retried
  registration can neither duplicate nor strand an entry.
