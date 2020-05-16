import * as mongoose from 'mongoose';
import {
  IUserPrivateInfoAdd,
  IUserPrivateInfo,
  IUserPrivateInfoUpdate,
} from '../types/UserPrivateInfo';

export const schema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const Model = mongoose.model('UserPrivateInfo', schema);

// add
export const addUserPrivateInfo = async (model: IUserPrivateInfoAdd) =>
  (new Model(model).save() as unknown) as IUserPrivateInfo;

// update
export const updateUserPrivateInfo = async (
  userId: string,
  update: IUserPrivateInfoUpdate
) =>
  (Model.findOneAndUpdate({ userId }, update, {
    new: true,
  }) as unknown) as IUserPrivateInfo;

// get
export const getUserPrivateInfoById = async (_id: string) =>
  (Model.findById(_id) as unknown) as IUserPrivateInfo;

export const getUserPrivateInfoByUserId = async (userId: string) =>
  (Model.findOne({ userId }) as unknown) as IUserPrivateInfo;

export const getUserPrivateInfoByEmail = async (email: string) =>
  (Model.findOne({ email }) as unknown) as IUserPrivateInfo;

Model.schema
  .path('email')
  .validate(
    async (email: string) => !(await getUserPrivateInfoByEmail(email)),
    'Email is already in use!'
  );
