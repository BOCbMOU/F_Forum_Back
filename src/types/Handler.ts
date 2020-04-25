import { IRequest, IResponse, INext } from './ExpressUse';

export type IHandler = (
  req: IRequest,
  res: IResponse,
  next?: INext
) => Promise<void> | void;
