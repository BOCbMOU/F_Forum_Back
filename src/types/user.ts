import { IDateStamps } from './Model';

export interface IUser extends IUserAdd, IDateStamps {}

export interface IUserAdd extends IUserUpdate {
  username: string;
  avatar: string;
}

export interface IUserUpdate {
  username?: string;
  avatar?: string;
  status?: string;
}
