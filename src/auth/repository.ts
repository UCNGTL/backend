import fs from 'fs/promises';
import path from 'path';

import { sign, verify } from 'jsonwebtoken';

import config from '../utils/config';

import type { JWTPayload } from './types';

const generateAccessToken = async (ssn: string): Promise<string> => {
  const privateKey = await fs.readFile(
    path.resolve(`./security/${config.security.accessTokenPrivateKeyFilename}`),
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

const generateRefreshToken = async (ssn: string): Promise<string> => {
  const privateKey = await fs.readFile(
    path.resolve(
      `./security/${config.security.refreshTokenPrivateKeyFilename}`,
    ),
  );

  return await new Promise((resolve, reject) => {
    sign(
      { ssn },
      privateKey,
      { algorithm: 'RS256', expiresIn: '24h' },
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
    path.resolve(`./security/${config.security.accessTokenPublicKeyFilename}`),
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

const verifyRefreshToken = async (
  refreshToken: string,
): Promise<JWTPayload> => {
  const publicKey = await fs.readFile(
    path.resolve(`./security/${config.security.refreshTokenPublicKeyFilename}`),
  );

  return await new Promise((resolve, reject) => {
    verify(
      refreshToken,
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

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
