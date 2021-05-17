import fs from 'fs/promises';
import path from 'path';

import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { sign, verify } from 'jsonwebtoken';

import type { TStaffPersonWithoutPasswordHash } from '../staff/types';
import config from '../utils/config';

const generateAccessToken = async (
  staffPerson: TStaffPersonWithoutPasswordHash,
): Promise<string> => {
  const privateKey = await fs.readFile(
    path.resolve(`./security/${config.security.accessTokenPrivateKeyFilename}`),
  );

  return await new Promise((resolve, reject) => {
    sign(
      staffPerson,
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

const generateRefreshToken = async (
  staffPerson: TStaffPersonWithoutPasswordHash,
): Promise<string> => {
  const privateKey = await fs.readFile(
    path.resolve(
      `./security/${config.security.refreshTokenPrivateKeyFilename}`,
    ),
  );

  return await new Promise((resolve, reject) => {
    sign(
      staffPerson,
      privateKey,
      { algorithm: 'RS256', expiresIn: '24h' },
      (error, refreshToken) => {
        if (error) {
          reject(error);
        }
        resolve(refreshToken);
      },
    );
  });
};

const passwordAndPasswordHashMatches = async (
  password: string,
  passwordHash: string,
) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  if (!isMatch) {
    throw createError(401, 'Provided password is incorrect', { expose: true });
  }
};

const verifyAccessToken = async (
  accessToken: string,
): Promise<TStaffPersonWithoutPasswordHash> => {
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
      (error, { role, ssn }: TStaffPersonWithoutPasswordHash) => {
        if (error) {
          reject(error);
        }
        resolve({ role, ssn });
      },
    );
  });
};

const verifyRefreshToken = async (
  refreshToken: string,
): Promise<TStaffPersonWithoutPasswordHash> => {
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
      (error, { role, ssn }: TStaffPersonWithoutPasswordHash) => {
        if (error) {
          reject(error);
        }
        resolve({ role, ssn });
      },
    );
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  passwordAndPasswordHashMatches,
  verifyAccessToken,
  verifyRefreshToken,
};
