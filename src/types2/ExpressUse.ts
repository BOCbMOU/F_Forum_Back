import { Request, Response } from 'express';
import { IUserAdd } from './user';

export interface IRequest extends Request {
  user?: IUserAdd;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponse extends Response {}

export type INext = (error?: Error) => void;
