import { AsciiMap, AsciiMapLocation } from '../ascii-map/ascii-map';
import { notEmpty, State } from './state';

describe('finds initial state', () => {
    const examples: Array<{
        startingAt: AsciiMapLocation;
        onMap: string;
        leadsTo: AsciiMapLocation;
    }> = [
        {
            startingAt: { x: 1, y: 1 },
            onMap: ['abc', 'def', 'ghi'].join('\n'),
            leadsTo: { x: 1, y: 0 }
        }
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            expect(
                State.from(
                    AsciiMap.fromString(example.onMap),
                    example.startingAt
                ).location
            ).toEqual(example.leadsTo);
        })
    );
});

