import { Document } from 'mongoose';

export interface IUserAdditionalInfo extends IUserAdditionalInfoAdd, Document {}

export interface IUserAdditionalInfoAdd extends IUserAdditionalInfoUpdate {
  userId: string;
}

export interface IUserAdditionalInfoUpdate {
  about?: string;
  communication?: { [key: string]: string };
  banner?: string;
}
