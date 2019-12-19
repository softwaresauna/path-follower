import {
    AsciiMap,
    AsciiMapLocation,
    FoundCharacter
} from '../ascii-map/ascii-map';
import { Direction } from '../direction/direction';
import { existsOrThrow } from '../utils';
import { VisitedLocations } from './visited-locations';

export interface CollectedLetters {
    readonly letters: string;
    readonly path: string;
}

export class State {
    static from(
        map: AsciiMap,
        startingAt: AsciiMapLocation
    ): State | undefined {
        const visited = new VisitedLocations();

        return Direction.getAll()
            .map(
                direction =>
                    new State(
                        map,
                        visited,
                        direction.goToNextLocation(startingAt),
                        direction
                    )
            )
            .find(state => isOnPath(map.getCharacterAt(state.location)));
    }

    private constructor(
        private readonly map: AsciiMap,
        private readonly visited: VisitedLocations,
        private readonly location: AsciiMapLocation,
        private readonly direction: Direction
    ) {}

    goToNextLocation(): State {
        const character = this.map.getCharacterAt(this.location);

        if (!isOnPath(character)) {
            throw new Error(
                'Invalid map at ' +
                    JSON.stringify([this.location, this.direction])
            );
        }

        const nextDirection = shouldTurn(character)
            ? existsOrThrow(this.getNextDirection())
            : this.direction;

        return new State(
            this.map,
            this.visited,
            nextDirection.goToNextLocation(this.location),
            nextDirection
        );
    }

    private getNextDirection(): Direction | undefined {
        const allDirectionsWithCurrentFirst = [
            this.direction,
            ...Direction.getAll().filter(
                direction => direction !== this.direction
            )
        ];

        return allDirectionsWithCurrentFirst.find(
            direction =>
                !direction.isOpposite(this.direction) &&
                isOnPath(
                    this.map.getCharacterAt(
                        direction.goToNextLocation(this.location)
                    )
                )
        );
    }

    collect(soFar: CollectedLetters): CollectedLetters {
        const character = this.map.getCharacterAt(this.location);
        return {
            letters: this.visited.wasVisited(this.location)
                ? soFar.letters
                : collectLetter(character, soFar.letters),
            path: soFar.path + character
        };
    }

    isEndOfPath(): boolean {
        return isEndCharacter(this.map.getCharacterAt(this.location));
    }
}

export function isOnPath(character: FoundCharacter): boolean {
    return character !== undefined && character !== ' ';
}

export function shouldTurn(character: FoundCharacter): boolean {
    return character !== undefined && !!character.match(/[A-Z+]/);
}

export function collectLetter(
    character: FoundCharacter,
    oldLetters: string
): string {
    return isAToZ(character) ? oldLetters + character : oldLetters;
}

function isAToZ(character: FoundCharacter): boolean {
    return character !== undefined && !!character.match(/[A-Z]/);
}

export function isEndCharacter(character: FoundCharacter): boolean {
    return character === 'x';
}
