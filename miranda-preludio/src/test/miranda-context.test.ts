import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { isHoverableCodePosition } from '../miranda-context';

describe('Miranda code context', () => {
    test('allows identifiers in normal code', () => {
        assert.equal(isHoverableCodePosition('result = map (*2) xs', 10), true);
    });

    test('rejects identifiers in line comments', () => {
        assert.equal(isHoverableCodePosition('|| map filter sort', 5), false);
    });

    test('rejects identifiers after inline comment marker', () => {
        assert.equal(isHoverableCodePosition('x = 1 || map is mentioned here', 10), false);
    });

    test('allows identifiers before inline comment marker', () => {
        assert.equal(isHoverableCodePosition('map xs || note about filter', 1), true);
    });

    test('rejects identifiers inside double-quoted strings', () => {
        assert.equal(isHoverableCodePosition('x = "map"', 6), false);
    });

    test('rejects identifiers inside single-quoted strings', () => {
        assert.equal(isHoverableCodePosition("label = 'map'", 10), false);
    });

    test('does not treat comment marker inside strings as a comment', () => {
        assert.equal(isHoverableCodePosition('x = "text || map"', 14), false);
        assert.equal(isHoverableCodePosition('x = "text || map"', 3), true);
    });
});
