import { setParsedCookie } from '../cookies';

test('sets a cookie', () => {
expect(document.cookie).toBe('');
const starsValue = {1: 0, 2: 0}
setParsedCookie('stars', starsValue);
expect(document.cookie).toBe(`stars=${JSON.stringify(starsValue)}`);
});
