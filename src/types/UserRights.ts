import { Document } from 'mongoose';

export interface IUserRights extends IUserRightsAdd, Document {}

export interface IUserRightsAdd extends IUserRightsUpdate {
  userId: string;
}

export interface IUserRightsUpdate {
  adminLevel?: number;
  createGame?: boolean;
  banUsers?: boolean;
  editUsersComments?: boolean;
  editUsersGames?: boolean;
  editUsersRights?: boolean;
}
