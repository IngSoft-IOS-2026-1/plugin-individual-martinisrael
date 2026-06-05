> **Language / Idioma:** [English](HOW_IT_WORKS.md) · [Español](COMO_FUNCIONA.md)

# How the miranda-preludio extension works

This document explains in accessible terms what the extension does, which tools were used, and how each part contributes to the final result. You do not need prior knowledge of Miranda or VS Code extension development.

---

## The problem it solves

Miranda is a functional programming language with a standard library called the **Prelude**. That library includes more than 95 built-in functions (such as `map`, `filter`, `sort`, `hd`, etc.) that the programmer can use directly.

The problem is that VS Code does not know Miranda: it does not recognize the language, does not understand its syntax, and cannot tell whether a name is a standard library function or one written by the programmer.

The extension addresses this on three fronts:
1. Highlights Prelude functions in a different color from user-defined code
2. Suggests functions automatically while typing
3. Shows each function's signature and documentation on hover

---

## The pieces of the extension

### `src/prelude.*.ts` — the function catalog

This is the foundation of everything. The catalog is split across several files:

| File | Contents |
|---|---|
| `prelude.base.ts` | Shared metadata: name, type signature, examples, category key |
| `prelude.en.ts` | English descriptions (Record keyed by function name) |
| `prelude.es.ts` | Spanish descriptions (same structure) |
| `prelude.ts` | Merges base + locale texts and exports `getPrelude()`, `lookupEntry()` |

For each Prelude function the catalog stores:

- **name** — function name (e.g. `filter`)
- **signature** — type in Miranda notation (e.g. `filter :: (* -> bool) -> [*] -> [*]`)
- **description** — what it does, in English or Spanish depending on locale
- **categoryKey** — internal key (`lists`, `arithmetic`, `characters`, etc.)
- **examples** — concrete usage cases with results

The autocompletion and hover providers use this catalog.

### `src/locale.ts` — language detection

Determines which documentation language to show:

- Setting `miranda-preludio.documentationLanguage`: `auto`, `en`, or `es`
- In `auto` mode, follows `vscode.env.language` (`es-*` → Spanish, otherwise English)
- English is the default fallback

Also defines UI strings such as the "Examples" label in hover tooltips.

---

### `syntaxes/miranda.tmLanguage.json` — syntax highlighting

VS Code uses **TextMate grammars** to color code. These are essentially rules that say: "if you see this, paint it this color."

Rules are written in a JSON file with regular expressions. For example:

- Anything starting with `||` to end of line → comment color
- Anything between double quotes → string color
- Words like `if`, `where`, `let`, `True`, `False`, etc. → keyword color
- Exact Prelude function names (`map`, `filter`, `sort`, ...) → standard library function color

The color the programmer sees depends on the **theme** installed in VS Code. The extension tells VS Code *what kind of thing* each code fragment is (comment, keyword, library function), and the theme decides *what color* to use. Highlighting therefore adapts automatically to light or dark themes.

**Key point:** Prelude functions get the `support.function` category (support/library function), which themes color differently from user-defined functions. That makes `map` or `filter` look distinct from `square` or `squareList`.

---

### `language-configuration.json` — editor behavior

This file teaches VS Code basic language behaviors:

- **Comments:** Miranda comments start with `||`, so the toggle-line-comment shortcut inserts `||` instead of `//` or `#`
- **Brackets:** typing `[` auto-closes with `]`; same for `(` and quotes
- **Indentation:** helps the editor indent automatically in certain contexts

---

### `package.json` — extension manifest

Central configuration file. It tells VS Code:

- **Which files this extension handles:** files with extension `.m` are Miranda
- **Which grammar to use:** points to `miranda.tmLanguage.json` for highlighting
- **Which language configuration to use:** points to `language-configuration.json`
- **Documentation language setting:** `miranda-preludio.documentationLanguage`

Localized metadata (description, setting labels) lives in `package.nls.json` (English) and `package.nls.es.json` (Spanish).

Without this file, VS Code would not know Miranda exists or when to activate the extension.

---

### `src/extension.ts` — extension logic

TypeScript code that VS Code runs when the extension activates. It registers two **providers**:

#### Autocompletion provider (`CompletionItemProvider`)

When the user types in a `.m` file and triggers IntelliSense (automatically or with `Ctrl+Space`), this provider returns the full Prelude function list for the active locale. For each function it builds a suggestion with:
- The function name as text to insert
- The type signature as short detail (shown to the right in the list)
- Description and examples as long documentation (shown in the side panel)

#### Hover provider (`HoverProvider`)

When the user rests the cursor on a word in a `.m` file, VS Code asks this provider whether it has anything to show. The provider:
1. Reads the word under the cursor
2. Looks it up in the Prelude catalog (current locale)
3. If found, builds a tooltip with signature, description, and examples
4. If not found (user-defined function), shows nothing

When `documentationLanguage` changes, the prelude cache is invalidated so the next hover or completion uses the new language.

---

## How the pieces fit together

```
.m file open in VS Code
        │
        ├─► TextMate grammar ──► real-time syntax highlighting
        │
        ├─► CompletionItemProvider ──► suggestions while typing
        │         └── queries getPrelude() (locale-aware)
        │
        └─► HoverProvider ──► tooltip on cursor hover
                  └── queries lookupEntry() (locale-aware)
```

Highlighting works without the extension "running": VS Code applies it directly from the grammar JSON. Autocompletion and hover require the TypeScript code to be active, but VS Code activates it automatically when any `.m` file is opened.

---

## Technologies used

| Technology | Purpose |
|---|---|
| **TypeScript** | Main extension language. Static typing helps build objects in the precise formats VS Code expects. |
| **VS Code Extension API** | Official interface for registering providers, commands, and settings. |
| **TextMate Grammars** | Standard syntax highlighting system used by VS Code, Sublime Text, and others. Defined in JSON with regular expressions. |
| **Yeoman (`yo code`)** | Generator that scaffolds the initial project with required configuration files. |
| **Node.js / npm** | Runtime and package manager. The extension is compiled with the TypeScript compiler (`tsc`) included as a dependency. |
| **package.nls.json** | VS Code extension localization for manifest metadata (description, setting labels). |
