import { FoundCharacter } from '../ascii-map/ascii-map';
import { foundOrThrow, notEmpty } from './state';

describe('notEmpty', () => {
    const emptyCharacters = [undefined, ' '];
    const nonEmptyCharacters = ['a', 'A', '.', 'x', '-', '|', '+'];

    const examples: Array<{
        character: FoundCharacter;
        isNotEmpty: boolean;
    }> = [
        ...emptyCharacters.map(character => ({
            character,
            isNotEmpty: false,
        })),
        ...nonEmptyCharacters.map(character => ({
            character,
            isNotEmpty: true,
        })),
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            expect(notEmpty(example.character)).toBe(example.isNotEmpty);
        }),
    );
});

describe('foundOrThrow', () => {

    it('returns when found', () => {
        expect(foundOrThrow('any')).toBe('any');
    });

    it('throws when not found', () => {
        expect(() => foundOrThrow(undefined)).toThrow();
    });
});
