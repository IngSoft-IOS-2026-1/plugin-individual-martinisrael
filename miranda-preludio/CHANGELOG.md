# Change Log

All notable changes to the "miranda-preludio" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Fixed

- Hover no longer triggers for Prelude names inside `||` comments or string literals

### Added

- Prelude category label shown at the top of hover and completion documentation

## [0.0.3] - 2026-06-05

### Changed

- README wording: removed references to other Miranda extensions

## [0.0.2] - 2026-06-05

### Added

- Extension icon for the VS Code Marketplace listing

### Fixed

- Marketplace README image and example file links (public repository URLs)

## [0.0.1] - 2026-06-05

### Added

- Syntax highlighting for Miranda `.m` files with distinct Prelude function colors
- Autocompletion for 95+ standard Prelude functions with type signatures
- Hover documentation with descriptions and usage examples
- Bilingual documentation support (English primary, Spanish via VS Code UI locale or `miranda-preludio.documentationLanguage` setting)
- Example files: `example.en.m` and `example.es.m`
