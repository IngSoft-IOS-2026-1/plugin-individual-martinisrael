> **Language / Idioma:** [English](IMPLEMENTATION.md) · [Español](IMPLEMENTACION.md)

# Plan de implementación — miranda-preludio

Plugin de VS Code que mejora la experiencia al escribir código en Miranda, enfocándose en las funciones del Preludio estándar.

**Funcionalidades objetivo:**
- Resaltado de funciones del Preludio en un color distinto al resto del código
- Autocompletado al comenzar a escribir el nombre de una función
- Hover que muestra la firma, descripción y ejemplo de uso
- Documentación bilingüe (inglés principal, soporte en español)

---

## Paso 1 — Inicializar el proyecto con `yo code` ✅

Se usó el generador oficial de extensiones de VS Code (`yo code`) para crear la estructura base del proyecto con TypeScript.

**Archivos generados:**
- `package.json` — manifiesto de la extensión
- `src/extension.ts` — punto de entrada de la extensión
- `tsconfig.json`, `eslint.config.mjs` — configuración de build y linting

---

## Paso 2 — Crear el catálogo del Preludio (`prelude.ts`) ✅

Se creó `src/prelude.ts` con la interfaz `PreludeEntry` y el arreglo `prelude` que contiene todas las funciones del Preludio estándar de Miranda, organizadas por categoría.

**Categorías cubiertas:** Listas, Aritmética, Caracteres, Combinadores, Sistema, Tuplas.

**Cada entrada incluye:**
- `name` — nombre de la función
- `signature` — tipo en notación Miranda
- `description` — explicación (inicialmente solo en español)
- `category` — agrupación temática
- `examples` — ejemplos de uso (opcional)

**Utilidades exportadas:** `preludeNames`, `lookupEntry(name)`

---

## Paso 3 — Registrar el lenguaje Miranda + configuración base ✅

Registrar Miranda como lenguaje reconocido por VS Code, de modo que los archivos `.m` activen la extensión y los proveedores de lenguaje se apliquen correctamente.

**Archivos modificados/creados:**
- `package.json` — agregar `contributes.languages` y `contributes.grammars`
- `language-configuration.json` — comentarios, brackets, auto-cierre

---

## Paso 4 — Gramática TextMate con resaltado del Preludio ✅

Crear la gramática TextMate que define la colorización de sintaxis para archivos Miranda. Las funciones del Preludio reciben el scope `support.function.prelude.miranda`, que los temas de color distinguen del código de usuario.

**Archivos creados:**
- `syntaxes/miranda.tmLanguage.json`

**Scopes definidos:**
| Elemento | Scope TextMate |
|---|---|
| Comentarios (`\|\|`) | `comment.line.miranda` |
| Strings | `string.quoted.double.miranda` |
| Chars | `string.quoted.single.miranda` |
| Números | `constant.numeric.miranda` |
| Palabras clave | `keyword.control.miranda` |
| Operadores de tipo (`::`, `->`) | `keyword.operator.type.miranda` |
| Funciones del Preludio | `support.function.prelude.miranda` |

---

## Paso 5 — Autocompletado (`CompletionItemProvider`) ✅

Registrar un proveedor de autocompletado para el lenguaje Miranda que sugiere funciones del Preludio mientras el usuario escribe. Cada sugerencia incluye la firma como detalle y la descripción completa con ejemplos como documentación.

**Archivos modificados:**
- `src/extension.ts`

**Comportamiento:**
- Se activa automáticamente al escribir en archivos `.m`
- Muestra función + firma en la lista desplegable
- Al seleccionar, inserta el nombre de la función
- La documentación lateral muestra descripción + ejemplos

---

## Paso 6 — Hover documentation (`HoverProvider`) ✅

Registrar un proveedor de hover que, al posicionar el cursor sobre el nombre de una función del Preludio, despliega un tooltip con:
- Firma tipada en bloque de código Miranda
- Descripción
- Ejemplos de uso

**Archivos modificados:**
- `src/extension.ts`

---

## Paso 7 — Internacionalización (i18n) ✅

Agregar soporte bilingüe con inglés como idioma principal y español como secundario.

