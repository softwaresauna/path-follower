import {
    AsciiMap,
    AsciiMapLocation,
    FoundCharacter
} from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';

export class State {
    static from(
        map: AsciiMap,
        startingAt: AsciiMapLocation
    ): State | undefined {
        return Direction.getAll()
            .map(direction => new State(direction.goToNextLocation(startingAt)))
            .find(state => notEmpty(map.getCharacterAt(state.location)));
    }

    constructor(readonly location: AsciiMapLocation) {}
}

export function notEmpty(character: FoundCharacter): boolean {
    return character !== undefined && character !== ' ';
}
