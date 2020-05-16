import * as mongoose from 'mongoose';
import {
  IUserRightsAdd,
  IUserRights,
  IUserRightsUpdate,
} from '../types/UserRights';

export const schema = new mongoose.Schema(
  {
    userId: { type: String, trim: true, unique: true, required: true },
    adminLevel: { type: Number, trim: true, default: 0 },
    createGame: { type: Boolean, trim: true, default: false },
    banUsers: { type: Boolean, trim: true, default: false },
    editUsersComments: { type: Boolean, trim: true, default: false },
    editUsersGames: { type: Boolean, trim: true, default: false },
    editUsersRights: { type: Boolean, trim: true, default: false },
  },
  { timestamps: true }
);

const Model = mongoose.model('UserRights', schema);

// add
export const addUserPrivateInfo = async (model: IUserRightsAdd) =>
  (new Model(model).save() as unknown) as IUserRights;

// update
export const updateUserPrivateInfo = async (
  userId: string,
  update: IUserRightsUpdate
) =>
  (Model.findOneAndUpdate({ userId }, update, {
    new: true,
  }) as unknown) as IUserRights;

// get
export const getUserRightsById = async (_id: string) =>
  (Model.findById(_id) as unknown) as IUserRights;

export const getUserRightsByUserId = async (userId: string) =>
  (Model.findOne({ userId }) as unknown) as IUserRights;

export const getUsersRightsByRights = async (
  rights: IUserRights,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find(rights, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IUserRights[];
