function findCommentStart(line: string): number {
    let inDouble = false;
    let inSingle = false;

    for (let i = 0; i < line.length - 1; i++) {
        const ch = line[i];

        if (inDouble) {
            if (ch === '"') {
                inDouble = false;
            }
            continue;
        }

        if (inSingle) {
            if (ch === "'") {
                inSingle = false;
            }
            continue;
        }

        if (ch === '"') {
            inDouble = true;
        } else if (ch === "'") {
            inSingle = true;
        } else if (ch === '|' && line[i + 1] === '|') {
            return i;
        }
    }

    return -1;
}

function isInsideString(line: string, character: number): boolean {
    let inDouble = false;
    let inSingle = false;

    for (let i = 0; i < character; i++) {
        const ch = line[i];

        if (inDouble) {
            if (ch === '"') {
                inDouble = false;
            }
            continue;
        }

        if (inSingle) {
            if (ch === "'") {
                inSingle = false;
            }
            continue;
        }

        if (ch === '"') {
            inDouble = true;
        } else if (ch === "'") {
            inSingle = true;
        }
    }

    return inDouble || inSingle;
}

export function isHoverableCodePosition(line: string, character: number): boolean {
    const commentStart = findCommentStart(line);
    if (commentStart !== -1 && character >= commentStart) {
        return false;
    }

    return !isInsideString(line, character);
}
