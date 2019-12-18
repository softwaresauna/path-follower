import { Direction } from './direction';

it('directions are N, W, S, E', () => {
    expect(
        Direction.getAll().map(direction =>
            direction.goToNextLocation({ x: 0, y: 0 })
        )
    ).toEqual([
        { x: 0, y: -1 }, // north
        { x: 0, y: 1 }, // south
        { x: -1, y: 0 }, // west
        { x: 1, y: 0 } // east
    ]);
});
