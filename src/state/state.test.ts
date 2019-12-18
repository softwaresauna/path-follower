import { FoundCharacter } from '../ascii-map/ascii-map';
import { collectPath, notEmpty } from './state';

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

describe('collect path', () => {
    type Example = [string, FoundCharacter, string];

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
            const old: string = example[0];
            const character: FoundCharacter = example[1];
            const expected: string = example[2];

            expect(collectPath(character, old)).toEqual(expected);
        })
    );
});
