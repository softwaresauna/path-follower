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

describe('travelling', () => {
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
