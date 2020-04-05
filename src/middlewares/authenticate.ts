import * as jwt from 'jsonwebtoken';
import { UNAUTHORIZED_USER_OBJECT } from '../consts';

import AuthError from '../errors/AuthError';
import { getUserByName as UMGetUserByName } from '../models/UserModel';
import { IRequest, IResponse, INext } from '../types/expressUse';
import { IDecodedToken } from '../types/jsonWebToken';
import { IUser } from '../types/user';

import initLogger from '../utils/logger';

const logger = initLogger('middlewares/authenticate');

const jwtVerify = async (token: string): Promise<IDecodedToken> =>
  Promise.resolve(jwt.verify(token, process.env.JWT_SECRET) as IDecodedToken);

const authenticate = async (req: IRequest, _res: IResponse, next: INext) => {
  const { authorization } = req.headers;
  if (!authorization) {
    req.user = (UNAUTHORIZED_USER_OBJECT as any) as IUser;
    next();
    return;
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    req.user = (UNAUTHORIZED_USER_OBJECT as any) as IUser;
    next();
    return;
  }

  const decodedToken = await jwtVerify(token);
  if (!(decodedToken && decodedToken.data && decodedToken.data.username)) {
    return next(new AuthError('Session ended!'));
  }

  const { username } = decodedToken.data;
  const user = await UMGetUserByName(username);
  if (!user) {
    return next(new AuthError('No such user!'));
  }

  logger.debug(`${username} was successfully authenticated`);
  req.user = user;

  next();
};

export default authenticate;
