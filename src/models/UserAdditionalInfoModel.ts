import * as mongoose from 'mongoose';
import {
  IUserAdditionalInfoAdd,
  IUserAdditionalInfo,
  IUserAdditionalInfoUpdate,
} from '../types/UserAdditionalInfo';

export const userAdditionalInfoSchema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, unique: true, required: true },
    about: { type: String, trim: true, unique: false, required: false },
    communication: { type: Object, unique: false, required: false },
    banner: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model(
  'UserAdditionalInfo',
  userAdditionalInfoSchema
);

export const addUserAdditionalInfo = async (model: IUserAdditionalInfoAdd) =>
  (new UserModel(model).save() as unknown) as IUserAdditionalInfo;

export const updateUserAdditionalInfo = async (
  userId: string,
  update: IUserAdditionalInfoUpdate
) =>
  (UserModel.findOneAndUpdate({ userId }, update, {
    new: true,
  }) as unknown) as IUserAdditionalInfo;

export const getUserAdditionalInfoByUserId = async (userId: string) =>
  (UserModel.findOne({ userId }) as unknown) as IUserAdditionalInfo;
