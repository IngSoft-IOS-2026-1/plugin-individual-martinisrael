import * as vscode from 'vscode';
import type { CategoryKey } from './prelude.base';

export type DocLocale = 'en' | 'es';

export function getDocumentationLocale(): DocLocale {
    const override = vscode.workspace
        .getConfiguration('miranda-preludio')
        .get<'auto' | DocLocale>('documentationLanguage', 'auto');
    if (override !== 'auto') {
        return override;
    }
    return vscode.env.language.startsWith('es') ? 'es' : 'en';
}

export const CATEGORIES: Record<CategoryKey, Record<DocLocale, string>> = {
    lists:       { en: 'Lists',       es: 'Listas' },
    arithmetic:  { en: 'Arithmetic',  es: 'Aritmética' },
    characters:  { en: 'Characters',  es: 'Caracteres' },
    combinators: { en: 'Combinators', es: 'Combinadores' },
    system:      { en: 'System',      es: 'Sistema' },
    tuples:      { en: 'Tuples',      es: 'Tuplas' },
};

export const uiStrings: Record<DocLocale, { examplesLabel: string }> = {
    en: { examplesLabel: 'Examples' },
    es: { examplesLabel: 'Ejemplos' },
};
