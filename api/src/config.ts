import assert from 'assert';

/**
 * The URL at which the API will be available at runtime.
 */
export const apiUrl = ({ NODE_ENV } = process.env) => {
  assert.ok(NODE_ENV, 'NODE_ENV must be set.');
  
  return {
    'development': 'http://localhost:5000',
    'test': 'https://example',
    'production': 'https://probable-octo-waddle.ts.r.appspot.com',
  }[NODE_ENV];
};
