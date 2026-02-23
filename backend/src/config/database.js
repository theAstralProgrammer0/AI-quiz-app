'use-strict';

/* imports */
const mongoose = require('mongoose');
const logger = require('./utils/logger');
require('dotenv').config();

/* define MONGODB_URI & mongooseOPtions */
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@admincluster.mhwwh9n.mongodb.net/?appName=mongosh+2.4.2` || process.env.MONGODB_URI;
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

/* define connectDatabase */
async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection error: ', error);
    throw error;
  }
}

/* handle other connection states besides "connected" */
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});
mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected');
});
mongoose.connection.on('error', (error) => {
  logger.error('MongoDB error:', error);
});

/* define disconnectDatabase */
async function disconnectDatabase() {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected gracefully');
}

module.exports = { connectDatabase, disconnectDatabase };
