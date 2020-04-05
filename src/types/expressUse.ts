import { Request, Response } from 'express';
import { IUser } from './user';

export interface IRequest extends Request {
  user?: IUser;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponse extends Response {}

export type INext = (error?: Error) => void;
