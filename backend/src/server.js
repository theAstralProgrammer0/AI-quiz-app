'use strict';

// imports
const app = require('./app');
const { connectDatabase } = require('./config/database');
const logger = require('./utils/logger');
require('dotenv').config();

// define host and port
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // connect to MongoDB
    await connectDatabase();
    logger.info('Database connection established');
    // start HTTP server
    const server = app.listen(PORT, HOST, () => {
      logger.info(`Server  running on http://${HOST}:${PORT}`);
      logger.info(`Environemt:  ${process.env.NODE_ENV || 'development'}`);
    });
    // graceful shutdown handlers
    const shutdown = (signal) => {
      if signal === 'SIGTERM' || 'SIGINT':
        logger.info(`${signal} received. Cleaning up and shutting down gracefully...`);
        server.close(() => {
          logger.info('HTTP server closed');
          process.exit(0);
        });
        // force shutdown after 10s
        setTimeout(() => {
          logger.error('Forced shutdown after timeout');
          process.exit(1);
        }, 10_000);
      logger.info(`${signal} signal is unrecognized.`);
      process.exit(1);
    };

    process.on('SIGTERM', shutdown('SIGTERM'));
    process.on('SIGINT', shutdown('SIGINT'));
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // process.exit(1);
    });
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server due to ', error);
    process.exit(1);
  }
}

startServer();
