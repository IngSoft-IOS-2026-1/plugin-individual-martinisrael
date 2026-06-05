import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { preludeBase } from '../prelude.base';
import { preludeTexts as preludeTextsEn } from '../prelude.en';
import { preludeTexts as preludeTextsEs } from '../prelude.es';
import {
    mergePrelude,
    lookupEntryForLocale,
    invalidatePreludeCache,
    getPreludeForLocale,
} from '../prelude.cache';

describe('Prelude catalog', () => {
    test('every prelude function has English and Spanish descriptions', () => {
        for (const entry of preludeBase) {
            assert.ok(
                preludeTextsEn[entry.name]?.description,
                `missing English description for ${entry.name}`
            );
            assert.ok(
                preludeTextsEs[entry.name]?.description,
                `missing Spanish description for ${entry.name}`
            );
        }
    });

    test('mergePrelude attaches locale-specific descriptions', () => {
        const enMap = mergePrelude('en').find(e => e.name === 'map');
        const esMap = mergePrelude('es').find(e => e.name === 'map');

        assert.equal(enMap?.description, preludeTextsEn.map.description);
        assert.equal(esMap?.description, preludeTextsEs.map.description);
        assert.equal(enMap?.signature, 'map :: (* -> **) -> [*] -> [**]');
    });
});

describe('Prelude lookup and cache', () => {
    test('lookupEntryForLocale returns undefined for unknown functions', () => {
        invalidatePreludeCache();
        assert.equal(lookupEntryForLocale('notARealPreludeFn', 'en'), undefined);
    });

    test('getPreludeForLocale returns English descriptions', () => {
        invalidatePreludeCache();
        const entry = getPreludeForLocale('en').find(e => e.name === 'map');
        assert.equal(entry?.description, preludeTextsEn.map.description);
    });

    test('getPreludeForLocale returns Spanish descriptions', () => {
        invalidatePreludeCache();
        const entry = getPreludeForLocale('es').find(e => e.name === 'map');
        assert.equal(entry?.description, preludeTextsEs.map.description);
    });

    test('invalidatePreludeCache forces locale reload', () => {
        invalidatePreludeCache();
        assert.equal(
            getPreludeForLocale('en').find(e => e.name === 'map')?.description,
            preludeTextsEn.map.description
        );

        invalidatePreludeCache();
        assert.equal(
            getPreludeForLocale('es').find(e => e.name === 'map')?.description,
            preludeTextsEs.map.description
        );
    });
});
