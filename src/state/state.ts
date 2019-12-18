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
                    new State(
                        map,
                        direction.goToNextLocation(startingAt),
                        direction
                    )
            )
            .find(state => notEmpty(map.getCharacterAt(state.location)));
    }

    constructor(
        private readonly map: AsciiMap,
        private readonly location: AsciiMapLocation,
        private readonly direction: Direction
    ) {}

    goToNextLocation(): State {
        const character = validCharacter(
            this.map.getCharacterAt(this.location)
        );

        const neighbors: Map<Direction, FoundCharacter> = new Map(
            Direction.getAll().map(direction => [
                direction,
                this.map.getCharacterAt(
                    direction.goToNextLocation(this.location)
                )
            ])
        );

        const nextDirection = turn(character, this.direction, neighbors);

        return new State(
            this.map,
            nextDirection.goToNextLocation(this.location),
            nextDirection
        );
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

function validCharacter(character: FoundCharacter): FoundCharacter {
    if (notEmpty(character)) {
        return character;
    }

    throw new Error('Invalid map!');
}

export function turn(
    character: FoundCharacter,
    direction: Direction,
    neighbors: Map<Direction, FoundCharacter>
): Direction {
    throw Error('TODO!');
}

export function isEndCharacter(character: FoundCharacter): boolean {
    return character === 'x';
}
