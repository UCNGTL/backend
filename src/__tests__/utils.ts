import supertest from 'supertest';

import app from '../app';
import type { TLoginResponsePayload } from '../auth/types';

const getAuthTokens = async (): Promise<TLoginResponsePayload> => {
  const response = await supertest(app)
    .post('/auth/login')
    .send({
      password: '49E7NJMw',
      ssn: 'AQJOAQD1',
    })
    .expect(200);

  return {
    accessToken: response.body.payload.accessToken,
    refreshToken: response.body.payload.refreshToken,
  };
};

export { getAuthTokens };
