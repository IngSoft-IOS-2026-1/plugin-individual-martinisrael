export type CategoryKey =
    | 'lists'
    | 'arithmetic'
    | 'characters'
    | 'combinators'
    | 'system'
    | 'tuples';

export interface PreludeBaseEntry {
    name: string;
    signature: string;
    categoryKey: CategoryKey;
    examples?: string[];
}

export const preludeBase: PreludeBaseEntry[] = [
    // ── Lists ──
    {
        name: 'hd', 
        signature: 'hd :: [*] -> *', 
        categoryKey: 'lists',
        examples: ['hd [1,2,3]  ||  1', 'hd "abc"    ||  \'a\''],
    },
    {
        name: 'tl', 
        signature: 'tl :: [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['tl [1,2,3]  ||  [2,3]', 'tl "abc"    ||  "bc"'],
    },
    {
        name: '#', 
        signature: '# :: [*] -> num', 
        categoryKey: 'lists',
        examples: ['# [1,2,3]  ||  3', '# []       ||  0', '# "abc"    ||  3'],
    },
    {
        name: 'reverse', 
        signature: 'reverse :: [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['reverse [1,2,3]  ||  [3,2,1]'],
    },
    {
        name: 'concat', 
        signature: 'concat :: [[*]] -> [*]', 
        categoryKey: 'lists',
        examples: ['concat [[1,2],[3],[4,5]]  ||  [1,2,3,4,5]'],
    },
    {
        name: 'map', 
        signature: 'map :: (* -> **) -> [*] -> [**]', 
        categoryKey: 'lists',
        examples: ['map (*2) [1,2,3]  ||  [2,4,6]', 'map hd [[1,2],[3,4]]  ||  [1,3]'],
    },
    {
        name: 'filter', 
        signature: 'filter :: (* -> bool) -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['filter even [1..6]  ||  [2,4,6]', 'filter (>3) [1..5]  ||  [4,5]'],
    },
    {
        name: 'foldl', 
        signature: 'foldl :: (** -> * -> **) -> ** -> [*] -> **', 
        categoryKey: 'lists',
        examples: ['foldl (+) 0 [1,2,3]  ||  6', 'foldl (-) 10 [1,2,3]  ||  4'],
    },
    {
        name: 'foldr', 
        signature: 'foldr :: (* -> ** -> **) -> ** -> [*] -> **', 
        categoryKey: 'lists',
        examples: ['foldr (+) 0 [1,2,3]  ||  6', 'foldr (:) [] [1,2,3]  ||  [1,2,3]'],
    },
    {
        name: 'foldl1', 
        signature: 'foldl1 :: (* -> * -> *) -> [*] -> *', 
        categoryKey: 'lists',
        examples: ['foldl1 (+) [1,2,3]  ||  6', 'foldl1 max [3,1,4,1,5]  ||  5'],
    },
    {
        name: 'foldr1', 
        signature: 'foldr1 :: (* -> * -> *) -> [*] -> *', 
        categoryKey: 'lists',
        examples: ['foldr1 (+) [1,2,3]  ||  6'],
    },
    {
        name: 'scan', 
        signature: 'scan :: (* -> ** -> *) -> * -> [**] -> [*]', 
        categoryKey: 'lists',
        examples: ['scan (+) 0 [1,2,3]  ||  [0,1,3,6]'],
    },
    {
        name: 'take', 
        signature: 'take :: num -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['take 3 [1..10]  ||  [1,2,3]', 'take 0 [1,2]    ||  []'],
    },
    {
        name: 'drop', 
        signature: 'drop :: num -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['drop 3 [1..5]  ||  [4,5]', 'drop 0 [1,2]   ||  [1,2]'],
    },
    {
        name: 'takewhile', 
        signature: 'takewhile :: (* -> bool) -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['takewhile even [2,4,1,6]  ||  [2,4]', 'takewhile (<3) [1..5]   ||  [1,2]'],
    },
    {
        name: 'dropwhile', 
        signature: 'dropwhile :: (* -> bool) -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['dropwhile even [2,4,1,6]  ||  [1,6]'],
    },
    {
        name: 'zip2', 
        signature: 'zip2 :: [*] -> [**] -> [(*,**)]', 
        categoryKey: 'lists',
        examples: ['zip2 [0,1,2,3] "type"  ||  [(0,\'t\'),(1,\'y\'),(2,\'p\'),(3,\'e\')]'],
    },
    {
        name: 'zip', 
        signature: 'zip :: ([*],[**]) -> [(*,**)]', 
        categoryKey: 'lists',
        examples: ['zip ([1,2,3],"abc")  ||  [(1,\'a\'),(2,\'b\'),(3,\'c\')]'],
    },
    {
        name: 'map2', 
        signature: 'map2 :: (* -> ** -> ***) -> [*] -> [**] -> [***]', 
        categoryKey: 'lists',
        examples: ['map2 (+) [1,2,3] [4,5,6]  ||  [5,7,9]'],
    },
    {
        name: 'zip3', 
        signature: 'zip3 :: [*] -> [**] -> [***] -> [(*,**,***)]', 
        categoryKey: 'lists',
        examples: ['zip3 [1,2] "ab" [True,False]  ||  [(1,\'a\',True),(2,\'b\',False)]'],
    },
    {
        name: 'zip4', 
        signature: 'zip4 :: [*] -> [**] -> [***] -> [****] -> [(*,**,***,****)]', 
        categoryKey: 'lists',
    },
    {
        name: 'zip5', 
        signature: 'zip5 :: [*] -> [**] -> [***] -> [****] -> [*****] -> [(*,**,***,****,*****)]', 
        categoryKey: 'lists',
    },
    {
        name: 'zip6', 
        signature: 'zip6 :: [*] -> [**] -> [***] -> [****] -> [*****] -> [******] -> [(*,**,***,****,*****,******)]', 
        categoryKey: 'lists',
    },
    {
        name: 'transpose', 
        signature: 'transpose :: [[*]] -> [[*]]', 
        categoryKey: 'lists',
        examples: ['transpose [[1,2,3],[4,5,6]]  ||  [[1,4],[2,5],[3,6]]'],
    },
    {
        name: 'iterate', 
        signature: 'iterate :: (* -> *) -> * -> [*]', 
        categoryKey: 'lists',
        examples: ['take 5 (iterate (*2) 1)  ||  [1,2,4,8,16]'],
    },
    {
        name: 'repeat', 
        signature: 'repeat :: * -> [*]', 
        categoryKey: 'lists',
        examples: ['take 4 (repeat 0)  ||  [0,0,0,0]'],
    },
    {
        name: 'rep', 
        signature: 'rep :: num -> * -> [*]', 
        categoryKey: 'lists',
        examples: ['rep 6 \'o\'  ||  "oooooo"'],
    },
    {
        name: 'postfix', 
        signature: 'postfix :: * -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['postfix 3 [1,2]  ||  [1,2,3]'],
    },
    {
        name: 'member', 
        signature: 'member :: [*] -> * -> bool', 
        categoryKey: 'lists',
        examples: ['member [1,2,3] 2  ||  True', 'member [1,2,3] 5  ||  False'],
    },
    {
        name: 'index', 
        signature: 'index :: [*] -> [num]', 
        categoryKey: 'lists',
        examples: ['index "hi"     ||  [0,1]', 'index "hippopotamus"  ||  [0..11]'],
    },
    {
        name: 'mkset', 
        signature: 'mkset :: [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['mkset [1,2,1,3,2]  ||  [1,2,3]'],
    },
    {
        name: 'sort', 
        signature: 'sort :: [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['sort [3,1,4,1,5]  ||  [1,1,3,4,5]'],
    },
    {
        name: 'merge', 
        signature: 'merge :: [*] -> [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['merge [1,3,5] [2,4,6]  ||  [1,2,3,4,5,6]'],
    },
    {
        name: 'last', 
        signature: 'last :: [*] -> *', 
        categoryKey: 'lists',
        examples: ['last [1,2,3]  ||  3'],
    },
    {
        name: 'init', 
        signature: 'init :: [*] -> [*]', 
        categoryKey: 'lists',
        examples: ['init [1,2,3]  ||  [1,2]'],
    },
    {
        name: 'sum', 
        signature: 'sum :: [num] -> num', 
        categoryKey: 'lists',
        examples: ['sum [1,2,3,4]  ||  10'],
    },
    {
        name: 'product', 
        signature: 'product :: [num] -> num', 
        categoryKey: 'lists',
        examples: ['product [1,2,3,4]  ||  24'],
    },
    {
        name: 'max', 
        signature: 'max :: [*] -> *', 
        categoryKey: 'lists',
        examples: ['max [1,2,12,-6,5]  ||  12', 'max "hippopotamus"  ||  \'u\''],
    },
    {
        name: 'min', 
        signature: 'min :: [*] -> *', 
        categoryKey: 'lists',
        examples: ['min [3,1,4,1,5]  ||  1'],
    },
    {
        name: 'and', 
        signature: 'and :: [bool] -> bool', 
        categoryKey: 'lists',
        examples: ['and [True,True,True]   ||  True', 'and [True,False,True]  ||  False'],
    },
    {
        name: 'or', 
        signature: 'or :: [bool] -> bool', 
        categoryKey: 'lists',
        examples: ['or [False,True,False]  ||  True', 'or [False,False]       ||  False'],
    },
    // ── Arithmetic ──
    {
        name: 'abs', 
        signature: 'abs :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['abs (-5)  ||  5', 'abs 3     ||  3'],
    },
    {
        name: 'max2', 
        signature: 'max2 :: * -> * -> *', 
        categoryKey: 'arithmetic',
        examples: ['max2 3 5  ||  5', 'max2 \'b\' \'a\'  ||  \'b\''],
    },
    {
        name: 'min2', 
        signature: 'min2 :: * -> * -> *', 
        categoryKey: 'arithmetic',
        examples: ['min2 3 5  ||  3'],
    },
    {
        name: 'gcd', 
        signature: 'gcd :: num -> num -> num', 
        categoryKey: 'arithmetic',
        examples: ['gcd 12 8  ||  4', 'gcd 7 3   ||  1'],
    },
    {
        name: 'neg', 
        signature: 'neg :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['neg 5  ||  -5'],
    },
    {
        name: 'subtract', 
        signature: 'subtract :: num -> num -> num', 
        categoryKey: 'arithmetic',
        examples: ['subtract 3 10  ||  7'],
    },
    {
        name: 'lcm', 
        signature: 'lcm :: num -> num -> num', 
        categoryKey: 'arithmetic',
        examples: ['lcm 4 6  ||  12'],
    },
    {
        name: 'even', 
        signature: 'even :: num -> bool', 
        categoryKey: 'arithmetic',
        examples: ['even 4  ||  True', 'even 3  ||  False'],
    },
    {
        name: 'odd', 
        signature: 'odd :: num -> bool', 
        categoryKey: 'arithmetic',
        examples: ['odd 3  ||  True', 'odd 4  ||  False'],
    },
    {
        name: 'integer', 
        signature: 'integer :: num -> bool', 
        categoryKey: 'arithmetic',
        examples: ['integer 3.0  ||  True', 'integer 3.5  ||  False'],
    },
    {
        name: 'entier', 
        signature: 'entier :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['entier 3.7   ||  3', 'entier (-1.2)  ||  -2'],
    },
    {
        name: 'sqrt', 
        signature: 'sqrt :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['sqrt 9.0   ||  3.0', 'sqrt 2.0   ||  1.4142...'],
    },
    {
        name: 'exp', 
        signature: 'exp :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['exp 1  ||  2.71828...', 'exp 0  ||  1.0'],
    },
    {
        name: 'e', 
        signature: 'e :: num', 
        categoryKey: 'arithmetic',
    },
    {
        name: 'log', 
        signature: 'log :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['log 1.0      ||  0.0', 'log (exp 1)  ||  1.0'],
    },
    {
        name: 'log10', 
        signature: 'log10 :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['log10 100.0  ||  2.0', 'log10 1.0    ||  0.0'],
    },
    {
        name: 'sin', 
        signature: 'sin :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['sin 0.0   ||  0.0', 'sin (pi/2)  ||  1.0'],
    },
    {
        name: 'cos', 
        signature: 'cos :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['cos 0.0  ||  1.0', 'cos pi   ||  -1.0'],
    },
    {
        name: 'tan', 
        signature: 'tan :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['tan 0.0     ||  0.0', 'tan (pi/4)  ||  1.0'],
    },
    {
        name: 'arctan', 
        signature: 'arctan :: num -> num', 
        categoryKey: 'arithmetic',
        examples: ['arctan 1.0  ||  0.7853... (π/4)', 'pi = 4*arctan 1'],
    },
    {
        name: 'pi', 
        signature: 'pi :: num', 
        categoryKey: 'arithmetic',
        examples: ['pi  ||  3.14159265...'],
    },
    {
        name: 'hugenum', 
        signature: 'hugenum :: num', 
        categoryKey: 'arithmetic',
    },
    {
        name: 'tinynum', 
        signature: 'tinynum :: num', 
        categoryKey: 'arithmetic',
    },
    // ── Characters ──
    {
        name: 'code', 
        signature: 'code :: char -> num', 
        categoryKey: 'characters',
        examples: ['code \'A\'  ||  65', 'code \'a\'  ||  97'],
    },
    {
        name: 'decode', 
        signature: 'decode :: num -> char', 
        categoryKey: 'characters',
        examples: ['decode 65  ||  \'A\'', 'decode 97  ||  \'a\''],
    },
    {
        name: 'digit', 
        signature: 'digit :: char -> bool', 
        categoryKey: 'characters',
        examples: ['digit \'3\'  ||  True', 'digit \'a\'  ||  False'],
    },
    {
        name: 'letter', 
        signature: 'letter :: char -> bool', 
        categoryKey: 'characters',
        examples: ['letter \'a\'  ||  True', 'letter \'1\'  ||  False'],
    },
    {
        name: 'spaces', 
        signature: 'spaces :: num -> [char]', 
        categoryKey: 'characters',
        examples: ['spaces 3  ||  "   "'],
    },
    {
        name: 'lay', 
        signature: 'lay :: [[char]] -> [char]', 
        categoryKey: 'characters',
        examples: ['lay ["hola","mundo"]  ||  "hola\\\\nmundo\\\\n"'],
    },
    {
        name: 'layn', 
        signature: 'layn :: [[char]] -> [char]', 
        categoryKey: 'characters',
        examples: ['layn ["a","b"]  ||  " 1) a\\\\n 2) b\\\\n"'],
    },
    {
        name: 'lines', 
        signature: 'lines :: [char] -> [[char]]', 
        categoryKey: 'characters',
        examples: ['lines "a\\\\nb\\\\nc"  ||  ["a","b","c"]'],
    },
    {
        name: 'cjustify', 
        signature: 'cjustify :: num -> [char] -> [char]', 
        categoryKey: 'characters',
        examples: ['cjustify 5 "hi"  ||  " hi "'],
    },
    {
        name: 'ljustify', 
        signature: 'ljustify :: num -> [char] -> [char]', 
        categoryKey: 'characters',
        examples: ['ljustify 5 "hi"  ||  "hi   "'],
    },
    {
        name: 'rjustify', 
        signature: 'rjustify :: num -> [char] -> [char]', 
        categoryKey: 'characters',
        examples: ['rjustify 5 "hi"  ||  "   hi"'],
    },
    {
        name: 'numval', 
        signature: 'numval :: [char] -> num', 
        categoryKey: 'characters',
        examples: ['numval "42"    ||  42', 'numval "3.14"  ||  3.14'],
    },
    {
        name: 'shownum', 
        signature: 'shownum :: num -> [char]', 
        categoryKey: 'characters',
        examples: ['shownum 42    ||  "42"', 'shownum 3.14  ||  "3.14"'],
    },
    {
        name: 'showfloat', 
        signature: 'showfloat :: num -> num -> [char]', 
        categoryKey: 'characters',
        examples: ['showfloat 2 3.14159  ||  "3.14"'],
    },
    {
        name: 'showscaled', 
        signature: 'showscaled :: num -> num -> [char]', 
        categoryKey: 'characters',
        examples: ['showscaled 2 1234.5  ||  cadena estilo "1.23e+03"'],
    },
    {
        name: 'show', 
        signature: 'show :: * -> [char]', 
        categoryKey: 'characters',
        examples: ['show 42      ||  "42"', 'show [1,2,3]  ||  "[1,2,3]"'],
    },
    // ── Combinators ──
    {
        name: 'id', 
        signature: 'id :: * -> *', 
        categoryKey: 'combinators',
        examples: ['id 42       ||  42', 'id "hello"  ||  "hello"'],
    },
    {
        name: 'const', 
        signature: 'const :: * -> ** -> *', 
        categoryKey: 'combinators',
        examples: ['const 5 "x"    ||  5', 'map (const 0) [1,2,3]  ||  [0,0,0]'],
    },
    {
        name: 'converse', 
        signature: 'converse :: (* -> ** -> ***) -> ** -> * -> ***', 
        categoryKey: 'combinators',
        examples: ['converse (-) 3 10  ||  7'],
    },
    {
        name: 'until', 
        signature: 'until :: (* -> bool) -> (* -> *) -> * -> *', 
        categoryKey: 'combinators',
        examples: ['until (>1000) (*2) 1  ||  1024'],
    },
    {
        name: 'limit', 
        signature: 'limit :: [*] -> *', 
        categoryKey: 'combinators',
        examples: ['limit [x | x <- 2, 0.5*(x + 2/x) .. ]  ||  raíz de 2'],
    },
    {
        name: 'seq', 
        signature: 'seq :: * -> ** -> **', 
        categoryKey: 'combinators',
    },
    {
        name: 'force', 
        signature: 'force :: * -> *', 
        categoryKey: 'combinators',
        examples: ['hd (force x)'],
    },
    {
        name: 'undef', 
        signature: 'undef :: *', 
        categoryKey: 'combinators',
    },
    {
        name: 'error', 
        signature: 'error :: [char] -> *', 
        categoryKey: 'combinators',
        examples: ['error "índice fuera de rango"'],
    },
    // ── System ──
    {
        name: 'read', 
        signature: 'read :: [char] -> [char]', 
        categoryKey: 'system',
    },
    {
        name: 'filemode', 
        signature: 'filemode :: [char] -> [char]', 
        categoryKey: 'system',
    },
    {
        name: 'getenv', 
        signature: 'getenv :: [char] -> [char]', 
        categoryKey: 'system',
        examples: ['getenv "HOME"'],
    },
    {
        name: 'system', 
        signature: 'system :: [char] -> ([char],[char],num)', 
        categoryKey: 'system',
    },
    // ── Tuples ──
    {
        name: 'fst', 
        signature: 'fst :: (*,**) -> *', 
        categoryKey: 'tuples',
        examples: ['fst (1,2)    ||  1', 'fst ("a",3)  ||  "a"'],
    },
    {
        name: 'snd', 
        signature: 'snd :: (*,**) -> **', 
        categoryKey: 'tuples',
        examples: ['snd (1,2)    ||  2', 'snd ("a",3)  ||  3'],
    },
];
