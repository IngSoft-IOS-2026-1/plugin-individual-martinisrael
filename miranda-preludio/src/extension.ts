import * as vscode from 'vscode';
import { prelude, lookupEntry } from './prelude';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        registerCompletion(),
        registerHover()
    );
}

function registerCompletion(): vscode.Disposable {
    const items = prelude.map(entry => {
        const item = new vscode.CompletionItem(entry.name, vscode.CompletionItemKind.Function);
        item.detail = entry.signature;
        item.documentation = buildDoc(entry);
        return item;
    });

    return vscode.languages.registerCompletionItemProvider(
        { language: 'miranda' },
        { provideCompletionItems: () => items }
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
                if (!entry) { return; }
                return new vscode.Hover(buildDoc(entry));
            }
        }
    );
}

function buildDoc(entry: ReturnType<typeof lookupEntry>): vscode.MarkdownString {
    if (!entry) { return new vscode.MarkdownString(); }
    const md = new vscode.MarkdownString();
    md.appendCodeblock(entry.signature, 'miranda');
    md.appendMarkdown(`\n${entry.description}`);
    if (entry.examples && entry.examples.length > 0) {
        md.appendMarkdown('\n\n**Ejemplos:**');
        md.appendCodeblock(entry.examples.join('\n'), 'miranda');
    }
    return md;
}

export function deactivate() {}
