import { IHandler } from '../types/Handler';

const asyncMiddleware = (fn: IHandler): IHandler => (req, res, next) => {
  // eslint-disable-next-line promise/no-callback-in-promise
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncMiddleware;
