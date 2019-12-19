import { AsciiMapLocation } from '../ascii-map/ascii-map';
import { CompactLocation, unpackLocation } from '../test-utils';
import { Direction } from './direction';

it('all directions are N, W, S, E', () => {
    expect(Direction.getAll()).toEqual([
        Direction.NORTH,
        Direction.SOUTH,
        Direction.WEST,
        Direction.EAST
    ]);
});

describe('goes to next location', () => {
    type Example = [CompactLocation, Direction, CompactLocation];

    const examples: Example[] = [
        [[0, 0], Direction.NORTH, [0, -1]],
        [[0, 0], Direction.SOUTH, [0, 1]],
        [[0, 0], Direction.WEST, [-1, 0]],
        [[0, 0], Direction.EAST, [1, 0]],

        [[2, 4], Direction.NORTH, [2, 3]],
        [[15, -23], Direction.SOUTH, [15, -22]],
        [[100, 101], Direction.EAST, [101, 101]],
        [[1, 7], Direction.WEST, [0, 7]]
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const location: AsciiMapLocation = unpackLocation(example[0]);
            const direction: Direction = example[1];
            const expectedLocation: AsciiMapLocation = unpackLocation(
                example[2]
            );

            expect(direction.goToNextLocation(location)).toEqual(
                expectedLocation
            );
        })
    );
});

describe('opposite directions', () => {
    type Example = [Direction, Direction, boolean];

    const examples: Example[] = [
        [Direction.EAST, Direction.WEST, true],
        [Direction.WEST, Direction.EAST, true],
        [Direction.NORTH, Direction.SOUTH, true],
        [Direction.SOUTH, Direction.NORTH, true],

        [Direction.EAST, Direction.EAST, false],
        [Direction.EAST, Direction.NORTH, false],
        [Direction.EAST, Direction.SOUTH, false],

        [Direction.WEST, Direction.WEST, false],
        [Direction.WEST, Direction.NORTH, false],
        [Direction.WEST, Direction.SOUTH, false],

        [Direction.NORTH, Direction.NORTH, false],
        [Direction.NORTH, Direction.EAST, false],
        [Direction.NORTH, Direction.WEST, false],

        [Direction.SOUTH, Direction.SOUTH, false],
        [Direction.SOUTH, Direction.EAST, false],
        [Direction.SOUTH, Direction.WEST, false]
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [direction, otherDirection, isOpposite] = example;
            expect(direction.isOpposite(otherDirection)).toBe(isOpposite);
        })
    );
});
