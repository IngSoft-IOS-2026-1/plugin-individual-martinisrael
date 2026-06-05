import type { ExtensionVscodeApi } from '../extension.providers';

type MarkdownStringInstance = {
    value: string;
    appendCodeblock: (code: string, language: string) => void;
    appendMarkdown: (markdown: string) => void;
};

export function createVscodeMock(): ExtensionVscodeApi {
    class MarkdownString implements MarkdownStringInstance {
        value = '';

        appendCodeblock(code: string, _language: string): void {
            this.value += `\`\`\`\n${code}\n\`\`\`\n`;
        }

        appendMarkdown(markdown: string): void {
            this.value += markdown;
        }
    }

    class CompletionItem {
        label: string;
        kind: number;
        detail?: string;
        documentation?: MarkdownString;

        constructor(label: string, kind: number) {
            this.label = label;
            this.kind = kind;
        }
    }

    class Hover {
        contents: MarkdownString;

        constructor(contents: MarkdownString) {
            this.contents = contents;
        }
    }

    return {
        MarkdownString: MarkdownString as unknown as ExtensionVscodeApi['MarkdownString'],
        CompletionItem: CompletionItem as unknown as ExtensionVscodeApi['CompletionItem'],
        CompletionItemKind: { Function: 3 } as unknown as ExtensionVscodeApi['CompletionItemKind'],
        Hover: Hover as unknown as ExtensionVscodeApi['Hover'],
    };
}

export function getMarkdownValue(contents: unknown): string {
    return (contents as MarkdownStringInstance).value;
}
