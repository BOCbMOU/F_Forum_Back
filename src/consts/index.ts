import { IUser } from '../types/User.t';

export const TOKEN_EXPIRES_IN = '20h';

export const AVATAR_SIZE = 250;

// User defaults
export const UNAUTHORIZED_USER = {
  username: 'UNAUTHORIZED',
} as IUser;

export const DEFAULT_PAGE_SIZE = 20;
