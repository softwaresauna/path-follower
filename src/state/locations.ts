import { AsciiMapLocation } from '../ascii-map/ascii-map';

export class Locations {
    private readonly locations: AsciiMapLocation[] = [];

    wasVisited(location: AsciiMapLocation): boolean {
        const visited = !!this.locations.find(
            visitedLocation =>
                visitedLocation.x === location.x &&
                visitedLocation.y === location.y
        );

        if (!visited) {
            this.locations.push(location);
        }

        return visited;
    }
}
