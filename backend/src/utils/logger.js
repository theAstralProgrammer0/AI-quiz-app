'use-strict';

/* define a bool flag for env type */
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/* define timestamp for right date format */
function timestamp() {
  return new Date().toISOString();
}

/* define format msg; use Winston/Pino pattern */
function formatMessage(level, message, meta) {
  const base = `[${timestamp()}] [${level.toUpperCase()}] ${message}`;
  if (meta && Object.keys(meta).length > 0) {
    return IS_PRODUCTION ? base + ' ' + JSON.stringify(meta) : base;
  }
  return base;
}

/* define logger and its methods */
const logger = {
  info(message, meta = {}) {
    console.log(formatMessage('info', message, meta));
  },
  warn(message, meta = {}) {
    console.log(formatMessage('warn', message, meta));
  },
  error(message, meta = {}) {
    if (meta instanceof Error) {
      console.error(formatMessage('error', message, {}), meta.stack || meta.message);
    } else {
      console.error(formatMessage('error', message, meta));
    }
  },
  debug(message, meta = {}) {
    if (!IS_PRODUCTION) {
      console.debug(formatMessage('debug', message, meta));
    }
  },
}

module.exports = logger;
