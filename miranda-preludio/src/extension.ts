import * as vscode from 'vscode';
import { getPrelude, lookupEntry, invalidatePreludeCache } from './prelude';
import { getDocumentationLocale } from './locale';
import { buildCompletionItems, provideHover } from './extension.providers';

const vscodeApi = {
    MarkdownString: vscode.MarkdownString,
    CompletionItem: vscode.CompletionItem,
    CompletionItemKind: vscode.CompletionItemKind,
    Hover: vscode.Hover,
};

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
                return buildCompletionItems(vscodeApi, getPrelude(), locale);
            },
        }
    );
}

function registerHover(): vscode.Disposable {
    return vscode.languages.registerHoverProvider(
        { language: 'miranda' },
        {
            provideHover(document, position) {
                return provideHover(
                    vscodeApi,
                    document,
                    position,
                    lookupEntry,
                    getDocumentationLocale()
                );
            },
        }
    );
}

export function deactivate() {}
