|| ============================================================
|| example.en.m — file to test the miranda-preludio extension
|| ============================================================
||
|| How to use this file:
||   1. Open this file in VS Code with the extension active (F5 from the project)
||   2. Check syntax highlighting
||   3. Type a Prelude function name and try autocompletion
||   4. Hover over any function name to see documentation
|| ============================================================


|| ── Lists ────────────────────────────────────────────────────

|| hd and tl split the head and tail of a list
cabeza = hd [10, 20, 30]          || result: 10
cola   = tl [10, 20, 30]          || result: [20, 30]

|| take and drop the first n elements
primerosTres = take 3 [1..10]     || result: [1, 2, 3]
sinPrimeros  = drop 3 [1..5]      || result: [4, 5]

|| map applies a function to each element
dobles = map (*2) [1, 2, 3, 4, 5] || result: [2, 4, 6, 8, 10]

|| filter keeps elements that satisfy the condition
pares = filter even [1..10]        || result: [2, 4, 6, 8, 10]

|| foldl accumulates left to right
sumatoria = foldl (+) 0 [1..5]    || result: 15

|| foldr folds right to left
concatenado = foldr (:) [] [1,2,3] || result: [1, 2, 3]

|| reverse inverts the list
invertida = reverse [1, 2, 3, 4]   || result: [4, 3, 2, 1]

|| sort orders ascending
ordenada = sort [5, 1, 4, 2, 3]   || result: [1, 2, 3, 4, 5]

|| zip2 pairs two lists
pares2 = zip2 [1, 2, 3] ['a', 'b', 'c']  || result: [(1,'a'),(2,'b'),(3,'c')]

|| takewhile and dropwhile by predicate
menoresQue4 = takewhile (<4) [1..10]   || result: [1, 2, 3]
desdeEl4    = dropwhile (<4) [1..6]    || result: [4, 5, 6]

|| member checks membership
esta = member [1, 2, 3] 2   || result: True
noEsta = member [1, 2, 3] 5 || result: False

|| concat flattens a list of lists
aplanada = concat [[1,2], [3], [4,5]]  || result: [1, 2, 3, 4, 5]

|| last and init are the opposite end of hd/tl
ultimo  = last [1, 2, 3]   || result: 3
sinUltimo = init [1, 2, 3] || result: [1, 2]

|| sum and product reduce numerically
total    = sum [1..10]       || result: 55
producto = product [1..5]    || result: 120

|| max and min over lists
mayor = max [3, 1, 4, 1, 5] || result: 5
menor = min [3, 1, 4, 1, 5] || result: 1

|| mkset removes duplicates
sinDuplicados = mkset [1, 2, 1, 3, 2, 4]  || result: [1, 2, 3, 4]

|| iterate builds an infinite list by repeated application
potencias = take 6 (iterate (*2) 1)  || result: [1, 2, 4, 8, 16, 32]

|| repeat and rep build lists of the same value
infinitoCeros = take 4 (repeat 0)   || result: [0, 0, 0, 0]
cincoEes      = rep 5 'e'           || result: "eeeee"


|| ── Arithmetic ───────────────────────────────────────────────

valorAbsoluto = abs (-7)    || result: 7
esPar  = even 4             || result: True
esImpar = odd 3             || result: True
esEntero = integer 3.0      || result: True
piso = entier 3.7           || result: 3
raiz = sqrt 16.0            || result: 4.0
maximo2 = max2 8 3          || result: 8
minimo2 = min2 8 3          || result: 3
mcd = gcd 12 8              || result: 4
mcm = lcm 4 6               || result: 12
resta = subtract 3 10       || result: 7
seno = sin 0.0              || result: 0.0
coseno = cos 0.0            || result: 1.0
logaritmo = log 1.0         || result: 0.0
exponencial = exp 1         || result: 2.71828...
piAprox = pi                || result: 3.14159...


|| ── Characters and strings ───────────────────────────────────

ascii = code 'A'            || result: 65
caracter = decode 65        || result: 'A'
esDigito = digit '7'        || result: True
esLetra = letter 'z'        || result: True
numStr = shownum 42         || result: "42"
strNum = numval "3.14"      || result: 3.14
centrado = cjustify 10 "hi" || result: "    hi    "
izquierda = ljustify 8 "ok" || result: "ok      "
derecha   = rjustify 8 "ok" || result: "      ok"
espacios  = spaces 5        || result: "     "
lineas    = lines "a\nb\nc" || result: ["a","b","c"]


|| ── Tuples ───────────────────────────────────────────────────

primero  = fst (42, "hola")  || result: 42
segundo  = snd (42, "hola")  || result: "hola"


|| ── Combinators ──────────────────────────────────────────────

identidad = id 99            || result: 99
siempre5  = const 5 "x"     || result: 5

|| until applies f until the predicate holds
millar = until (>1000) (*2) 1   || result: 1024

|| converse swaps the argument order of a binary function
restaInv = converse (-) 3 10    || result: 7


|| ── User-defined function (not from the Prelude) ───────────────
|| Its name uses the theme's default color,
|| distinct from Prelude functions above.

cuadrado n = n * n

listaAlCuadrado xs = map cuadrado xs

resultado = listaAlCuadrado [1, 2, 3, 4, 5]  || result: [1, 4, 9, 16, 25]
