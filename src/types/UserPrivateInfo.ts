import { Document } from 'mongoose';

export interface IUserPrivateInfo extends IUserPrivateInfoAdd, Document {}

export interface IUserPrivateInfoAdd extends IUserPrivateInfoUpdate {
  userId: string;
  email: string;
  password: string;
}

export interface IUserPrivateInfoUpdate {
  email?: string;
  password?: string;
}
