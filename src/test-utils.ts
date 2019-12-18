import { AsciiMapLocation } from './ascii-map/ascii-map';

export type CompactLocation = [number, number];

export function unpackLocation(location: CompactLocation): AsciiMapLocation {
    return { x: location[0], y: location[1] };
}
