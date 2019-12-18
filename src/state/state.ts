import { AsciiMap, AsciiMapLocation } from '../ascii-map/ascii-map';

class Direction {
    static getAll(): Direction[] {
        throw Error('TODO!');
    }

    goToNextLocation(location: AsciiMapLocation): AsciiMapLocation {
        throw Error('TODO!');
    }
}

export class State {
    static from(map: AsciiMap, startingAt: AsciiMapLocation): State {
        return foundOrThrow(
            Direction.getAll()
                .map(direction => ({
                    direction,
                    location: direction.goToNextLocation(startingAt)
                }))
                .find(directionAndLocation =>
                    notEmpty(map.getCharacterAt(directionAndLocation.location))
                )
        );
    }

    constructor(readonly location: AsciiMapLocation) {}
}

export function notEmpty(character: string | undefined): boolean {
    throw Error('TODO!');
}

export function foundOrThrow<T>(found: T | undefined): T {
    throw Error('TODO!');
}
