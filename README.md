# Starter

Battery included Nuxt based starter template for my projects. Created to get a great DX, UX and UI as fast as possible.

## Built with

- [Nuxt](https://nuxt.com/)
- [Tailwind](https://tailwindcss.com/) + [Radix Vue](https://www.radix-vue.com/)
- [Drizzle](https://orm.drizzle.team/)
- [Kinde](https://www.kinde.com/)
- [Umami](https://umami.is/)

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

### Migrations

Using drizzle as an ORM, we have a lot of tools to manage database migrations:

```bash
# Generate new migrations
pnpm migration:generate

# Drop existing migrations
pnpm migration:drop

# Pull migrations from database
pnpm migration:pull

# Run migrations
pnpm migration:run
```

## Deployment

TODO: Add deployment instructions
