import { getAuthTokens } from '../utils';

beforeAll(async () => {
  const { accessToken, refreshToken } = await getAuthTokens();
  global.ACCESS_TOKEN = accessToken;
  global.REFRESH_TOKEN = refreshToken;
});

test('GET /auth/login', async () => {
  expect.assertions(2);
  expect(global.ACCESS_TOKEN).toBeDefined();
  expect(global.REFRESH_TOKEN).toBeDefined();
});
