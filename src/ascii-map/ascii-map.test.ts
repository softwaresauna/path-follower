import { AsciiMap, AsciiMapLocation, FoundCharacter } from './ascii-map';

describe('finds letter in map', () => {
    const examples: Array<{
        character: string;
        inMap: string;
        isFoundAt: AsciiMapLocation;
    }> = [
        { inMap: 'a', character: 'a', isFoundAt: { x: 0, y: 0 } },
        { inMap: 'b', character: 'b', isFoundAt: { x: 0, y: 0 } },
        { inMap: 'ab', character: 'a', isFoundAt: { x: 0, y: 0 } },
        { inMap: 'ab', character: 'b', isFoundAt: { x: 1, y: 0 } },
        { inMap: 'a\nb', character: 'a', isFoundAt: { x: 0, y: 0 } },
        { inMap: 'a\nb', character: 'b', isFoundAt: { x: 0, y: 1 } },

        ...[
            { character: 'a', isFoundAt: { x: 0, y: 0 } },
            { character: 'b', isFoundAt: { x: 1, y: 0 } },
            { character: 'c', isFoundAt: { x: 2, y: 0 } },
            { character: 'd', isFoundAt: { x: 0, y: 1 } },
            { character: 'e', isFoundAt: { x: 1, y: 1 } },
            { character: 'f', isFoundAt: { x: 2, y: 1 } },
            { character: 'g', isFoundAt: { x: 0, y: 2 } },
            { character: 'h', isFoundAt: { x: 1, y: 2 } },
            { character: 'i', isFoundAt: { x: 2, y: 2 } }
        ].map(ex => ({
            inMap: ['abc', 'def', 'ghi'].join('\n'),
            ...ex
        })),

        { inMap: 'abc\nabc\nabc', character: 'b', isFoundAt: { x: 1, y: 0 } }
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            expect(
                AsciiMap.fromString(example.inMap).find(example.character)
            ).toEqual(example.isFoundAt);
        })
    );
});

describe('does not find letter in map', () => {
    const examples: Array<{
        missingCharacter: string;
        inMap: string;
    }> = [
        { missingCharacter: 'a', inMap: '' },
        { missingCharacter: 'A', inMap: 'a' },
        { missingCharacter: 'a', inMap: 'b' },
        { missingCharacter: 'j', inMap: 'abc\ndef\nghi' }
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            expect(() =>
                AsciiMap.fromString(example.inMap).find(
                    example.missingCharacter
                )
            ).toThrow();
        })
    );
});

describe('gets character at location', () => {
    const map = AsciiMap.fromString('abc\ndef\nghi');

    type Loc = [number, number];

    function toLocation(loc: Loc): AsciiMapLocation {
        return { x: loc[0], y: loc[1] };
    }

    const examples: Array<[Loc, FoundCharacter]> = [
        [[0, 0], 'a'],
        [[1, 0], 'b'],
        [[2, 0], 'c'],
        [[0, 1], 'd'],
        [[1, 1], 'e'],
        [[2, 1], 'f'],
        [[0, 2], 'g'],
        [[1, 2], 'h'],
        [[2, 2], 'i'],
        [[0, 3], undefined],
        [[1, 3], undefined],
        [[2, 3], undefined],
        [[3, 3], undefined],
        [[-1, 0], undefined],
        [[0, -1], undefined]
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const location: AsciiMapLocation = toLocation(example[0]);
            const character: FoundCharacter = example[1];

            expect(map.getCharacterAt(location)).toEqual(character);
        })
    );
});
