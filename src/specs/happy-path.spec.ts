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

examples.forEach(example =>
    it('Collects letters from ' + example.map, () => {
        expect(followPath(example.map).letters).toBe(example.letters);
    })
);

examples.forEach(example =>
    it('Notes path while following ' + example.map, () => {
        expect(followPath(example.map).path).toBe(example.path);
    })
);
