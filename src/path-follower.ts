import { AsciiMap, AsciiMapLocation } from './ascii-map/ascii-map';
import { CollectedLetters, State } from './state/state';

export function followPath(map: AsciiMap): CollectedLetters {
    const start: AsciiMapLocation = map.find('@');

    let state: State = existsOrThrow(State.from(map, start));
    let collectedLetters: CollectedLetters = { letters: '', path: '' };

    while (true) {
        collectedLetters = state.collect(collectedLetters);

        if (state.isEndOfPath()) {
            return collectedLetters;
        }

        state = state.goToNextLocation();
    }
}

export function existsOrThrow<T>(found: T | undefined): T {
    if (found !== undefined) {
        return found;
    }

    throw new Error('Not found!');
}
