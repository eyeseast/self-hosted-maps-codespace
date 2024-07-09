# Self-hosted maps in a codespace

This repo contains a Dockerfile and dev container configuration that will build the tools necessary for self-hosted maps:

- `pmtiles` CLI
- `tippecanoe`
- NodeJS
- Python

The `Makefile` includes build steps for an example project mapping trees in Baltimore. You can see the finished project [on Github](https://github.com/eyeseast/baltimore-trees).

[Read more about self-hosted maps](https://www.muckrock.com/news/archives/2024/feb/13/release-notes-how-to-make-self-hosted-maps-that-work-everywhere-cost-next-to-nothing-and-might-even-work-in-airplane-mode/).

## Setup

This project will work with or without Docker. The easiest setup uses [Github's codespaces](https://docs.github.com/en/codespaces/overview). Locally, it can use a [development container](https://code.visualstudio.com/docs/devcontainers/containers) to create a consistent environment.

### Getting started via Github.com

1. Navigate to https://github.com/eyeseast/self-hosted-maps-codespace (you might already be here)
2. Click **Use this template**, then click **Open in a codespace**

See [Codespaces Quickstart](https://docs.github.com/en/codespaces/getting-started/quickstart) for more information.

Inside the codebase, you'll need to install Python and NodeJS dependencies to use Datasette or build the map. Running `make install` will get both.

### Working locally, using VSCode and docker

Assuming you've cloned this repository, open it in VS Code, and you should be prompted to reopen it inside a dev container. This will build a docker image with all dependencies installed.

For more detailed instructions, see [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container).

This will work on any system that can run Docker and should give you a consistent development environment regardless of your root operating system.

### Working locally on MacOS

I work on a MacBook, and if you don't mind installing things with Homebrew, you can work without a dev container.

```sh
brew install pmtiles
brew install tippecanoe
brew install libspatialite
```

(It's possible I'm forgetting something here. I don't recreate my laptop environment from scratch that often. Please open an issue if needed.)

Building the final map requires NodeJS. I recommend either downloading the [current LTS version](https://nodejs.org/en) or using a version manager like [`nodenv`](https://github.com/nodenv/nodenv).

To explore the included tree data with [datasette](https://datasette.io/), you'll need a working Python environment. You can follow my [recommended Python setup](https://chrisamico.com/blog/2023-01-14/python-setup/). This repo uses Poetry instead of Pipenv, so install that using `pipx install poetry`.

Once Python and NodeJS are configured, run `make install` to download dependencies for both environments.

## Building the map

tl;dr

```sh
make install
make tiles
make fonts
npm run dev
```

We have two sets of tiles: the underlying street map, and the point data for trees. Running `make tiles` will get both. Street tiles are extracted from today's [Protomaps build](https://maps.protomaps.com/builds/). We use [tippecanoe](https://github.com/felt/tippecanoe) to turn tree data into tiles.

NOTE: if you run into an error with `make tiles`, with a 404 error from build.protomaps.com, you may be one day ahead of the available protomap builds from https://maps.protomaps.com/builds/. To remedy, edit the `TODAY` variable in the `Makefile` to be a valid day that will call an available pmtiles set from https://maps.protomaps.com/builds/.

## Exploring tree data with Datasette

If you want to dig into Baltimore's tree inventory, you can build a SpatiaLite database and explore it with Datasette.

```sh
make trees # build the database
make ds # run datasette
```

Have fun.
