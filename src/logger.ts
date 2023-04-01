import winston from 'winston'
import { bot } from './bot.js'

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  if (level === 'error') {
    bot.sendMessage(215111089,`[${timestamp}][ALERT]: ${message}`)
  }

  return `[${timestamp}][${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    myFormat
  ),
  defaultMeta: { service: 'drtnu-status-checker-bot' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}
