import type * as vscode from 'vscode';
import type { PreludeEntry } from './prelude';
import type { DocLocale } from './prelude.cache';
import { uiStrings } from './ui-strings';

export interface ExtensionVscodeApi {
    MarkdownString: typeof vscode.MarkdownString;
    CompletionItem: typeof vscode.CompletionItem;
    CompletionItemKind: typeof vscode.CompletionItemKind;
    Hover: typeof vscode.Hover;
}

export function buildDoc(
    api: ExtensionVscodeApi,
    entry: PreludeEntry,
    locale: DocLocale,
): vscode.MarkdownString {
    const md = new api.MarkdownString();
    md.appendCodeblock(entry.signature, 'miranda');
    md.appendMarkdown(`\n${entry.description}`);
    if (entry.examples && entry.examples.length > 0) {
        md.appendMarkdown(`\n\n**${uiStrings[locale].examplesLabel}:**`);
        md.appendCodeblock(entry.examples.join('\n'), 'miranda');
    }
    return md;
}

export function buildCompletionItems(
    api: ExtensionVscodeApi,
    prelude: PreludeEntry[],
    locale: DocLocale,
): vscode.CompletionItem[] {
    return prelude.map(entry => {
        const item = new api.CompletionItem(entry.name, api.CompletionItemKind.Function);
        item.detail = entry.signature;
        item.documentation = buildDoc(api, entry, locale);
        return item;
    });
}

export function provideHover(
    api: ExtensionVscodeApi,
    document: vscode.TextDocument,
    position: vscode.Position,
    lookup: (name: string) => PreludeEntry | undefined,
    locale: DocLocale,
): vscode.Hover | undefined {
    const range = document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9_']*/);
    if (!range) {
        return undefined;
    }
    const word = document.getText(range);
    const entry = lookup(word);
    if (!entry) {
        return undefined;
    }
    return new api.Hover(buildDoc(api, entry, locale));
}
