# Arffornia Network

This repository contains the base configuration for Arffornia's servers and proxie.
It also contains the tool for updating server and proxy configuration at startup (initContainer).

It is used by the Kubernetes cluster, replacing variables formatted as `${CFG_[^}]+}` by environment variables defined in the ConfigMap/EnvVar of each server instance.

## Usage : 

TODO

## Tests

Tests are managed by **Jest** 

You can run the tests using :

```bash
npm test
```

## License

This project is licensed under the MIT licence. You can consult the complete text of the licence in the file [LICENSE](LICENSE).
