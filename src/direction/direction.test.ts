import { AsciiMapLocation } from '../ascii-map/ascii-map';
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
    type Loc = [number, number];
    type Example = [Loc, Direction, Loc];

    const examples: Example[] = [
        [[0, 0], Direction.NORTH, [0, -1]],
        [[0, 0], Direction.SOUTH, [0, 1]],
        [[0, 0], Direction.WEST, [-1, 0]],
        [[0, 0], Direction.EAST, [1, 0]],

        [[2, 4], Direction.NORTH, [2, 3]],
        [[15, -23], Direction.SOUTH, [15, -22]],
        [[100, 101], Direction.EAST, [101, 101]],
        [[1, 7], Direction.WEST, [0, 7]],
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const location: AsciiMapLocation = {
                x: example[0][0],
                y: example[0][1]
            };
            const direction: Direction = example[1];
            const expectedLocation: AsciiMapLocation = {
                x: example[2][0],
                y: example[2][1]
            };

            expect(direction.goToNextLocation(location)).toEqual(
                expectedLocation
            );
        })
    );
});
