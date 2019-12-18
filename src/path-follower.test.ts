import { existsOrThrow } from './path-follower';

describe('returns existing or throw', () => {
    it('returns existing', () => {
        expect(existsOrThrow('any')).toBe('any');
    });

    it('throws when not existing', () => {
        expect(() => existsOrThrow(undefined)).toThrow();
    });
});
