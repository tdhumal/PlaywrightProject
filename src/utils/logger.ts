import winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

const logDirectory = path.resolve(process.cwd(), 'logs');

// Create logs directory if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',

    format: logFormat,

    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(logDirectory, 'execution.log'),
            level: 'debug'
        }),

        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error'
        })
    ],

    exitOnError: false
});