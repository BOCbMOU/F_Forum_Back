import { createLogger, format, transports, Logger } from 'winston';

const { combine, timestamp, label, printf, colorize, align, splat } = format;

const logsFormat = printf((info) => {
  const ts = (info.timestamp as string).slice(0, 19).replace('T', ' ');
  return `${ts} <${info.level.toUpperCase()}> ${info.label}: ${info.message}`;
});

const initLogger = (fileName: string): Logger => {
  let level = 'info';
  if (process.env.DEBUG) {
    level = 'debug';
  }
  const consoleLogger = new transports.Console({
    level,
    format: combine(
      colorize(),
      timestamp(),
      align(),
      label({ label: fileName }),
      splat(),
      logsFormat
    ),
  });
  const fileLogger = new transports.File({
    filename: 'logs/combined.log',
    level: 'debug',
    maxsize: 5242880, // 5 mb
    maxFiles: 2,
    format: combine(
      timestamp(),
      align(),
      label({ label: fileName }),
      splat(),
      logsFormat
    ),
  });
  const transportsArray = [fileLogger] as (
    | transports.FileTransportInstance
    | transports.ConsoleTransportInstance
  )[];
  if (process.env.NODE_ENV !== 'test') {
    transportsArray.push(consoleLogger);
  }
  return createLogger({
    transports: transportsArray,
  });
};

export default initLogger;

// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// }
