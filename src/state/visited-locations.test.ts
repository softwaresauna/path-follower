import { CompactLocation, unpackLocation } from '../test-utils';
import { VisitedLocations } from './visited-locations';

describe('keeps track of visited locations', () => {
    const examples: Array<[CompactLocation[], boolean[]]> = [
        [[[0, 0]], [false]],
        [
            [
                [0, 0],
                [0, 1],
                [1, 0]
            ],
            [false, false, false]
        ],
        [
            [
                [0, 0],
                [0, 0]
            ],
            [false, true]
        ],
        [
            [
                [1, 3],
                [2, 7],
                [2, 4],
                [1, 3],
                [2, 4]
            ],
            [false, false, false, true, true]
        ]
    ];

    examples.forEach(example =>
        it(JSON.stringify(example), () => {
            const [compactLocations, wereVisited] = example;

            const locations = new VisitedLocations();

            expect(
                compactLocations
                    .map(unpackLocation)
                    .map(location => locations.wasVisited(location))
            ).toEqual(wereVisited);
        })
    );
});
