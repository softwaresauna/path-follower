import { AsciiMap, AsciiMapLocation } from './ascii-map/ascii-map';

export interface CollectedLetters {
    letters: string;
    path: string;
}

export function followPath(mapString: string): CollectedLetters {

    const map: AsciiMap = AsciiMap.fromString(mapString);

    const start: AsciiMapLocation = map.find('@');

    throw Error('TODO!');
}
