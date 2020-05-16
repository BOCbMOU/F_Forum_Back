import * as mongoose from 'mongoose';
import { IUserAdd, IUserUpdate, IUser } from '../types/User.t';

export const schema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    avatar: { type: String, trim: true, unique: false, required: false },
    status: {
      type: String,
      trim: true,
      unique: false,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

const Model = mongoose.model('User', schema);

// add
export const addUser = async (model: IUserAdd) =>
  (new Model(model).save() as unknown) as IUser;

// update
export const updateUser = async (username: string, update: IUserUpdate) =>
  (Model.findOneAndUpdate({ username }, update, {
    new: true,
  }) as unknown) as IUser;

// get
export const getUserById = async (_id: string) =>
  (Model.findById(_id) as unknown) as IUser;

export const getUserByName = async (username: string) =>
  (Model.findOne({ username }) as unknown) as IUser;

export const getUsersByStatus = async (
  status: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find({ status }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IUser[];

Model.schema
  .path('username')
  .validate(
    async (username: string) => !(await getUserByName(username)),
    'Username is already in use!'
  );
