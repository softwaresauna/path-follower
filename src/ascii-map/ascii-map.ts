export interface AsciiMapLocation {
    x: number;
    y: number;
}

export class AsciiMap {
    static fromString(mapString: string): AsciiMap {
        return new AsciiMap(mapString.split('\n'));
    }

    private constructor(private readonly lines: string[]) {}

    find(character: string): AsciiMapLocation {
        const foundLine = this.lines
            .map((line, index) => ({ line, y: index }))
            .filter(indexedLine => indexedLine.line.includes(character))[0];

        if (foundLine === undefined) {
            throw new Error(`Character ${character} not found!`);
        }

        return {
            x: foundLine.line.indexOf(character),
            y: foundLine.y
        };
    }
}
