# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-20

### Added

-   Initial implementation of Termii API SDK with resources for Messaging, Sender ID, Number, Templates, Phonebook, Contacts, and Campaigns.
-   Comprehensive unit and integration test suite.
-   Detailed `README.md` for quick start and usage.
-   Basic GitHub Actions for Continuous Integration.

### Changed

-   Updated project dependencies to their latest stable versions.
-   Migrated ESLint configuration to the new Flat Config format (`eslint.config.js`).
-   Enhanced TypeScript strictness by systematically removing all `any` type casts from the source code, replacing them with `unknown` or more specific types.
-   Improved build configuration (`tsconfig.build.json`) for correct `dist` generation.
-   Refined type-safe validation for `CHANNELS` and `MESSAGE_TYPES` in resource files.

### Fixed

-   Resolved multiple TypeScript compilation errors across test files and source code due to updated dependencies and stricter type checking.
-   Fixed `no-empty-object-type` linting error in `src/types/campaign.types.ts`.
-   Resolved all linting errors and warnings (including `prettier/prettier` conflicts and `no-undef` issues) across the codebase.
-   Ensured all unit and integration tests pass consistently after refactoring.

### Removed

-   Old `.eslintrc.js` configuration file (replaced by `eslint.config.js`).
