import { Document } from 'mongoose';

export interface IUser extends IUserAdd, Document {}

export interface IUserAdd extends IUserUpdate {
  username: string;
}

export interface IUserUpdate {
  username?: string;
  avatar?: string;
  status?: string;
}
