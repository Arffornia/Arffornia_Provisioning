# AGENTS.md — Arffornia_Provisioning

## Purpose
Two things in one repo:
1. **Config repository** `config/{server,proxy,launcher}/` — the Arffornia modpack. Servers and the
   launcher read it straight from `main` on GitHub. **`main` is live production for every player
   and server** (launcher: next start; servers: next pod start, daily).
2. **config-updater image** (`src/configUpdater.ts`) — init container that calls Nexus_Mods to sync one
   kind into `/data`.

## Repo map
- `config/<kind>/modList.json` — `mods.curseforge[] {displayName, projectId, fileId}`,
  `mods.modrinth[] {displayName, versionId}`, `mods["github-releases"][] {displayName, owner, repoName, tag, assetName}`.
- `config/<kind>/storage/` — raw files copied as-is into the target (KubeJS, configs, a few jars).
- `config/<kind>/index.json` — generated `{generatedAt, files[{path, hash (sha1), override}]}`; do not hand-edit.
- `config/launcher/featuredShaders.json`, `config/server/dailyrewards.json` — read by other components.
- `src/configUpdater.ts` — entrypoint of the image (env: `KIND`, `BASE_URL`, `INSTALL_BASE_PATH`, `MODS_DIR_NAME`).
- `generateIndexes.ts` — regenerates the three `index.json` (`make indexes`).
- `tests/` — Jest tests.
- `Dockerfile`, `.github/workflows/build_app.yml` — image build (tags `updater-*`).
- `.github/workflows/generateExtIndex.yml` — bot commit "🔃 Update indexes" on every push to `main`.

## Commands
```bash
npm ci
make check      # typecheck + tests + build (CI)
make test
make indexes    # after any storage/ change
make docker
```

## Conventions
- **Never mix content (`config/**`) and tooling changes in one PR.** Content PR titles start with
  `content(<kind>):` and say explicitly that they change what players/servers get.
- Conventional Commits, one PR per issue, `Closes #n`.
- Secrets only as `${CFG_*}` placeholders (filled by the itzg image from Vault-backed Secrets).
  `${NM_*}` placeholders in **paths** are resolved by Nexus_Mods.

## Hard rules
- English for code, docs, commits, issues.
- Player-visible text is bilingual (en/fr): text fields of `config/<target>/*.json` are `{ "en": ..., "fr": ... }`
  objects; KubeJS scripts use `Text.translatable(key)` with keys in `kubejs/assets/<ns>/lang/{en_us,fr_fr}.json`
  (no `§` codes); keep the launcher and server KubeJS copies identical. Enforced by `tests/i18n-data.test.ts`.
- Nexus_Mods is the owner's library: improve it (in its repo), never replace it.
- Never commit secret values, never push to `main`, never merge, tag or release.
- Infra (TheGostsniperfr/infra) is a separate repo: do not change it from here.

## Testing strategy
- Config consistency tests (schema, duplicates, index freshness) on every PR.
- Unit tests for `configUpdater` logic. A smoke run against a local HTTP fixture is a good next step.
- Pack boot test (config-updater + itzg server in Docker) is future work (audit §6).

## Gotchas (from the 2026-10 audit)
- Nexus_Mods ≤ 1.0.12 swallows per-mod failures and then deletes the affected jars; the updater exits 0.
- Default `BASE_URL` used the old repo name `Arffornia_Network` (works only via GitHub redirect).
- `build_app.yml` had `branches: [$default-branch]` (template placeholder): image built on tags only.
- `config/launcher/storage/{kubejs,defaultconfigs,mods}` duplicates the server tree byte for byte.
- CC: Tweaked is both in modList (Modrinth) and committed as a jar — needs a decision (#19).
- `override` in `index.json` is not read by Nexus_Mods; every file is overwritten on every boot, so
  server-side edits to synced configs do not survive a restart.
- The Arffornia mod and proxy plugin are pinned to GitHub `tag: latest`.

## Related repos
- Arffornia/Nexus_Mods — sync library (`@arffornia/nexus_mods`).
- Arffornia/Arffornia_Launcher_V.5.2 — reads `config/launcher/`.
- Arffornia/Arffornia_Mods, Arffornia/Arffornia_Proxy — release the jars referenced here.
- TheGostsniperfr/infra — Kubernetes manifests running the init container.
