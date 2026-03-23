# GitHub Copilot Project Instructions

## Project Overview

This project is a Next.js application. It uses TypeScript and follows a modern file-based routing structure. The main entry point is in the `app/` directory. Styling is managed with global CSS and PostCSS. The project uses ESLint for linting and TypeScript for type checking.

## Coding Conventions

- Use TypeScript for all new files and components.
- Prefer functional React components and hooks.
- Place new pages and layouts in the `app/` directory.
- Use CSS modules or global styles as appropriate.
- Keep components small and focused; extract reusable logic into hooks or utility functions.
- Use named exports for all modules.
- Follow the ESLint and Prettier rules defined in the project.

## Commit Message Guidelines

- Use clear, descriptive commit messages.
- Reference issues or features when relevant.
- Use present tense (e.g., "Add login page", not "Added login page").

## Pull Request Guidelines

- Ensure all code passes linting and type checks before submitting a PR.
- Include a summary of changes and testing steps in the PR description.
- Request review from at least one team member.

## Copilot Usage

- Use Copilot to suggest code, but always review and edit suggestions for correctness and style.
- Prefer Copilot suggestions that align with the conventions above.
- If Copilot suggests code that is unclear or overly complex, refactor for readability.

## Additional Notes

- Read the `AGENTS.md` file for Next.js-specific agent rules and breaking changes.
- Refer to the README.md for setup and run instructions.
- Keep dependencies up to date and remove unused packages regularly.
