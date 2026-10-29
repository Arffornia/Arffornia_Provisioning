# Arffornia Provisioning

The Arffornia modpack configuration and the tool that applies it.

- **`config/{server,proxy,launcher}/`** — what every server, the Velocity proxy and the player launcher
  install: a `modList.json` (CurseForge / Modrinth / GitHub Releases entries), raw files in `storage/`
  (KubeJS scripts, mod configs, BlueMap, LuckPerms, Velocity...) and a generated `index.json` listing them.
- **`config-updater`** (`ghcr.io/arffornia/config-updater`) — a small init container that uses
  [Nexus_Mods](https://github.com/Arffornia/Nexus_Mods) to sync `modList.json` and `storage/` of one
  kind into `/data` before the Minecraft server or proxy starts.

The launcher reads `config/launcher/` directly from GitHub. Architecture docs (coming soon): https://arffornia.github.io/docs/

> **`main` is production.** A commit to `config/**` reaches every player on their next launcher start
> and every server on its next pod start (servers restart daily). Review content PRs accordingly.

## Requirements
Node 22 + npm (development). Docker (image build).

## Quickstart
```bash
npm ci
make check                       # typecheck + tests + build
make docker                      # build the image locally
docker run --rm -v "$(pwd)/data:/data" -e KIND=server config-updater:dev
```

## Commands
| Command | What it does |
|---|---|
| `make check` | typecheck, tests, build (same as CI) |
| `make test` | Jest tests |
| `make build` | compile `src/` to `dist/` |
| `make indexes` | regenerate `config/*/index.json` from `storage/` |
| `make docker` | build the config-updater image |

## Configuration (config-updater environment)
| Variable | Default | Meaning |
|---|---|---|
| `KIND` | `server` | Which `config/<kind>/` to apply (`server`, `proxy`, `launcher`) |
| `INSTALL_BASE_PATH` | `/data` | Target directory |
| `BASE_URL` | raw GitHub URL of this repo's `main` (see `src/configUpdater.ts`) | Where `config/` is fetched from; must end with `/` |
| `MODS_DIR_NAME` | `mods` | Mod directory name under the target |
| `NM_REPLACE_ENV_VARIABLES`, `NM_*` | see Nexus_Mods | Rename `${NM_*}` placeholders in file paths (e.g. `${NM_SERVER_ID}_world.conf`) |

### Secrets and placeholders
No secret is committed. Files in `storage/` contain `${CFG_*}` placeholders (for example
`${CFG_DB_PASSWORD}`). They are replaced at server start by the itzg image (`REPLACE_ENV_VARIABLES`)
from Kubernetes Secrets backed by Vault (infra repo). Launcher copies keep placeholders or empty values.

## Changing the modpack
1. Edit `config/<kind>/modList.json` or files under `config/<kind>/storage/`.
2. Run `make indexes` and `make check`.
3. Open a **content** PR (`content(<kind>): ...`). Do not mix it with tooling changes.
4. On merge, the `Generate External Files Index` workflow regenerates and commits the indexes.

## Release process (config-updater image)
- The `Build and Push Docker Image` workflow builds `ghcr.io/arffornia/config-updater` on tags
  `updater-X.Y.Z` (`:X.Y.Z` and `:latest`, signed with cosign).
- Infra references the image tag in the server and proxy init container values.

## License
MIT, see [LICENSE](LICENSE).
