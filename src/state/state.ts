import { AsciiMap, AsciiMapLocation } from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';

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
    return character !== undefined && character !== ' ';
}

export function foundOrThrow<T>(found: T | undefined): T {
    throw Error('TODO!');
}
