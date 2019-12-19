import { FoundCharacter } from '../ascii-map/ascii-map';
import { collectLetter, isEndCharacter, isOnPath, shouldTurn } from './state';

describe('character is on path', () => {
    const offPathCharacters = [undefined, ' '];
    const pathCharacters = ['a', 'A', '.', 'x', '-', '|', '+'];

    const examples: Array<[FoundCharacter, boolean]> = [
        ...offPathCharacters.map(
            character => [character, false] as [FoundCharacter, boolean]
        ),
        ...pathCharacters.map(
            character => [character, true] as [FoundCharacter, boolean]
        )
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [character, onPath] = example;
            expect(isOnPath(character)).toBe(onPath);
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
    const examples: Array<[FoundCharacter, boolean]> = [
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
