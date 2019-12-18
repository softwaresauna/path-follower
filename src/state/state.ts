import {
    AsciiMap,
    AsciiMapLocation,
    FoundCharacter
} from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';

export interface CollectedLetters {
    readonly letters: string;
    readonly path: string;
}

export class State {
    static from(
        map: AsciiMap,
        startingAt: AsciiMapLocation
    ): State | undefined {
        return Direction.getAll()
            .map(
                direction =>
                    new State(map, direction.goToNextLocation(startingAt))
            )
            .find(state => notEmpty(map.getCharacterAt(state.location)));
    }

    constructor(
        private readonly map: AsciiMap,
        private readonly location: AsciiMapLocation
    ) {}

    goToNextLocation(): State {
        throw new Error('Method not implemented.');
    }

    collect(soFar: CollectedLetters): CollectedLetters {
        const character = this.map.getCharacterAt(this.location);
        return {
            letters: collectLetter(character, soFar.letters),
            path: collectPath(character, soFar.path)
        };
    }

    isEndOfPath(): boolean {
        return isEndCharacter(this.map.getCharacterAt(this.location));
    }
}

export function notEmpty(character: FoundCharacter): boolean {
    return character !== undefined && character !== ' ';
}

export function collectLetter(
    character: FoundCharacter,
    oldLetters: string
): string {
    if (character === undefined) {
        return oldLetters;
    }

    return isAToZ(character) ? oldLetters + character : oldLetters;
}

function isAToZ(character: string): boolean {
    return !!character.match(/[A-Z]/);
}

export function collectPath(
    character: FoundCharacter,
    oldPath: string
): string {
    return notEmpty(character) ? oldPath + character : oldPath;
}

export function isEndCharacter(character: FoundCharacter): boolean {
    return character === 'x';
}
