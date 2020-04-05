import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as session from 'express-session';

import './src/utils/loadDotEnv';
import authenticate from './src/middlewares/authenticate';
import defaultErrorHandler from './src/middlewares/defaultErrorHandler';

import authRouter from './src/routes/authRoute';
import indexRouter from './src/routes/indexRoute';
import userRouter from './src/routes/userRoute';

import connectToDB from './src/utils/connectToDB';
import initLogger from './src/utils/logger';

const logger = initLogger('server');

const app = express();

const MongoStore = connectToDB(session);

app.use(cors());
app.use(
  fileUpload({
    limit: { fileSize: +process.env.FILE_SIZE_LIMIT * 1024 * 1024 },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  })
);

app.use(`/api/v${process.env.API_VERSION}/auth`, authRouter);
app.use(`/api/v${process.env.API_VERSION}/users`, authenticate, userRouter);
app.use(`/api/v${process.env.API_VERSION}/`, indexRouter);

app.use('/public', express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public`));
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = +(process.env.PORT || process.env.HOST_PORT);

app.listen(port, host, () => {
  logger.log(
    'info',
    `App is running at http://${host}:${port} in ${app.get('env')} mode.`
  );
});
