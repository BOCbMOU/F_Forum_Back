import * as mongoose from 'mongoose';
import { IGameAdd, IGame, IGameUpdate } from '../types/Game';

export const schema = new mongoose.Schema(
  {
    title: { type: String, trim: true, unique: false, required: true },
    categoryId: { type: String, trim: true, unique: false, required: true },
    gameMasterId: { type: String, trim: true, unique: false, required: true },
    gameType: { type: String, trim: true, default: 'default' },
    description: { type: String, trim: true, default: '' },
    isEntryOpen: { type: Boolean, trim: true, default: false },
    isGameStarted: { type: Boolean, trim: true, default: false },
    deadline: { type: String, trim: true },
  },
  { timestamps: true }
);

const Model = mongoose.model('Game', schema);

// add
export const addGame = async (model: IGameAdd) =>
  (new Model(model).save() as unknown) as IGame;

// update
export const updateGame = async (_id: string, update: IGameUpdate) =>
  (Model.findOneAndUpdate({ _id }, update, {
    new: true,
  }) as unknown) as IGame;

// get
export const getGameById = async (_id: string) =>
  (Model.findById(_id) as unknown) as IGame;

export const getCategoriesByTitle = async (
  title: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find({ title }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IGame[];

export const getCategoriesByGameId = async (
  GameId: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find({ GameId }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as IGame[];
