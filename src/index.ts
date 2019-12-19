import { AsciiMap } from './ascii-map/ascii-map';
import { followPath } from './path-follower';

const maps = [
    `
            @---A---+
                    |
            x-B-+   C
                |   |
                +---+
            `,
    `
            @
            | C----+
            A |    |
            +---B--+
              |      x
              |      |
              +---D--+
            `,
    `
              @---+
                  B
            K-----|--A
            |     |  |
            |  +--E  |
            |  |     |
            +--E--Ex C
               |     |
               +--F--+
            `
];

maps.map(mapString => followPath(AsciiMap.fromString(mapString))).forEach(
    collected =>
        // tslint:disable-next-line:no-console
        console.log('Letters: ', collected.letters, 'Path: ', collected.path)
);
