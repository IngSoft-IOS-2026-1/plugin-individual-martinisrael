# Cómo funciona el plugin miranda-preludio

Este documento explica de forma accesible qué hace el plugin, qué herramientas se usaron y cómo cada parte contribuye al resultado final. No es necesario conocer Miranda ni haber desarrollado extensiones de VS Code antes.

---

## El problema que resuelve

Miranda es un lenguaje de programación funcional que tiene una librería estándar llamada el **Preludio**. Esa librería incluye más de 80 funciones incorporadas (como `map`, `filter`, `sort`, `hd`, etc.) que el programador puede usar directamente.

El problema es que VS Code no conoce Miranda: no sabe que existe, no entiende su sintaxis y no puede distinguir si una palabra es una función de la librería estándar o una función que escribió el programador.

El plugin soluciona eso en tres frentes:
1. Resalta las funciones del Preludio en un color diferente al del código propio
2. Sugiere funciones automáticamente mientras se escribe
3. Muestra la firma y documentación de cada función al pasar el mouse

---

## Las piezas del plugin

### `src/prelude.ts` — el catálogo de funciones

Este archivo es la base de todo. Contiene una lista con cada función del Preludio de Miranda, y para cada una guarda:

- **nombre** — cómo se llama la función (ej. `filter`)
- **firma de tipo** — qué recibe y qué devuelve, en la notación propia de Miranda (ej. `filter :: (* -> bool) -> [*] -> [*]`)
- **descripción** — qué hace, escrita en español
- **categoría** — Listas, Aritmética, Caracteres, etc.
- **ejemplos** — casos concretos de uso con resultado

Este catálogo lo usan las dos partes siguientes del plugin.

---

### `syntaxes/miranda.tmLanguage.json` — el resaltado de sintaxis

VS Code usa un sistema llamado **TextMate grammars** para colorear el código. Es básicamente un conjunto de reglas que dicen: "si ves esto, pintalo de este color".

Las reglas se escriben en un archivo JSON con expresiones regulares. Por ejemplo:

- Todo lo que empieza con `||` hasta el final de la línea → color de comentario
- Todo lo que está entre comillas dobles → color de string
- Las palabras `if`, `where`, `let`, `True`, `False`, etc. → color de palabra clave
- Los nombres exactos de las funciones del Preludio (`map`, `filter`, `sort`, ...) → color de función de librería estándar

El color que ve el programador depende del **tema** que tenga instalado en VS Code. El plugin le dice a VS Code *qué tipo de cosa es* cada fragmento de código (un comentario, una keyword, una función de librería), y el tema decide *de qué color* mostrarlo. Por eso el resaltado se adapta automáticamente al tema claro u oscuro que tenga el usuario.

**El punto clave:** las funciones del Preludio reciben la categoría `support.function` (función de soporte/librería), que los temas colorean diferente a las funciones definidas por el usuario. Eso hace que `map` o `filter` se vean distintos a `cuadrado` o `listaAlCuadrado`.

---

### `language-configuration.json` — comportamiento del editor

Este archivo le enseña a VS Code algunos comportamientos básicos del lenguaje:

- **Comentarios:** en Miranda los comentarios empiezan con `||`, así que al presionar el atajo de "comentar línea" VS Code inserta `||` en lugar de `//` o `#`
- **Brackets:** al escribir `[` se cierra solo con `]`; lo mismo con `(` y con las comillas
- **Indentación:** ayuda a que el editor indente automáticamente en ciertos contextos

---

### `package.json` — el manifiesto de la extensión

Es el archivo de configuración central. Le dice a VS Code:

- **Qué archivos abre este plugin:** los archivos con extensión `.m` son Miranda
- **Qué gramática usar:** apunta al archivo `miranda.tmLanguage.json` para el resaltado
- **Qué configuración de lenguaje usar:** apunta a `language-configuration.json`

Sin este archivo, VS Code no sabría que existe el lenguaje Miranda ni cuándo activar el plugin.

---

### `src/extension.ts` — la lógica del plugin

Este es el código TypeScript que VS Code ejecuta cuando el plugin se activa. Registra dos **proveedores**:

#### Proveedor de autocompletado (`CompletionItemProvider`)

Cuando el usuario está escribiendo en un archivo `.m` y activa IntelliSense (automáticamente o con `Ctrl+Space`), este proveedor devuelve la lista completa de funciones del Preludio. Para cada función construye una sugerencia con:
- El nombre de la función como texto a insertar
- La firma de tipo como descripción corta (aparece a la derecha del nombre en la lista)
- La descripción y los ejemplos como documentación larga (aparece en el panel lateral)

#### Proveedor de hover (`HoverProvider`)

Cuando el usuario deja el cursor quieto sobre una palabra en un archivo `.m`, VS Code consulta a este proveedor si tiene algo que mostrar. El proveedor:
1. Lee la palabra bajo el cursor
2. La busca en el catálogo del Preludio
3. Si la encuentra, arma un tooltip con la firma, la descripción y los ejemplos
4. Si no la encuentra (porque es una función propia del usuario), no muestra nada

---

## Cómo encajan las piezas

```
archivo .m abierto en VS Code
        │
        ├─► TextMate grammar ──► resaltado de colores en tiempo real
        │
        ├─► CompletionItemProvider ──► sugerencias mientras se escribe
        │         └── consulta prelude.ts
        │
        └─► HoverProvider ──► tooltip al posicionar el cursor
                  └── consulta prelude.ts
```

El resaltado funciona sin que el plugin esté "corriendo": VS Code lo aplica directamente desde el archivo JSON de gramática. El autocompletado y el hover sí requieren que el código TypeScript esté activo, pero VS Code lo activa automáticamente cuando se abre cualquier archivo `.m`.

---

## Tecnologías usadas

| Tecnología | Para qué se usó |
|---|---|
| **TypeScript** | Lenguaje principal del plugin. Tipado estático que ayuda a no cometer errores al construir objetos que VS Code espera en formatos precisos. |
| **VS Code Extension API** | La interfaz oficial que expone VS Code para que los plugins registren proveedores, comandos y configuraciones. |
| **TextMate Grammars** | Sistema estándar de resaltado de sintaxis que usan VS Code, Sublime Text y otros editores. Se definen en JSON con expresiones regulares. |
| **Yeoman (`yo code`)** | Generador que arma el esqueleto inicial del proyecto con todos los archivos de configuración necesarios. |
| **Node.js / npm** | Entorno de ejecución y gestor de paquetes. El plugin se compila con el compilador de TypeScript (`tsc`) incluido como dependencia. |
