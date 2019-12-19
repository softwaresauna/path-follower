import {
    AsciiMap,
    AsciiMapLocation,
    FoundCharacter
} from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';
import { existsOrThrow } from '../path-follower';
import { Locations } from './locations';

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
                        new Locations(),
                        direction.goToNextLocation(startingAt),
                        direction
                    )
            )
            .find(state => notEmpty(map.getCharacterAt(state.location)));
    }

    private constructor(
        private readonly map: AsciiMap,
        private readonly locations: Locations,
        private readonly location: AsciiMapLocation,
        private readonly direction: Direction
    ) {}

    goToNextLocation(): State {
        const character = this.map.getCharacterAt(this.location);

        if (!notEmpty(character)) {
            throw new Error(
                'Invalid map at ' +
                    JSON.stringify([this.location, this.direction])
            );
        }

        const nextDirection = shouldTurn(character)
            ? existsOrThrow(this.getPossibleDirections()[0])
            : this.direction;

        return new State(
            this.map,
            this.locations,
            nextDirection.goToNextLocation(this.location),
            nextDirection
        );
    }

    private getPossibleDirections(): Direction[] {
        const allDirectionsWithCurrentFirst = [
            this.direction,
            ...Direction.getAll().filter(
                direction => direction !== this.direction
            )
        ];

        return allDirectionsWithCurrentFirst.filter(
            direction =>
                !direction.isOpposite(this.direction) &&
                notEmpty(
                    this.map.getCharacterAt(
                        direction.goToNextLocation(this.location)
                    )
                )
        );
    }

    collect(soFar: CollectedLetters): CollectedLetters {
        const character = this.map.getCharacterAt(this.location);
        return {
            letters: this.locations.wasVisited(this.location)
                ? soFar.letters
                : collectLetter(character, soFar.letters),
            path: soFar.path + character
        };
    }

    isEndOfPath(): boolean {
        return isEndCharacter(this.map.getCharacterAt(this.location));
    }
}

export function notEmpty(character: FoundCharacter): boolean {
    return character !== undefined && character !== ' ';
}

export function shouldTurn(character: FoundCharacter): boolean {
    return character !== undefined && !!character.match(/[A-Z+]/);
}

export function collectLetter(
    character: FoundCharacter,
    oldLetters: string
): string {
    return isAToZ(character || '') ? oldLetters + character : oldLetters;
}

function isAToZ(character: string): boolean {
    return !!character.match(/[A-Z]/);
}

export function isEndCharacter(character: FoundCharacter): boolean {
    return character === 'x';
}
