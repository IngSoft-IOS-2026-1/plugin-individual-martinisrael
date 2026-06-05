import * as vscode from 'vscode';

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

export const uiStrings: Record<DocLocale, { examplesLabel: string }> = {
    en: { examplesLabel: 'Examples' },
    es: { examplesLabel: 'Ejemplos' },
};
