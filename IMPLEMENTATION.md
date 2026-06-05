> **Language / Idioma:** [English](IMPLEMENTATION.md) · [Español](IMPLEMENTACION.md)

# Implementation plan — miranda-preludio

VS Code extension that improves the experience of writing Miranda code, focusing on standard Prelude functions.

**Target features:**
- Highlight Prelude functions in a color distinct from the rest of the code
- Autocompletion when typing a function name
- Hover showing signature, description, and usage examples
- Bilingual documentation (English primary, Spanish support)

---

## Step 1 — Initialize the project with `yo code` ✅

The official VS Code extension generator (`yo code`) was used to create the base TypeScript project structure.

**Generated files:**
- `package.json` — extension manifest
- `src/extension.ts` — extension entry point
- `tsconfig.json`, `eslint.config.mjs` — build and lint configuration

---

## Step 2 — Create the Prelude catalog (`prelude.ts`) ✅

Created the Prelude catalog with the `PreludeEntry` interface and the `prelude` array containing all standard Miranda Prelude functions, organized by category.

**Categories covered:** Lists, Arithmetic, Characters, Combinators, System, Tuples.

**Each entry includes:**
- `name` — function name
- `signature` — type in Miranda notation
- `description` — explanation (originally Spanish only)
- `category` — thematic grouping
- `examples` — usage examples (optional)

**Exported utilities:** `preludeNames`, `lookupEntry(name)`

---

## Step 3 — Register Miranda language + base configuration ✅

Register Miranda as a VS Code language so `.m` files activate the extension and language providers apply correctly.

**Files modified/created:**
- `package.json` — add `contributes.languages` and `contributes.grammars`
- `language-configuration.json` — comments, brackets, auto-close

---

## Step 4 — TextMate grammar with Prelude highlighting ✅

Create the TextMate grammar that defines syntax coloring for Miranda files. Prelude functions receive the `support.function.prelude.miranda` scope, which color themes distinguish from user code.

**Files created:**
- `syntaxes/miranda.tmLanguage.json`

**Defined scopes:**
| Element | TextMate scope |
|---|---|
| Comments (`\|\|`) | `comment.line.miranda` |
| Strings | `string.quoted.double.miranda` |
| Chars | `string.quoted.single.miranda` |
| Numbers | `constant.numeric.miranda` |
| Keywords | `keyword.control.miranda` |
| Type operators (`::`, `->`) | `keyword.operator.type.miranda` |
| Prelude functions | `support.function.prelude.miranda` |

---

## Step 5 — Autocompletion (`CompletionItemProvider`) ✅

Register an autocompletion provider for Miranda that suggests Prelude functions while the user types. Each suggestion includes the signature as detail and the full description with examples as documentation.

**Files modified:**
- `src/extension.ts`

**Behavior:**
- Activates automatically when typing in `.m` files
- Shows function + signature in the dropdown
- On selection, inserts the function name
- Side panel shows description + examples

---

## Step 6 — Hover documentation (`HoverProvider`) ✅

Register a hover provider that, when the cursor is over a Prelude function name, shows a tooltip with:
- Type signature in a Miranda code block
- Description
- Usage examples

**Files modified:**
- `src/extension.ts`

---

## Step 7 — Internationalization (i18n) ✅

Add bilingual support with English as the primary language and Spanish as secondary.

**Files created:**
- `src/locale.ts` — locale detection, UI strings, category map
- `src/prelude.base.ts` — shared metadata (name, signature, examples, categoryKey)
- `src/prelude.en.ts` — English descriptions (95 functions)
- `src/prelude.es.ts` — Spanish descriptions
- `package.nls.json` — English manifest strings
- `package.nls.es.json` — Spanish manifest strings

**Files modified:**
- `src/prelude.ts` — merge base + locale texts, cache by locale
- `src/extension.ts` — dynamic locale in `buildDoc()`, cache invalidation on config change
- `package.json` — `displayName: "Miranda Prelude"`, `documentationLanguage` setting, removed unused Hello World command

**Language selection:**
- `auto` (default): follows VS Code UI language (`es-*` → Spanish, else English)
- `en` / `es`: force a specific language

---

## Final result

With all seven steps complete, the extension provides:

1. **Highlighting** — Prelude function names appear in the active theme's `support.function` color (usually blue/cyan), distinct from user-defined functions.
2. **Autocompletion** — IntelliSense suggests functions while typing, with signature and integrated documentation.
3. **Hover** — tooltip with signature, description, and examples on any Prelude function.
4. **Bilingual docs** — hover and autocompletion text in English or Spanish according to locale or setting.

---

## How to test the extension

### 1. Launch the development environment

1. Open the `miranda-preludio` folder in VS Code
2. Press `F5` — a new window opens called **Extension Development Host**
3. Everything you do in that window runs with the extension active

### 2. Open an example file

In the Extension Development Host window, open [`miranda-preludio/example.en.m`](miranda-preludio/example.en.m) or [`miranda-preludio/example.es.m`](miranda-preludio/example.es.m). These files contain Miranda code that exercises all extension features.

### 3. Verify syntax highlighting

When opening an example file, you should see:

| Color | Meaning |
|---|---|
| Blue / cyan (theme-dependent) | Prelude functions (`map`, `filter`, `foldl`, etc.) |
| Orange / yellow | Keywords (`if`, `where`, `let`, `True`, `False`) |
| Green | Strings (`"hello"`) and characters (`'a'`) |
| Magenta / beige | Numbers (`42`, `3.14`) |
| Gray / italic | Comments (lines starting with `\|\|`) |
| Default color | User-defined functions (`square`, `squareList`) |

The contrast between Prelude and user functions is the main highlighting feature.

### 4. Verify autocompletion

1. Create a new `.m` file in the same window
2. Start typing a function name: `fil`, `ma`, `fol`, `tak`...
3. IntelliSense suggestions should appear automatically
4. Each suggestion shows the type signature on the right
5. Clicking a suggestion (or pressing Tab/Enter) expands full documentation in the side panel

If IntelliSense does not appear on its own, press `Ctrl+Space` (`Cmd+Space` on Mac).

### 5. Verify hover

1. In any `.m` file, hover over a Prelude function name (e.g. `filter` in `example.en.m`)
2. After a moment a tooltip appears with:
   - Type signature in a code block
   - Description in the active language (English by default)
   - Usage examples

To test Spanish: set `"miranda-preludio.documentationLanguage": "es"` in settings, or run VS Code with `"locale": "es"`.

### 6. Verify bracket auto-close

1. In a `.m` file, type `[` — it should auto-close as `[]`
2. Type `(` — should auto-close as `()`
3. Type `"` — should auto-close as `""`
4. Type `||` followed by text — the whole line should appear as a comment
