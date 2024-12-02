# How to Contribute

Follow these steps:

1. For the [repository](https://github.com/pieter-dutoit/the-grand-collection) and clone the fork to your local environment.
2. Create a feature branch, following conventional commit guidelines (see below).
3. Commit your work, and create migrations if changes were made to payload collections (see below).

## Environment Variables

```env
PAYLOAD_SECRET=
DATABASE_URI=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
S3_ENDPOINT=
```

## Payload CMS Migrations

[Explained in more detail here](https://payloadcms.com/docs/database/migrations#when-to-run-migrations)

**NB: In dev mode, Payload applies collection changes automatically.** To avoid unintentional table or data loss, always connect to a **testing database when editing collections in dev mode**.

After making changes to any collections, and before pushing to GitHub, follow these steps:

1. Create a migration file: `pnpm payload migrate:create`

2. Commit and push. Migrations are during deployment.

## Setting Up the Development Environment

### Recommended VSCode extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Conventional Commits

Follow the conventional commits specification for your commit messages. Common examples include:

- `feat: add new user login feature`
- `fix: resolve payment processing error`
- `docs: update API usage documentation`
- `style: format code with Prettier`
- `refactor: improve database query efficiency`
- `perf: optimize image loading`
- `test: add unit tests for user service`
- `chore: update dependencies`
- `BREAKING CHANGE: remove api route`

## Resources

- [Prettier, ESLint, Lint-stages config](https://www.freecodecamp.org/news/how-to-set-up-eslint-prettier-stylelint-and-lint-staged-in-nextjs/#heading-set-up-prettier)
