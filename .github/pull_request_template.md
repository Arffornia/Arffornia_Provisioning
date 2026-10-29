## What

## Why
Closes #

## Does this change what players or servers get?
<!-- `main` is live: launchers pick it up on next start, servers on next pod start (daily). -->
- [ ] **No** — tooling only (src/, tests, CI, Dockerfile, docs)
- [ ] **Yes** — `config/**` content change (list the affected kinds: server / proxy / launcher)

Content and tooling changes must not be mixed in one PR.

## How it was tested
<!-- Paste commands and results, e.g. `make check`. -->

## Risk & revert

## Checklist
- [ ] `make check` passes locally
- [ ] No secret values committed (use `${CFG_*}` placeholders)
- [ ] `index.json` regenerated if `storage/` changed (`make indexes`)
