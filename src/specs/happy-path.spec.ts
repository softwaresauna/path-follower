interface Example {
    map: string;
    letters: string;
    path: string;
}

interface CollectedLetters {
    letters: string;
    path: string;
}

function followPath(map: string): CollectedLetters {
    throw Error('TODO!');
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
        letters: 'ABC',
        path: '@---A---+|C|+---+|+-B-x',
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
        path: '@|A+---B--+|+----C|-||+---D--+|x',
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
        path: '@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex',
    },
];

function clean(text: string): string {
    return text
        .split('            ')
        .join('')
        .split('\n')
        .filter(s => s.length > 0)
        .join('↲');
}

describe('While following path', () => {
    examples.forEach(example =>
        describe('on map: ' + clean(example.map), () => {
            it('collects letters', () => {
                expect(followPath(example.map).letters).toBe(example.letters);
            });

            it('notes path', () => {
                expect(followPath(example.map).path).toBe(example.path);
            });
        })
    );
});
