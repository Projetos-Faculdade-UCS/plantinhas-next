# Contributor Guide

## Dev Environment Tips

- Run `yarn` to install dependencies.
- Run `yarn dev` to start the development server.
- Run `yarn test` to run tests.
- Run `yarn lint` to check for linting errors.
- If you add a new package, make sure to add it to the `packages.json` file in the root of the monorepo.

## Testing Instructions

- Run `yarn test` to run every check defined for that package.
- From the package root you can just call `yarn test`. The commit should pass all tests before you merge.
- To focus on one step, add the Vitest pattern: `yarn vitest run -t "<test name>"`.
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `yarn lint --filter <project_name>` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.
- Add vitest mocks to test external dependencies.

## Chat rules

- See the file `.github/copilot-instructions.md` for the rules of the chat.
