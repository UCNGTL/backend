import supertest from 'supertest';

import app from '../app';

test('GET /books', async () => {
  await supertest(app).get('/books').expect(200);
});
