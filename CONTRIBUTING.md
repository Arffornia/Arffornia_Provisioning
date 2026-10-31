# Contributing

## Setup
Node 22 and npm.

```bash
npm ci
make check   # typecheck + tests + build
```

## Two kinds of changes — never mix them
`main` is **production**: every launcher picks it up on its next start, and every server on its next
pod start (servers restart daily).

- **Content** (`config/**`: mod lists, `storage/` files). The PR title starts with `content(<kind>):`,
  and the PR template box "Yes — content change" is ticked. Regenerate indexes with `make indexes`.
- **Tooling** (`src/`, `tests/`, `generateIndexes.ts`, `Dockerfile`, CI, docs). No `config/**` changes.

## Conventions
- English everywhere. Secrets only as `${CFG_*}` placeholders.
- Branches: `fix/<slug>`, `feat/<slug>`, `content/<slug>`, `test/<slug>`, `ci/<slug>`, `docs/<slug>`, `chore/<slug>`.
- [Conventional Commits](https://www.conventionalcommits.org/). One PR per issue, `Closes #n`.

See [AGENTS.md](AGENTS.md) for the repo map and gotchas.
