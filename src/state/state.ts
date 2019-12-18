import {
    AsciiMap,
    AsciiMapLocation,
    FoundCharacter
} from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';

export interface CollectedLetters {
    letters: string;
    path: string;
}

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

    goToNextLocation(): State {
        throw new Error('Method not implemented.');
    }

    collect(soFar: CollectedLetters): CollectedLetters {
        throw new Error('Method not implemented.');
    }

    isEndOfPath(): boolean {
        throw new Error('Method not implemented.');
    }
}

export function notEmpty(character: FoundCharacter): boolean {
    return character !== undefined && character !== ' ';
}
