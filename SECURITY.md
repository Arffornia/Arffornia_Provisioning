# Security policy

## Supported versions
Only `main` (live configuration) and the latest `config-updater` image are supported.

## Reporting a vulnerability
Please report privately via GitHub: **Security → Report a vulnerability** on
[Arffornia/Arffornia_Provisioning](https://github.com/Arffornia/Arffornia_Provisioning/security/advisories/new).
Do not open a public issue for an unfixed vulnerability.

Never commit secret values: config files use `${CFG_*}` placeholders that are filled at runtime
from Kubernetes Secrets (Vault).
