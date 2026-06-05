import * as vscode from 'vscode';
import type { DocLocale } from './prelude.cache';
import { uiStrings } from './ui-strings';

export function getDocumentationLocale(): DocLocale {
    const override = vscode.workspace
        .getConfiguration('miranda-preludio')
        .get<'auto' | DocLocale>('documentationLanguage', 'auto');
    if (override !== 'auto') {
        return override;
    }
    return vscode.env.language.startsWith('es') ? 'es' : 'en';
}

export { uiStrings } from './ui-strings';
