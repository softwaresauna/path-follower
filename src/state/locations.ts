import { AsciiMapLocation } from '../ascii-map/ascii-map';

export class Locations {
    private readonly locations: AsciiMapLocation[] = [];

    wasVisited(location: AsciiMapLocation): boolean {
        this.locations.push(location);

        const visitedTimes = this.locations.filter(
            visitedLocation =>
                visitedLocation.x === location.x &&
                visitedLocation.y === location.y
        ).length;

        return visitedTimes > 1;
    }
}
