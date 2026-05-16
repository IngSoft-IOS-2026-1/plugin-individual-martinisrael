|| ============================================================
|| ejemplo.m — archivo para probar el plugin miranda-preludio
|| ============================================================
||
|| Cómo usar este archivo:
||   1. Abrí este archivo en VS Code con el plugin activo (F5 desde el proyecto)
||   2. Observá el resaltado de colores
||   3. Escribí el nombre de una función del Preludio y fijate el autocompletado
||   4. Posicioná el cursor sobre cualquier nombre de función para ver el hover
|| ============================================================


|| ── Listas ───────────────────────────────────────────────────

|| hd y tl separan la cabeza de la cola de una lista
cabeza = hd [10, 20, 30]          || resultado: 10
cola   = tl [10, 20, 30]          || resultado: [20, 30]

|| take y drop toman o descartan los primeros n elementos
primerosTres = take 3 [1..10]     || resultado: [1, 2, 3]
sinPrimeros  = drop 3 [1..5]      || resultado: [4, 5]

|| map aplica una función a cada elemento
dobles = map (*2) [1, 2, 3, 4, 5] || resultado: [2, 4, 6, 8, 10]

|| filter conserva solo los que cumplen la condición
pares = filter even [1..10]        || resultado: [2, 4, 6, 8, 10]

|| foldl acumula un resultado recorriendo la lista de izquierda a derecha
sumatoria = foldl (+) 0 [1..5]    || resultado: 15

|| foldr recorre de derecha a izquierda
concatenado = foldr (:) [] [1,2,3] || resultado: [1, 2, 3]

|| reverse invierte la lista
invertida = reverse [1, 2, 3, 4]   || resultado: [4, 3, 2, 1]

|| sort ordena en orden ascendente
ordenada = sort [5, 1, 4, 2, 3]   || resultado: [1, 2, 3, 4, 5]

|| zip2 combina dos listas en pares
pares2 = zip2 [1, 2, 3] ['a', 'b', 'c']  || resultado: [(1,'a'),(2,'b'),(3,'c')]

|| takewhile y dropwhile según un predicado
menoresQue4 = takewhile (<4) [1..10]   || resultado: [1, 2, 3]
desdeEl4    = dropwhile (<4) [1..6]    || resultado: [4, 5, 6]

|| member verifica pertenencia
esta = member [1, 2, 3] 2   || resultado: True
noEsta = member [1, 2, 3] 5 || resultado: False

|| concat aplana una lista de listas
aplanada = concat [[1,2], [3], [4,5]]  || resultado: [1, 2, 3, 4, 5]

|| last e init devuelven el extremo opuesto a hd/tl
ultimo  = last [1, 2, 3]   || resultado: 3
sinUltimo = init [1, 2, 3] || resultado: [1, 2]

|| sum y product reducen numéricamente
total    = sum [1..10]       || resultado: 55
producto = product [1..5]    || resultado: 120

|| max y min sobre listas
mayor = max [3, 1, 4, 1, 5] || resultado: 5
menor = min [3, 1, 4, 1, 5] || resultado: 1

|| mkset elimina duplicados
sinDuplicados = mkset [1, 2, 1, 3, 2, 4]  || resultado: [1, 2, 3, 4]

|| iterate genera una lista infinita aplicando f repetidamente
potencias = take 6 (iterate (*2) 1)  || resultado: [1, 2, 4, 8, 16, 32]

|| repeat y rep generan listas con el mismo valor
infinitoCeros = take 4 (repeat 0)   || resultado: [0, 0, 0, 0]
cincoEes      = rep 5 'e'           || resultado: "eeeee"


|| ── Aritmética ───────────────────────────────────────────────

valorAbsoluto = abs (-7)    || resultado: 7
esPar  = even 4             || resultado: True
esImpar = odd 3             || resultado: True
esEntero = integer 3.0      || resultado: True
piso = entier 3.7           || resultado: 3
raiz = sqrt 16.0            || resultado: 4.0
maximo2 = max2 8 3          || resultado: 8
minimo2 = min2 8 3          || resultado: 3
mcd = gcd 12 8              || resultado: 4
mcm = lcm 4 6               || resultado: 12
resta = subtract 3 10       || resultado: 7
seno = sin 0.0              || resultado: 0.0
coseno = cos 0.0            || resultado: 1.0
logaritmo = log 1.0         || resultado: 0.0
exponencial = exp 1         || resultado: 2.71828...
piAprox = pi                || resultado: 3.14159...


|| ── Caracteres y cadenas ──────────────────────────────────────

ascii = code 'A'            || resultado: 65
caracter = decode 65        || resultado: 'A'
esDigito = digit '7'        || resultado: True
esLetra = letter 'z'        || resultado: True
numStr = shownum 42         || resultado: "42"
strNum = numval "3.14"      || resultado: 3.14
centrado = cjustify 10 "hi" || resultado: "    hi    "
izquierda = ljustify 8 "ok" || resultado: "ok      "
derecha   = rjustify 8 "ok" || resultado: "      ok"
espacios  = spaces 5        || resultado: "     "
lineas    = lines "a\nb\nc" || resultado: ["a","b","c"]


|| ── Tuplas ────────────────────────────────────────────────────

primero  = fst (42, "hola")  || resultado: 42
segundo  = snd (42, "hola")  || resultado: "hola"


|| ── Combinadores ─────────────────────────────────────────────

identidad = id 99            || resultado: 99
siempre5  = const 5 "x"     || resultado: 5

|| until aplica f hasta que se cumpla el predicado
millar = until (>1000) (*2) 1   || resultado: 1024

|| converse invierte el orden de argumentos de una función binaria
restaInv = converse (-) 3 10    || resultado: 7


|| ── Función definida por el usuario (no es del Preludio) ─────
|| Su nombre aparece en el color por defecto del tema,
|| distinto al color de las funciones del Preludio de arriba.

cuadrado n = n * n

listaAlCuadrado xs = map cuadrado xs

resultado = listaAlCuadrado [1, 2, 3, 4, 5]  || resultado: [1, 4, 9, 16, 25]
