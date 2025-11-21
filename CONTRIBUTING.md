# Contributing to Termii Node.js SDK

Thank you for considering contributing to the Termii Node.js SDK! We welcome any contributions, from bug reports and feature requests to code changes.

To ensure a smooth and effective collaboration, please review these guidelines.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## How to Contribute

### 1. Reporting Bugs

- Ensure the bug is not already reported by searching the [issues page](https://github.com/basil4240/termii-node/issues).
- If you can't find an open issue addressing the problem, [open a new one](https://github.com/basil4240/termii-node/issues/new).
- Provide a clear and concise description of the bug.
- Include steps to reproduce the behavior, expected outcome, and actual outcome.
- Mention your Node.js version, npm/yarn version, and any relevant environment details.

### 2. Suggesting Enhancements or Features

- Check if there's an existing issue or discussion for your suggestion.
- [Open a new issue](https://github.com/basil4240/termii-node/issues/new) and clearly describe the feature or enhancement.
- Explain why this would be beneficial to the SDK and its users.

### 3. Making Code Changes

#### Setup Development Environment

1.  **Fork the repository:** Go to the [Termii Node.js SDK GitHub page](https://github.com/basil4240/termii-node) and click the "Fork" button.
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/termii-node.git
    cd termii-node
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create a new branch:** Choose a descriptive name for your branch (e.g., `feature/add-token-api`, `fix/bug-in-messaging`).
    ```bash
    git checkout -b feature/your-feature-name
    ```

#### Code Style and Quality

-   **TypeScript:** All new code should be written in TypeScript.
-   **Linting & Formatting:** We use ESLint and Prettier to maintain consistent code style.
    -   Run `npm run lint` to check for style violations.
    -   Run `npm run lint:fix` to automatically fix most issues.
    -   Run `npm run format` to format your code with Prettier.
    -   A `pre-commit` hook (via Husky) is configured to run linting and formatting checks automatically before you commit.
-   **Type Safety:** Aim for strict type safety. Avoid `any` where possible and provide clear type definitions.

#### Testing

-   All new features and bug fixes **must** be accompanied by appropriate unit and/or integration tests.
-   Run tests frequently during development: `npm test`
-   Check test coverage: `npm run test:coverage` (aim for high coverage).

#### Committing Changes

-   **Atomic Commits:** Make small, focused commits that address a single concern.
-   **Clear Messages:** Write clear, concise commit messages. A good commit message explains *what* changed and *why*.
-   **Sign Your Commits (DCO):** We enforce the Developer Certificate of Origin (DCO) for all commits. By signing off your commits, you certify that you have the right to contribute the code.
    -   Add `-s` or `--signoff` to your commit command: `git commit -s -m "feat: Add new feature"`

#### Submitting a Pull Request (PR)

1.  **Push your branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
2.  **Open a Pull Request:** Go to your fork on GitHub and follow the prompts to open a new PR against the `main` branch of the upstream repository.
3.  **Provide Details:**
    -   Clearly describe the changes in your PR.
    -   Reference any related issues (e.g., `Fixes #123`, `Closes #456`).
    -   Explain any design decisions or trade-offs made.
    -   If the PR introduces a new feature, include usage examples if applicable.
4.  **Address Feedback:** Be responsive to feedback and be prepared to make further changes.

## License

By contributing to this project, you agree that your contributions will be licensed under its MIT License.

---

This document is inspired by popular open-source contribution guidelines.
