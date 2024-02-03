# Starter

Starter template for my personal projects, works with [Nuxt3](https://nuxt.com/) + [TailwindCSS](https://tailwindcss.com/) on the front, [Nitro](https://nitro.unjs.io/) + [Drizzle](https://orm.drizzle.team/) on the back and compatible with most databases.

## Setup

This project uses [devbox](https://www.jetpack.io/devbox/docs/) to provide a consistent development environment. Make sure you have it [installed](https://www.jetpack.io/devbox/docs/installing_devbox/) before continuing.

Once you have devbox installed, run the following commands to get started:

```bash
# Enter devbox shell
> devbox shell

# Install package managers and dependencies
> pnpm install

# Init postgres and create dev database
> devbox run db:init
> devbox run db:up
> devbox run db:create

# Generate migrations (needed if you deleted .drizzle to reset the migrations)
> pnpm migration:generate

# Run migrations
> pnpm migration:run

# Start the app
> pnpm dev

# (Optional) Start Drizzle studio
> pnpm studio
```

## Development

To get the project running locally, you'll need to start the app and the database:

```bash
# Enter devbox shell
> devbox shell

# Start the database
> devbox run db:up

# Start the app
> pnpm dev
```

To stop the database, run:

```bash
> devbox services stop postgresql
```

## Deployment

TODO: Add deployment instructions