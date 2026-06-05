import * as vscode from 'vscode';
import { getPrelude, lookupEntry, invalidatePreludeCache } from './prelude';
import { getDocumentationLocale, uiStrings } from './locale';
import type { PreludeEntry } from './prelude';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        registerCompletion(),
        registerHover(),
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('miranda-preludio.documentationLanguage')) {
                invalidatePreludeCache();
            }
        })
    );
}

function registerCompletion(): vscode.Disposable {
    return vscode.languages.registerCompletionItemProvider(
        { language: 'miranda' },
        {
            provideCompletionItems: () => {
                const locale = getDocumentationLocale();
                return getPrelude().map(entry => {
                    const item = new vscode.CompletionItem(entry.name, vscode.CompletionItemKind.Function);
                    item.detail = entry.signature;
                    item.documentation = buildDoc(entry, locale);
                    return item;
                });
            },
        }
    );
}

function registerHover(): vscode.Disposable {
    return vscode.languages.registerHoverProvider(
        { language: 'miranda' },
        {
            provideHover(document, position) {
                const word = document.getText(
                    document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9_']*/)
                );
                const entry = lookupEntry(word);
                if (!entry) {
                    return;
                }
                return new vscode.Hover(buildDoc(entry, getDocumentationLocale()));
            },
        }
    );
}

function buildDoc(entry: PreludeEntry, locale: ReturnType<typeof getDocumentationLocale>): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.appendCodeblock(entry.signature, 'miranda');
    md.appendMarkdown(`\n${entry.description}`);
    if (entry.examples && entry.examples.length > 0) {
        md.appendMarkdown(`\n\n**${uiStrings[locale].examplesLabel}:**`);
        md.appendCodeblock(entry.examples.join('\n'), 'miranda');
    }
    return md;
}

export function deactivate() {}
