import { getDocumentationLocale } from './locale';
import {
    getPreludeForLocale,
    lookupEntryForLocale,
    type DocLocale,
    type PreludeEntry,
    type PreludeTexts,
} from './prelude.cache';

export type { DocLocale, PreludeEntry, PreludeTexts };
export {
    mergePrelude,
    getPreludeForLocale,
    invalidatePreludeCache,
    preludeNames,
    lookupEntryForLocale,
} from './prelude.cache';

export function getPrelude(): PreludeEntry[] {
    return getPreludeForLocale(getDocumentationLocale());
}

export function lookupEntry(name: string): PreludeEntry | undefined {
    return lookupEntryForLocale(name, getDocumentationLocale());
}
