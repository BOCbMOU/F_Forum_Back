import { UNAUTHORIZED_USER } from '../consts/index';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';
import { IResponse } from '../types/ExpressUse';
import { IHandler } from '../types/Handler';
import { IUser } from '../types/User.t';

import initLogger from '../utils/logger';

const logger = initLogger('middlewares/authenticate');

export const getSelf: IHandler = async (req, res) => {
  const { user } = req;

  logger.info('getSelf: %j', { user: user.username });

  if (user.username === UNAUTHORIZED_USER.username) {
    res.status(403).send({ payload: { user: null } });
    return;
  }

  res.status(200).send({ payload: { user } });
};

export const getUserById: IHandler = async (req, res, next) => {
  try {
    const { _id } = req.params as { _id: string };

    logger.info('getUserById: %j', { user: req.user.username });

    const user = await UserModel.getUserById(_id);

    if (!user) {
      noSuchUserError(res);
      return;
    }

    const filledResponse = getFilledResponse(user);

    res.status(200).send(filledResponse);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getUserByName: IHandler = async (req, res, next) => {
  try {
    const { username } = req.params;

    logger.info('getUserByName: %j', { user: req.user.username });

    const user = await UserModel.getUserByName(username);

    if (!user) {
      noSuchUserError(res);
      return;
    }

    const filledResponse = getFilledResponse(user);

    res.status(200).send(filledResponse);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getUsersByStatus: IHandler = async (req, res, next) => {
  try {
    const { status, skip, limit } = req.params;

    logger.info('getUserByName: %j', { user: req.user.username });

    const users = await UserModel.getUsersByStatus(status, {
      skip: +skip,
      limit: +limit,
    });

    if (users.length === 0) {
      noSuchUserError(res);
      return;
    }

    const filteredUsers = users.map((user) => filterUser(user));

    res.status(200).send({ payload: { users: filteredUsers } });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const noSuchUserError = (res: IResponse) => {
  res.status(404).send({ error: 'No such user' });
};

const getFilledResponse = (user: IUser) => {
  const filteredUser = filterUser(user);
  return {
    payload: { user: filteredUser },
  };
};

const filterUser = (user: IUser) => {
  const { username, avatar, status, createdAt } = user;
  return { username, avatar, status, createdAt };
};
