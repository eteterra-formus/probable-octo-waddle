import request from 'supertest';

import app from '@/app';

describe('Pages Resource', () => {
  describe('with GET action', () => {
    it('responds with a hardcoded page tree', async () => {
      const response = await request(app)
        .get('/pages')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });
});
