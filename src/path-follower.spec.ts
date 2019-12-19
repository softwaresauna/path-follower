import { AsciiMap } from './ascii-map/ascii-map';
import { followPath } from './path-follower';

interface Example {
    map: string;
    letters: string;
    path: string;
}

const examples: Example[] = [
    {
        map: `
            @---A---+
                    |
            x-B-+   C
                |   |
                +---+
            `,
        letters: 'ACB',
        path: '@---A---+|C|+---+|+-B-x'
    },
    {
        map: `
            @
            | C----+
            A |    |
            +---B--+
              |      x
              |      |
              +---D--+
            `,
        letters: 'ABCD',
        path: '@|A+---B--+|+----C|-||+---D--+|x'
    },
    {
        map: `
              @---+
                  B
            K-----|--A
            |     |  |
            |  +--E  |
            |  |     |
            +--E--Ex C
               |     |
               +--F--+
            `,
        letters: 'BEEFCAKE',
        path: '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex'
    }
];

describe('While following path', () => {
    examples.forEach((example, index) =>
        describe('on map ' + (index + 1), () => {
            it('collects letters', () => {
                expect(
                    followPath(AsciiMap.fromString(example.map)).letters
                ).toBe(example.letters);
            });

            it('notes path', () => {
                expect(followPath(AsciiMap.fromString(example.map)).path).toBe(
                    example.path
                );
            });
        })
    );
});
