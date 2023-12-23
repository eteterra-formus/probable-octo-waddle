import { apiUrl } from '@/config';
import { AssertionError } from 'assert';

describe('Configuration', () => {
  describe('without NODE_ENV variable', () => {
    it('raises a helpful error message', () => {
      expect(() => apiUrl({})).toThrow(new AssertionError({ message: 'NODE_ENV must be set.' }));
    });
  });

  describe('with NODE_ENV variable', () => {
    it.each`
    env              | url
    ${'development'} | ${'http://localhost:5000'}
    ${'test'}        | ${'https://example'}
    ${'production'}  | ${'https://production'}
    `('returns the expected URL', ({ env, url }) => {
      expect(apiUrl({ NODE_ENV: env })).toEqual(url);
    });
  });
});
