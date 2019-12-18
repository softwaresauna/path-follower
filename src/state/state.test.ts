import { FoundCharacter } from '../ascii-map/ascii-map';
import { collectLetter, collectPath, notEmpty } from './state';

describe('notEmpty', () => {
    const emptyCharacters = [undefined, ' '];
    const nonEmptyCharacters = ['a', 'A', '.', 'x', '-', '|', '+'];

    const examples: Array<{
        character: FoundCharacter;
        isNotEmpty: boolean;
    }> = [
        ...emptyCharacters.map(character => ({
            character,
            isNotEmpty: false
        })),
        ...nonEmptyCharacters.map(character => ({
            character,
            isNotEmpty: true
        }))
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            expect(notEmpty(example.character)).toBe(example.isNotEmpty);
        })
    );
});

describe('collect', () => {
    type Example = [string, FoundCharacter, string];

    const unpack: (
        example: Example
    ) => {
        old: string;
        character: FoundCharacter;
        expected: string;
    } = example => ({
        old: example[0],
        character: example[1],
        expected: example[2]
    });

    describe('path', () => {
        const examples: Example[] = [
            ['', undefined, ''],
            ['a', undefined, 'a'],
            [' ', undefined, ' '],
            ['abc', undefined, 'abc'],
            ['abc', '', 'abc'],
            ['abc', ' ', 'abc'],
            ['abc', 'd', 'abcd'],
            ['abc', 'D', 'abcD'],
            ['abc', '.', 'abc.'],
            ['abc', '-', 'abc-'],
            ['abc', '+', 'abc+']
        ];

        examples.forEach(example =>
            it(JSON.stringify(example), () => {
                const { old, character, expected } = unpack(example);
                expect(collectPath(character, old)).toEqual(expected);
            })
        );
    });

    describe('letter', () => {
        const examples: Example[] = [
            ['abc', undefined, 'abc'],
            ['abc', '', 'abc'],
            ['abc', ' ', 'abc'],
            ['abc', '.', 'abc'],
            ['abc', '-', 'abc'],
            ['abc', '+', 'abc'],
            ['abc', '|', 'abc'],
            ['abc', 'd', 'abcd'],
            ['abc', 'D', 'abcD']
        ];

        examples.forEach(example =>
            it(JSON.stringify(example), () => {
                const { old, character, expected } = unpack(example);
                expect(collectLetter(character, old)).toEqual(expected);
            })
        );
    });
});
