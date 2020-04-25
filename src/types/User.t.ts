import { Document } from 'mongoose';

export interface IUserUpdate {
  username?: string;
  avatar?: string;
  status?: string;
}

export interface IUserAdd extends IUserUpdate {
  username: string;
}

export interface IUser extends IUserAdd, Document {
  updatedAt: string;
  createdAt: string;
}
