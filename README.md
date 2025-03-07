# volto-timeline-block (@kitconcept/volto-timeline-block)

Volto add-on for timeline block

[![npm](https://img.shields.io/npm/v/@kitconcept/volto-timeline-block)](https://www.npmjs.com/package/@kitconcept/volto-timeline-block)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://kitconcept.github.io/volto-timeline-block/)
[![Code analysis checks](https://github.com/kitconcept/volto-timeline-block/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-timeline-block/actions/workflows/code.yml)
[![Unit tests](https://github.com/kitconcept/volto-timeline-block/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-timeline-block/actions/workflows/unit.yml)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://kitconcept.com/kitconcept-white.svg">
  <img width="300" alt="kitconcept, GmbH" src="https://kitconcept.com/kitconcept-black.svg">
</picture>

The Volto-timeline-block is a Volto add-on developed by kitconcept that enables the integration of interactive timeline blocks in Volto page.

## Features

1.	Interactive Timelines: Easily create and manage timelines to display events or content chronologically.
2.  Customization: Offers options to tailor the appearance and behavior of timeline blocks to fit the site’s design and user needs.
3. Responsive Design: Ensures timelines are accessible and visually appealing across various devices and screen sizes.
4. User-Friendly Interface: Provides an intuitive interface for editors to add, edit, and organize timeline entries without requiring technical expertise.

## Installation

To install your project, you must choose the method appropriate to your version of Volto.


### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-timeline-block
cd my-volto-project
```

Add `@kitconcept/volto-timeline-block` to your package.json:

```JSON
"addons": [
    "@kitconcept/volto-timeline-block"
],

"dependencies": {
    "@kitconcept/volto-timeline-block": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

### Volto 18 and later

Add `@kitconcept/volto-timeline-block` to your `package.json`:

```json
"dependencies": {
    "@kitconcept/volto-timeline-block": "*"
}
```

Add `@kitconcept/volto-timeline-block` to your `volto.config.js`:

```javascript
const addons = ['@kitconcept/volto-timeline-block'];
```

If this package provides a Volto theme, and you want to activate it, then add the following to your `volto.config.js`:

```javascript
const theme = '@kitconcept/volto-timeline-block';
```

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Pre-requisites

-   [Node.js](https://6.docs.plone.org/install/create-project.html#node-js)
-   [Make](https://6.docs.plone.org/install/create-project.html#make)
-   [Docker](https://6.docs.plone.org/install/create-project.html#docker)


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and Acknowledgements 🙏

Crafted with care by **Generated using [Cookieplone (0.8.3)](https://github.com/plone/cookieplone) and [cookiecutter-plone (1574aa3)](https://github.com/plone/cookiecutter-plone/commit/1574aa3d10ff257b33d59e3fd6f815a163fbfc0f) on 2025-02-06 19:24:15.021648**. A special thanks to all contributors and supporters!
