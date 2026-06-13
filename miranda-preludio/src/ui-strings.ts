import type { CategoryKey } from './prelude.base';
import type { DocLocale } from './prelude.cache';

const categoryLabels: Record<DocLocale, Record<CategoryKey, string>> = {
    en: {
        lists: 'Lists',
        arithmetic: 'Arithmetic',
        characters: 'Characters and strings',
        combinators: 'Combinators',
        system: 'System',
        tuples: 'Tuples',
    },
    es: {
        lists: 'Listas',
        arithmetic: 'Aritmética',
        characters: 'Caracteres y cadenas',
        combinators: 'Combinadores',
        system: 'Sistema',
        tuples: 'Tuplas',
    },
};

export const uiStrings: Record<
    DocLocale,
    { examplesLabel: string; categoryLabel: (key: CategoryKey) => string }
> = {
    en: {
        examplesLabel: 'Examples',
        categoryLabel: key => categoryLabels.en[key],
    },
    es: {
        examplesLabel: 'Ejemplos',
        categoryLabel: key => categoryLabels.es[key],
    },
};
