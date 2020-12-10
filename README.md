# GitHub Action Bundle Verifier

[![Verify Self](https://github.com/tetchel/bundle-verifier/workflows/Verify%20Self/badge.svg)](https://github.com/tetchel/bundle-verifier/actions?query=workflow%3A%22Verify+Self%22)
[![Tag](https://img.shields.io/github/v/tag/tetchel/bundle-verifier)](https://github.com/tetchel/bundle-verifier/tags)
[![Bundle Size](https://img.shields.io/github/size/tetchel/bundle-verifier/dist/index.js)](./dist/)
[![License](https://img.shields.io/github/license/tetchel/bundle-verifier)](./LICENSE)

GitHub Action repositories are unusual in that their production bundle is committed to the repository.

This leads to a potential inconsistency where, if a developer updates the source code but does not run the compiler and/or bundler, the source code may not match the distribution that is committed. This is best resolved through [pre-commit hooks](#hooks).

The goal of this action is to bundle the source code and compare the generated bundle to that which was committed. If they match, the distibution is up-to-date and the action succeeds. Otherwise, the action fails.

There is no reason that this action can't be used by projects other than GitHub Actions, but this action was developed for that use-case.

## Inputs

See [this repository's workflow](./.github/workflows/verify-self.yml) for an example.

| Input | Description |
| ---   | --- |
| `bundle_file` | Path, relative to the repository root, to your bundled js file. Only one regular file is supported. <br><br>For this repository, it is [`dist/index.js`](./dist/index.js). |
| `bundle_command`| Command to run to generate your bundle. A `package.json` script is recommended, which can in turn execute your bundler such as `webpack` or `ncc`.<br><br>For this repository, it is [`npm run bundle`](./package.json#L8). |

## Hooks
To ensure bundle consistency, this repository uses git pre-commit hooks.

To install the hooks, run `cp hooks/* .git/hooks/` and accept any overwrites.
