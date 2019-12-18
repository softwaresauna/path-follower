import { AsciiMapLocation } from '../ascii-map/ascii-map';

type Delta = -1 | 0 | 1;

export class Direction {
    static getAll(): Direction[] {
        return [
            new Direction(0, -1),
            new Direction(0, 1),
            new Direction(-1, 0),
            new Direction(1, 0)
        ];
    }

    private constructor(
        private readonly deltaX: Delta,
        private readonly deltaY: Delta
    ) {}

    goToNextLocation(location: AsciiMapLocation): AsciiMapLocation {
        return { x: location.x + this.deltaX, y: location.y + this.deltaY };
    }
}
