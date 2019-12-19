export function existsOrThrow<T>(found: T | undefined): T {
    if (found !== undefined) {
        return found;
    }

    throw new Error('Not found!');
}
