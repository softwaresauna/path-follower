export interface AsciiMapLocation {
    x: number;
    y: number;
}

export type FoundCharacter = string | undefined;

export class AsciiMap {
    static fromString(mapString: string): AsciiMap {
        return new AsciiMap(mapString.split('\n'));
    }

    private constructor(private readonly lines: string[]) {}

    find(character: string): AsciiMapLocation {
        const foundLine = this.lines
            .map((line, index) => ({ line, y: index }))
            .find(indexedLine => indexedLine.line.includes(character));

        if (foundLine === undefined) {
            throw new Error(`Character ${character} not found!`);
        }

        return {
            x: foundLine.line.indexOf(character),
            y: foundLine.y
        };
    }

    getCharacterAt(location: AsciiMapLocation): FoundCharacter {
        const line = this.lines[location.y];
        return line !== undefined
            ? line.charAt(location.x) || undefined
            : undefined;
    }
}
