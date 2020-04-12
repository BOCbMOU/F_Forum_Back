import * as mongoose from 'mongoose';
import { IUserAdd, IUserUpdate } from '../types/User';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    avatar: { type: String, trim: true, unique: false, required: false },
    status: { type: String, trim: true, unique: false, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

const addUser = async (model: IUserAdd) => new UserModel(model).save();

const updateUser = async (username: string, update: IUserUpdate) =>
  UserModel.findOneAndUpdate({ username }, update, { new: true });

const getUserByName = async (username: string) =>
  UserModel.findOne({ username });

const getUsersByStatus = async (
  status: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  UserModel.find({ status }, null, { skip, limit }).sort({
    createdAt: 1,
  });

UserModel.schema
  .path('username')
  .validate(
    async (username) => !(await getUserByName(username)),
    'Username is already in use!'
  );

export { addUser, updateUser, getUserByName, getUsersByStatus, userSchema };
