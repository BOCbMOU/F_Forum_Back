import * as mongoose from 'mongoose';
import { IUserAdd, IUserUpdate, IUser } from '../types/User.t';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    avatar: { type: String, trim: true, unique: false, required: false },
    status: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

const addUser = async (model: IUserAdd) =>
  (new UserModel(model).save() as unknown) as IUser;

const updateUser = async (username: string, update: IUserUpdate) =>
  (UserModel.findOneAndUpdate({ username }, update, {
    new: true,
  }) as unknown) as IUser;

const getUserByName = async (username: string) =>
  (UserModel.findOne({ username }) as unknown) as IUser;

const getUsersByStatus = async (
  status: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (UserModel.find({ status }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IUser[];

UserModel.schema
  .path('username')
  .validate(
    async (username) => !(await getUserByName(username)),
    'Username is already in use!'
  );

export { addUser, updateUser, getUserByName, getUsersByStatus, userSchema };
