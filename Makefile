# Thin wrappers over npm scripts. `make check` is what CI runs (offline-safe).
.PHONY: install check lint typecheck test build indexes docker clean

install:
	npm ci

check: lint test build

# No linter is configured yet; the TypeScript compiler is the lint gate.
lint: typecheck

typecheck:
	npm run typecheck

test:
	npm test

build:
	npm run build

# Regenerate config/*/index.json (CI does this on main; run it locally before a content PR).
indexes:
	npm run indexes

docker:
	docker build -t config-updater:dev .

clean:
	rm -rf dist
