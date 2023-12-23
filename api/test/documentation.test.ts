import request from 'supertest';

import app from '@/app';

describe('Documentation', () => {
  describe('when browsing api root', () => {
    it('lists all available resources', async () => {
      const response = await request(app).get('/');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        resources: [{
          title: 'Page Tree',
          url: 'https://example/pages',
          description: 'a nested data structure representing all pages',
        }],
      });
    });
  });
});
