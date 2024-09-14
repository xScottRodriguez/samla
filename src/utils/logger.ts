import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.colorize(),

    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.printf(
      ({
        level,
        message,
        label = 'API',
        timestamp,
        ...meta
      }: winston.Logform.TransformableInfo) => {
        let log = `${timestamp} [${label}] ${level}: ${JSON.stringify(
          message,
          null,
          2,
        )}`
        if (Object.keys(meta).length) {
          log += `\n${JSON.stringify(meta, null, 2)}`
        }
        return log
      },
    ),
  ),
  transports: [new winston.transports.Console({ level: 'silly' })],
})
export { logger }
