# GitHub Action Bundle Verifier

[![Verify Self](https://github.com/tetchel/bundle-verifier-action/workflows/Verify%20Self/badge.svg)](https://github.com/tetchel/bundle-verifier-action/actions?query=workflow%3A%22Verify+Self%22)
![Bundle Size](https://img.shields.io/github/size/tetchel/bundle-verifier-action/dist/index.js)
![License](https://img.shields.io/github/license/tetchel/bundle-verifier-action)

Repositories that include GitHub actions are unusual in that their production bundle is committed to the repository.

This leads to a potential inconsistency where, if a developer updates the source code but does not run the compiler and/or bundler, the source code may not match the distribution that is committed. This is best resolved through pre-commit hooks.

The job of this action is to bundle the source code and compare the generated bundle to that which was committed. If they match, the distibution is up-to-date and the action succeeds. Otherwise, the action fails.

If you are not using a bundler for your action, you should be to significantly reduce download size. `@vernel/ncc` and `webpack` are recommended.

See [this repository's workflow](./.github/workflows/verify-self.yml) for an example.
