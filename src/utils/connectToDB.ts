import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';

import initLogger from './logger';

const logger = initLogger('server');

const connectToDB = (session) => {
  const MongoStore = mongo(session);

  // mongoose.Promise = global.Promise;

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('error', () => {
    logger.error(
      'MongoDB connection error. Please make sure MongoDB is running.'
    );
    throw new Error(
      'MongoDB connection error. Please make sure MongoDB is running.'
    );
  });
  mongoose.connection.once('open', () =>
    logger.info('MongoDB has been connected.')
  );

  return MongoStore;
};

export default connectToDB;
