import request from 'supertest';

import app from '@/app';

describe('Routing', () => {
  describe('when accessing an unknown route', () => {
    it('responds with a not found message', (done) => {
      request(app)
        .get('/some-other-page')
        .expect(404, done);
    });
  });
});
