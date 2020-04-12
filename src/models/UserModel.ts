import * as mongoose from 'mongoose';
import { IUserAdd } from '../types/User';

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

const updateUser = async (username: string, update) =>
  UserModel.findOneAndUpdate({ username }, update, { new: true });

const getUserByName = async (username) => UserModel.findOne({ username });

const getUserByEmail = async (email) => UserModel.findOne({ email });

const getUsersByAccessLevel = async (accessLevel, { skip, limit }) =>
  UserModel.find({ accessLevel }, null, { skip, limit }).sort({
    createdAt: 1,
  });

UserModel.schema
  .path('username')
  .validate(
    async (username) => !(await getUserByName(username)),
    'Username is already in use!'
  );

UserModel.schema
  .path('email')
  .validate(
    async (email) => !(await getUserByEmail(email)),
    'Email is already in use!'
  );

export {
  addUser,
  updateUser,
  getUserByName,
  getUserByEmail,
  getUsersByAccessLevel,
  userSchema,
};
