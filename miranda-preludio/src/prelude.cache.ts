import type { PreludeBaseEntry } from './prelude.base';
import { preludeBase } from './prelude.base';
import { preludeTexts as preludeTextsEn } from './prelude.en';
import { preludeTexts as preludeTextsEs } from './prelude.es';

export type DocLocale = 'en' | 'es';
export type PreludeTexts = Record<string, { description: string }>;

export interface PreludeEntry extends PreludeBaseEntry {
    description: string;
}

const textsByLocale: Record<DocLocale, PreludeTexts> = {
    en: preludeTextsEn,
    es: preludeTextsEs,
};

export function mergePrelude(locale: DocLocale): PreludeEntry[] {
    const texts = textsByLocale[locale];
    return preludeBase.map(entry => {
        const text = texts[entry.name];
        const description = text?.description ?? textsByLocale.en[entry.name]?.description ?? '';
        return { ...entry, description };
    });
}

let cachedLocale: DocLocale | undefined;
let cachedPrelude: PreludeEntry[] = [];

export function getPreludeForLocale(locale: DocLocale): PreludeEntry[] {
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

export function lookupEntryForLocale(name: string, locale: DocLocale): PreludeEntry | undefined {
    return getPreludeForLocale(locale).find(e => e.name === name);
}
