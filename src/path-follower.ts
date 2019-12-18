import { AsciiMap, AsciiMapLocation } from './ascii-map/ascii-map';
import { State } from './state/state';

export interface CollectedLetters {
    letters: string;
    path: string;
}

export function followPath(mapString: string): CollectedLetters {
    const map: AsciiMap = AsciiMap.fromString(mapString);

    const start: AsciiMapLocation = map.find('@');

    const state: State = existsOrThrow(State.from(map, start));

    throw Error('TODO!');
}

export function existsOrThrow<T>(found: T | undefined): T {
    if (found !== undefined) {
        return found;
    }

    throw new Error('Not found!');
}
