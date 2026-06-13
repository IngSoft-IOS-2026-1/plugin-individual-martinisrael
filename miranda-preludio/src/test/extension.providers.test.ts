import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type * as vscode from 'vscode';
import { mergePrelude } from '../prelude.cache';
import {
    buildCompletionItems,
    buildDoc,
    provideHover,
} from '../extension.providers';
import { createMirandaDocument } from './document-mock';
import { createVscodeMock, getMarkdownValue } from './vscode-mock';

describe('Extension providers', () => {
    const vscode = createVscodeMock();
    const prelude = mergePrelude('en');
    const mapEntry = prelude.find(entry => entry.name === 'map');
    assert.ok(mapEntry);

    test('buildDoc includes signature, description, and examples label', () => {
        const doc = buildDoc(vscode, mapEntry!, 'en');
        const value = getMarkdownValue(doc);

        assert.match(value, /map :: \(\* -> \*\*\) -> \[\*\] -> \[\*\*\]/);
        assert.match(value, /Applies a function to each list element/);
        assert.match(value, /\*\*Examples:\*\*/);
    });

    test('buildDoc uses Spanish examples label when locale is es', () => {
        const esMap = mergePrelude('es').find(entry => entry.name === 'map');
        assert.ok(esMap);

        const doc = buildDoc(vscode, esMap!, 'es');
        const value = getMarkdownValue(doc);

        assert.match(value, /\*\*Ejemplos:\*\*/);
        assert.match(value, /Aplica una función a cada elemento/);
    });

    test('buildCompletionItems returns one item per prelude function with signature detail', () => {
        const items = buildCompletionItems(vscode, prelude, 'en');

        assert.equal(items.length, prelude.length);

        const mapItem = items.find(item => item.label === 'map');
        assert.ok(mapItem);
        assert.equal(mapItem.detail, mapEntry!.signature);
        assert.equal(mapItem.kind, vscode.CompletionItemKind.Function);
        assert.match(
            getMarkdownValue(mapItem.documentation),
            /Applies a function to each list element/
        );
    });

    test('provideHover returns hover for prelude functions', () => {
        const document = createMirandaDocument('result = map (*2) [1, 2, 3]');
        const position = { line: 0, character: 10 } as vscode.Position;

        const hover = provideHover(
            vscode,
            document,
            position,
            name => prelude.find(entry => entry.name === name),
            'en'
        );

        assert.ok(hover);
        assert.match(
            getMarkdownValue(hover!.contents),
            /map :: \(\* -> \*\*\) -> \[\*\] -> \[\*\*\]/
        );
    });

    test('provideHover returns undefined for user-defined functions', () => {
        const document = createMirandaDocument('cuadrado x = x * x');
        const position = { line: 0, character: 2 } as vscode.Position;

        const hover = provideHover(
            vscode,
            document,
            position,
            name => prelude.find(entry => entry.name === name),
            'en'
        );

        assert.equal(hover, undefined);
    });

    test('provideHover returns undefined when cursor is not on an identifier', () => {
        const document = createMirandaDocument('result = map (*2) [1, 2, 3]');
        const position = { line: 0, character: 8 } as vscode.Position;

        const hover = provideHover(
            vscode,
            document,
            position,
            name => prelude.find(entry => entry.name === name),
            'en'
        );

        assert.equal(hover, undefined);
    });

    test('provideHover returns undefined inside comments', () => {
        const document = createMirandaDocument('|| map filter sort');
        const position = { line: 0, character: 5 } as vscode.Position;

        const hover = provideHover(
            vscode,
            document,
            position,
            name => prelude.find(entry => entry.name === name),
            'en'
        );

        assert.equal(hover, undefined);
    });

    test('provideHover returns undefined inside strings', () => {
        const document = createMirandaDocument('x = "map"');
        const position = { line: 0, character: 6 } as vscode.Position;

        const hover = provideHover(
            vscode,
            document,
            position,
            name => prelude.find(entry => entry.name === name),
            'en'
        );

        assert.equal(hover, undefined);
    });
});
