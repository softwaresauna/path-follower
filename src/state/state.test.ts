import { FoundCharacter } from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';
import {
    collectLetter,
    collectPath,
    isEndCharacter,
    notEmpty,
    turn
} from './state';

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
            ['abc', 'd', 'abc'],
            ['abc', 'D', 'abcD'],
            ['abc', 'x', 'abc'],
            ['abc', 'X', 'abcX']
        ];

        examples.forEach(example =>
            it(JSON.stringify(example), () => {
                const { old, character, expected } = unpack(example);
                expect(collectLetter(character, old)).toEqual(expected);
            })
        );
    });
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

describe('turn', () => {
    const anyNeighbours = [];

    describe('throws if nowhere to turn', () => {
        const examples: Array<[
            FoundCharacter,
            Direction,
            Array<[Direction, FoundCharacter]>
        ]> = [
            [
                '-',
                Direction.EAST,
                [
                    [Direction.NORTH, '|'],
                    [Direction.EAST, ' '],
                    [Direction.SOUTH, ' '],
                    [Direction.WEST, '-']
                ]
            ],
            [
                '+',
                Direction.NORTH,
                [
                    [Direction.NORTH, ' '],
                    [Direction.EAST, ' '],
                    [Direction.SOUTH, '|'],
                    [Direction.WEST, ' ']
                ]
            ]
        ];

        examples.forEach(example =>
            it(JSON.stringify(example), () => {
                const [character, direction, neighbours] = example;
                expect(() => turn(character, direction, neighbours)).toThrow();
            })
        );
    });

    describe('returns next direction', () => {
        const examples: Array<[
            FoundCharacter,
            Direction,
            Array<[Direction, FoundCharacter]>,
            Direction
        ]> = [
            ['-', Direction.EAST, anyNeighbours, Direction.EAST],
            ['a', Direction.NORTH, anyNeighbours, Direction.NORTH],
            ['|', Direction.WEST, anyNeighbours, Direction.WEST],
            [' ', Direction.SOUTH, anyNeighbours, Direction.SOUTH],

            [
                '+',
                Direction.NORTH,
                [
                    [Direction.NORTH, ' '],
                    [Direction.EAST, ' '],
                    [Direction.SOUTH, ' '],
                    [Direction.WEST, ' ']
                ],
                undefined
            ]
        ];

        examples.forEach(example =>
            it(JSON.stringify(example), () => {
                const [
                    character,
                    direction,
                    neighbours,
                    nextDirection
                ] = example;
                expect(turn(character, direction, neighbours)).toEqual(
                    nextDirection
                );
            })
        );
    });
});
