import fs from 'fs/promises';
import path from 'path';

import { sign, verify } from 'jsonwebtoken';

import config from '../utils/config';

import type { JWTPayload } from './types';

const generateAccessToken = async (ssn: string): Promise<string> => {
  const privateKey = await fs.readFile(
    path.resolve(`./security/${config.security.privateKeyFilename}`),
  );

  return await new Promise((resolve, reject) => {
    sign(
      { ssn },
      privateKey,
      { algorithm: 'RS256', expiresIn: '5m' },
      (error, accessToken) => {
        if (error) {
          reject(error);
        }
        resolve(accessToken);
      },
    );
  });
};

const verifyAccessToken = async (accessToken: string): Promise<JWTPayload> => {
  const publicKey = await fs.readFile(
    path.resolve(`./security/${config.security.publicKeyFilename}`),
  );

  return await new Promise((resolve, reject) => {
    verify(
      accessToken,
      publicKey,
      {
        algorithms: ['RS256'],
      },
      (error, payload: JWTPayload) => {
        if (error) {
          reject(error);
        }
        resolve(payload);
      },
    );
  });
};

export { generateAccessToken, verifyAccessToken };
