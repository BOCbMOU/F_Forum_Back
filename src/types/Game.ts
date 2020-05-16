import { Document } from 'mongoose';

export interface IGame extends IGameAdd, Document {}

export interface IGameAdd extends IGameUpdate {
  title: string;
  categoryId: string;
  gameMasterId: string;
}

export interface IGameUpdate {
  title?: string;
  categoryId?: string;
  gameMasterId?: string;
  gameType?: string;
  description?: string;
  isEntryOpen?: string;
  isGameStarted?: string;
  deadline?: string;
}
