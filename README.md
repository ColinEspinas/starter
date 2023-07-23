# Starter

Starter template for my personal projects, works with [Nuxt3](https://nuxt.com/) + [TailwindCSS](https://tailwindcss.com/) on the front, [Nitro](https://nitro.unjs.io/) + [Drizzle](https://orm.drizzle.team/) on the back and compatible with most databases.

## Setup

This project uses [devbox](https://www.jetpack.io/devbox/docs/) to provide a consistent development environment. Make sure you have it [installed](https://www.jetpack.io/devbox/docs/installing_devbox/) before continuing.

Once you have devbox installed, run the following commands to get started:

```bash
# Enter devbox shell
> devbox shell

# Install package managers and dependencies
> devbox run app:setup

# Init postgres and create dev database
> devbox run db:init
> devbox run db:up
> devbox run db:create

# Run migrations
> nr migration:run

# Start the app
> nr dev

# (Optional) Start Drizzle studio
> nr studio
```

## Development

To get the project running locally, you'll need to start the app and the database:

```bash
# Enter devbox shell
> devbox shell

# Start the database
> devbox run db:up

# Start the app
> nr dev
```

To stop the database, run:

```bash
> devbox services stop postgresql
```

## Deployment

TODO: Add deployment instructions