**Archivos creados:**
- `src/locale.ts` — detección de locale, strings de UI, mapa de categorías
- `src/prelude.base.ts` — metadatos compartidos (name, signature, examples, categoryKey)
- `src/prelude.en.ts` — descripciones en inglés (95 funciones)
- `src/prelude.es.ts` — descripciones en español
- `package.nls.json` — strings del manifiesto en inglés
- `package.nls.es.json` — strings del manifiesto en español

**Archivos modificados:**
- `src/prelude.ts` — merge de base + textos por locale, caché por idioma
- `src/extension.ts` — locale dinámico en `buildDoc()`, invalidación de caché al cambiar config
- `package.json` — `displayName: "Miranda Prelude"`, setting `documentationLanguage`, eliminado comando Hello World residual

**Selección de idioma:**
- `auto` (default): sigue el idioma de la UI de VS Code (`es-*` → español, resto → inglés)
- `en` / `es`: forzar un idioma específico

---

## Resultado final

Con los siete pasos completados, la extensión provee:

1. **Resaltado** — los nombres de funciones del Preludio aparecen en el color de `support.function` del tema activo (generalmente azul/cian), diferenciándose de las funciones definidas por el usuario.
2. **Autocompletado** — IntelliSense sugiere las funciones al escribir, con firma y documentación integradas.
3. **Hover** — tooltip con firma, descripción y ejemplos al pasar el mouse sobre cualquier función del Preludio.
4. **Documentación bilingüe** — hover y autocompletado en inglés o español según locale o setting.

---

## Cómo probar el plugin

### 1. Lanzar el entorno de desarrollo

1. Abrí la carpeta `miranda-preludio` en VS Code
2. Presioná `F5` — se abre una nueva ventana llamada **Extension Development Host**
3. Todo lo que hagas en esa ventana tiene el plugin activo

### 2. Abrir el archivo de ejemplo

En la ventana Extension Development Host, abrí [`miranda-preludio/example.en.m`](miranda-preludio/example.en.m) o [`miranda-preludio/example.es.m`](miranda-preludio/example.es.m). Estos archivos contienen código Miranda que ejercita todas las funcionalidades del plugin.

### 3. Verificar el resaltado de sintaxis

Al abrir un archivo de ejemplo, deberías ver:

| Color | Qué representa |
|---|---|
| Azul / cian (según tema) | Funciones del Preludio (`map`, `filter`, `foldl`, etc.) |
| Naranja / amarillo | Palabras clave (`if`, `where`, `let`, `True`, `False`) |
| Verde | Strings (`"hola"`) y caracteres (`'a'`) |
| Magenta / beige | Números (`42`, `3.14`) |
| Gris / itálica | Comentarios (líneas que empiezan con `||`) |
| Color por defecto | Funciones definidas por el usuario (`cuadrado`, `listaAlCuadrado`) |

El contraste entre las funciones del Preludio y las funciones propias es la feature principal del resaltado.

### 4. Verificar el autocompletado

1. Creá un nuevo archivo con extensión `.m` en la misma ventana
2. Empezá a escribir el nombre de cualquier función: `fil`, `ma`, `fol`, `tak`...
3. Deberías ver la lista de sugerencias de IntelliSense aparecer automáticamente
4. Cada sugerencia muestra la firma de tipo a la derecha
5. Al hacer clic en una sugerencia (o presionar Tab/Enter), se despliega la documentación completa a la derecha del panel

Si IntelliSense no aparece solo, presioná `Ctrl+Space` (`Cmd+Space` en Mac) para invocarlo manualmente.

### 5. Verificar el hover

1. En cualquier archivo `.m`, posicioná el cursor sobre el nombre de una función del Preludio (por ejemplo, sobre `filter` en `example.en.m`)
2. Después de un momento aparece un tooltip con:
   - La firma de tipo en un bloque de código
   - La descripción en el idioma activo (inglés por defecto)
   - Ejemplos de uso

Para probar español: configurá `"miranda-preludio.documentationLanguage": "es"` en settings, o ejecutá VS Code con `"locale": "es"`.

### 6. Verificar que el auto-cierre de brackets funciona

1. En un archivo `.m`, escribí `[` — debería cerrarse solo como `[]`
2. Escribí `(` — debería cerrarse solo como `()`
3. Escribí `"` — debería cerrarse solo como `""`
4. Escribí `||` seguido de texto — toda la línea debería quedar en color de comentario
