import { AsciiMapLocation } from '../ascii-map/ascii-map';

type Delta = -1 | 0 | 1;

export class Direction {
    static readonly NORTH = new Direction(0, -1);
    static readonly SOUTH = new Direction(0, 1);
    static readonly WEST = new Direction(-1, 0);
    static readonly EAST = new Direction(1, 0);

    static getAll(): Direction[] {
        return [
            this.NORTH,
            this.SOUTH,
            this.WEST,
            this.EAST
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
