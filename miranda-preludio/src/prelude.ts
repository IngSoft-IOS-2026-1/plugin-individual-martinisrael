import type { PreludeBaseEntry } from './prelude.base';
import { preludeBase } from './prelude.base';
import { preludeTexts as preludeTextsEn } from './prelude.en';
import { preludeTexts as preludeTextsEs } from './prelude.es';
import { getDocumentationLocale, type DocLocale } from './locale';

export type PreludeTexts = Record<string, { description: string }>;

export interface PreludeEntry extends PreludeBaseEntry {
    description: string;
}

const textsByLocale: Record<DocLocale, PreludeTexts> = {
    en: preludeTextsEn,
    es: preludeTextsEs,
};

function mergePrelude(locale: DocLocale): PreludeEntry[] {
    const texts = textsByLocale[locale];
    return preludeBase.map(entry => {
        const text = texts[entry.name];
        const description = text?.description ?? textsByLocale.en[entry.name]?.description ?? '';
        return { ...entry, description };
    });
}

let cachedLocale: DocLocale | undefined;
let cachedPrelude: PreludeEntry[] = [];

export function getPrelude(): PreludeEntry[] {
    const locale = getDocumentationLocale();
    if (locale !== cachedLocale) {
        cachedLocale = locale;
        cachedPrelude = mergePrelude(locale);
    }
    return cachedPrelude;
}

export function invalidatePreludeCache(): void {
    cachedLocale = undefined;
    cachedPrelude = [];
}

export const preludeNames: string[] = preludeBase.map(e => e.name);

export function lookupEntry(name: string): PreludeEntry | undefined {
    return getPrelude().find(e => e.name === name);
}
