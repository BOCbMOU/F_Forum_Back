import * as jwt from 'jsonwebtoken';
import { UNAUTHORIZED_USER } from '../consts';

import AuthError from '../errors/AuthError';
import { getUserByName as UMGetUserByName } from '../models/UserModel';
import { IHandler } from '../types/Handler';
import { IDecodedToken } from '../types/JsonWebToken';

import initLogger from '../utils/logger';

const logger = initLogger('middlewares/authenticate');

const jwtVerify = async (token: string) =>
  Promise.resolve(jwt.verify(token, process.env.JWT_SECRET) as IDecodedToken);

const authenticate: IHandler = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    req.user = UNAUTHORIZED_USER;
    return next();
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    req.user = UNAUTHORIZED_USER;
    return next();
  }

  const { data } = await jwtVerify(token);
  if (!data.username) {
    return next(new AuthError('Session ended!'));
  }

  const { username } = data;
  const user = await UMGetUserByName(username);
  if (!user) {
    return next(new AuthError('No such user!'));
  }

  logger.debug(`${username} was successfully authenticated`);
  req.user = user;

  next();
};

export default authenticate;
