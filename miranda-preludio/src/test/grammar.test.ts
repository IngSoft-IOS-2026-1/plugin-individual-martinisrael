import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, test } from 'node:test';
import { preludeBase } from '../prelude.base';

const grammarPath = join(__dirname, '../../syntaxes/miranda.tmLanguage.json');
const grammar = JSON.parse(readFileSync(grammarPath, 'utf8')) as {
    repository: {
        'prelude-function': {
            patterns: Array<{ match: string }>;
        };
    };
};

function preludeNameInGrammar(name: string, patterns: string[]): boolean {
    if (name === '#') {
        return patterns.some(pattern => pattern.includes('#(?='));
    }

    const wordPattern = patterns.find(pattern => pattern.includes('\\b(hd|'));
    if (!wordPattern) {
        return false;
    }

    const preludeRegex = new RegExp(wordPattern);
    const samples = [` ${name} `, `(${name}`, `=${name}`, `\n${name} `];
    return samples.some(sample => preludeRegex.test(sample));
}

describe('TextMate grammar prelude coverage', () => {
    const preludePatterns = grammar.repository['prelude-function'].patterns.map(entry => entry.match);

    test('every prelude function name is covered by the grammar', () => {
        const missing = preludeBase
            .map(entry => entry.name)
            .filter(name => !preludeNameInGrammar(name, preludePatterns));

        assert.deepEqual(missing, [], `missing from grammar: ${missing.join(', ')}`);
    });
});
