import type * as vscode from 'vscode';

export function createMirandaDocument(source: string): vscode.TextDocument {
    const lines = source.split('\n');

    return {
        uri: { fsPath: '/test/example.m' } as vscode.Uri,
        fileName: 'example.m',
        isUntitled: false,
        languageId: 'miranda',
        version: 1,
        isDirty: false,
        isClosed: false,
        encoding: 'utf8',
        save: async () => true,
        eol: 1,
        lineCount: lines.length,
        getText: (range?: vscode.Range) => {
            if (!range) {
                return source;
            }
            if (range.start.line === range.end.line) {
                return lines[range.start.line].slice(range.start.character, range.end.character);
            }
            return source;
        },
        lineAt: (line: number | vscode.Position) => {
            const lineNumber = typeof line === 'number' ? line : line.line;
            const text = lines[lineNumber] ?? '';
            return {
                lineNumber,
                text,
                range: {
                    start: { line: lineNumber, character: 0 },
                    end: { line: lineNumber, character: text.length },
                },
                rangeIncludingLineBreak: {
                    start: { line: lineNumber, character: 0 },
                    end: { line: lineNumber, character: text.length },
                },
                firstNonWhitespaceCharacterIndex: text.search(/\S|$/) ?? 0,
                isEmptyOrWhitespace: text.trim().length === 0,
            } as vscode.TextLine;
        },
        offsetAt: () => 0,
        positionAt: () => ({ line: 0, character: 0 } as vscode.Position),
        getWordRangeAtPosition(position: vscode.Position, regex: RegExp): vscode.Range | undefined {
            const line = lines[position.line] ?? '';
            const before = line.slice(0, position.character);
            const after = line.slice(position.character);
            const prefix = before.match(/[a-zA-Z0-9_']*$/)?.[0] ?? '';
            const suffix = after.match(/^[a-zA-Z0-9_']*/)?.[0] ?? '';
            const word = prefix + suffix;
            const match = word.match(regex);
            if (!match) {
                return undefined;
            }
            const start = position.character - prefix.length;
            const end = start + match[0].length;
            return {
                start: { line: position.line, character: start },
                end: { line: position.line, character: end },
            } as vscode.Range;
        },
        validateRange: (range: vscode.Range) => range,
        validatePosition: (position: vscode.Position) => position,
    } as unknown as vscode.TextDocument;
}
