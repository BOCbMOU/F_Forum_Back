import * as mongoose from 'mongoose';
import {
  IUserAdditionalInfoAdd,
  IUserAdditionalInfo,
  IUserAdditionalInfoUpdate,
} from '../types/UserAdditionalInfo';

export const schema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, unique: true, required: true },
    about: { type: String, trim: true, unique: false, required: false },
    communication: { type: Object, unique: false, required: false },
    banner: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const Model = mongoose.model('UserAdditionalInfo', schema);

// add
export const addUserAdditionalInfo = async (model: IUserAdditionalInfoAdd) =>
  (new Model(model).save() as unknown) as IUserAdditionalInfo;

// update
export const updateUserAdditionalInfo = async (
  userId: string,
  update: IUserAdditionalInfoUpdate
) =>
  (Model.findOneAndUpdate({ userId }, update, {
    new: true,
  }) as unknown) as IUserAdditionalInfo;

// get
export const getUserAdditionalInfoByUserId = async (userId: string) =>
  (Model.findOne({ userId }) as unknown) as IUserAdditionalInfo;
