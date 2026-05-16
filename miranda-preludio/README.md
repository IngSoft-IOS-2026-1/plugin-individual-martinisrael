# miranda-preludio

Extensión de VS Code que mejora la experiencia al escribir código en **Miranda**, enfocándose en las funciones del Preludio estándar (la librería incorporada del lenguaje).

## Funcionalidades

### Resaltado de sintaxis

Los archivos `.m` se colorean automáticamente. Las funciones del Preludio (`map`, `filter`, `sort`, `hd`, `foldl`, etc.) aparecen en un color distinto al del código definido por el usuario, lo que permite distinguir de un vistazo qué pertenece a la librería estándar y qué es propio del programa.

![Resaltado de sintaxis y hover](images/hover.png)

### Autocompletado

Al empezar a escribir el nombre de cualquier función del Preludio, IntelliSense sugiere las coincidencias con su firma de tipo. Al seleccionar una sugerencia, se despliega la documentación completa con descripción y ejemplos.

![Autocompletado con documentación](images/autocompletado.png)

### Hover con documentación

Al posicionar el cursor sobre una función del Preludio aparece un tooltip con:
- La firma de tipo en notación Miranda
- Una descripción de lo que hace la función
- Ejemplos concretos de uso con su resultado

## Funciones cubiertas

La extensión incluye documentación para más de 80 funciones del Preludio estándar de Miranda, organizadas en las siguientes categorías:

| Categoría | Ejemplos |
|---|---|
| Listas | `hd`, `tl`, `map`, `filter`, `foldl`, `foldr`, `sort`, `zip2`, `take`, `drop` |
| Aritmética | `abs`, `sqrt`, `even`, `odd`, `gcd`, `lcm`, `entier`, `sin`, `cos`, `pi` |
| Caracteres y cadenas | `code`, `decode`, `digit`, `letter`, `shownum`, `numval`, `lines`, `spaces` |
| Combinadores | `id`, `const`, `converse`, `until`, `limit`, `force`, `error` |
| Tuplas | `fst`, `snd` |
| Sistema | `read`, `getenv`, `system` |

## Uso

La extensión se activa automáticamente al abrir cualquier archivo con extensión `.m`.

- **Autocompletado:** empezá a escribir el nombre de una función — las sugerencias aparecen solas. Si no, presioná `Ctrl+Space` (`Cmd+Space` en Mac).
- **Hover:** posicioná el cursor sobre cualquier función del Preludio y esperá un momento.
- **Comentarios:** el atajo de comentar línea inserta `||` (la sintaxis de Miranda).
- **Brackets:** `[`, `(` y `"` se cierran automáticamente.

## Requisitos

- Visual Studio Code 1.118.0 o superior
- Archivos Miranda con extensión `.m`

## Notas de versión

### 0.0.1

Versión inicial. Incluye resaltado de sintaxis, autocompletado y hover documentation para todas las funciones del Preludio estándar de Miranda.
