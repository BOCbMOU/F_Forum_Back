import { IError } from '../types/Error';
import { IRequest, IResponse, INext } from '../types/ExpressUse';

import initLogger from '../utils/logger';

const logger = initLogger('middlewares/authenticate');

const defaultErrorHandler = (
  error: IError,
  _req: IRequest,
  res: IResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: INext
) => {
  logger.error(`${error.name}:${error.status} - ${error.message}`);
  res.status(error.status).send({ error: error.message });
};

export { defaultErrorHandler };
