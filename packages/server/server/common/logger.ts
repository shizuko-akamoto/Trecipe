import pino from 'pino';

/**
 * logger used to log and optionally pretty-print logs
 */
const l = pino({
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
});

export default l;
