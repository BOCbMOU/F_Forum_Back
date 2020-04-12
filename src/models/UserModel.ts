import * as mongoose from 'mongoose';
import { IUserAdd, IUserUpdate, IUser } from '../types/User.t';

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    avatar: { type: String, trim: true, unique: false, required: false },
    status: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export const addUser = async (model: IUserAdd) =>
  (new UserModel(model).save() as unknown) as IUser;

export const updateUser = async (username: string, update: IUserUpdate) =>
  (UserModel.findOneAndUpdate({ username }, update, {
    new: true,
  }) as unknown) as IUser;

export const getUserById = async (_id: string) =>
  (UserModel.findById(_id) as unknown) as IUser;

export const getUserByName = async (username: string) =>
  (UserModel.findOne({ username }) as unknown) as IUser;

export const getUsersByStatus = async (
  status: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (UserModel.find({ status }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IUser[];

UserModel.schema
  .path('username')
  .validate(
    async (username: string) => !(await getUserByName(username)),
    'Username is already in use!'
  );
