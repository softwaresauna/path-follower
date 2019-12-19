import { FoundCharacter } from '../ascii-map/ascii-map';
import { collectLetter, isEndCharacter, notEmpty, shouldTurn } from './state';

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

describe('collect letter', () => {
    const examples: Array<[string, FoundCharacter, string]> = [
        ['abc', undefined, 'abc'],
        ['abc', '', 'abc'],
        ['abc', ' ', 'abc'],
        ['abc', '.', 'abc'],
        ['abc', '-', 'abc'],
        ['abc', '+', 'abc'],
        ['abc', '|', 'abc'],
        ['abc', 'd', 'abc'],
        ['abc', 'D', 'abcD'],
        ['abc', 'x', 'abc'],
        ['abc', 'X', 'abcX']
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [old, character, expected] = example;
            expect(collectLetter(character, old)).toEqual(expected);
        })
    );
});

describe('end character', () => {
    type Example = [FoundCharacter, boolean];

    const examples: Example[] = [
        [undefined, false],
        [' ', false],
        ['a', false],
        ['A', false],
        ['x', true],
        ['X', false]
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [character, isEnd] = example;
            expect(isEndCharacter(character)).toBe(isEnd);
        })
    );
});

describe('should turn', () => {
    const examples: Array<[FoundCharacter, boolean]> = [
        [undefined, false],
        [' ', false],
        ['-', false],
        ['@', false],
        ['|', false],
        ['+', true],
        ...'ABCDEFGHIJKLMNOPQRSTVWXYZ'
            .split('')
            .map(letter => [letter, true] as [FoundCharacter, boolean])
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [character, expected] = example;
            expect(shouldTurn(character)).toBe(expected);
        })
    );
});
