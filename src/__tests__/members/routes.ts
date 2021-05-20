import supertest from 'supertest';

import app from '../../app';
import type { CreateJSONPayloadSignature } from '../../utils/createResponsePayload';
import {
  placeAuthTokensIntoGlobalNamespace,
  tearDownConnections,
} from '../utils';

beforeAll(placeAuthTokensIntoGlobalNamespace);

describe('GET /members', () => {
  it('should return members', async () => {
    const response = await supertest(app)
      .get('/members')
      .set({
        Authorization: `Bearer ${global.CHIEF_LIBRARIAN_ACCESS_TOKEN}`,
      })
      .expect(200);
    const body = response.body as CreateJSONPayloadSignature;
    expect(body.status).toEqual(200);
    expect(body.message).toEqual('Ok');
    expect(body.errors).toHaveLength(0);
  });
});

describe('GET /members/:ssn', () => {
  it('should return specific member', async () => {
    const response = await supertest(app)
      .get('/members/LXFEBFS1DIM')
      .set({
        Authorization: `Bearer ${global.CHIEF_LIBRARIAN_ACCESS_TOKEN}`,
      })
      .expect(200);
    const body = response.body as CreateJSONPayloadSignature;
    expect(body.status).toEqual(200);
    expect(body.message).toEqual('Ok');
    expect(body.errors).toHaveLength(0);
  });
});

afterAll(tearDownConnections);
