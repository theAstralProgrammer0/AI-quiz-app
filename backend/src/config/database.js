'use-strict';

/* imports */
const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

/* define MONGODB_URI & mongooseOPtions */
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@admincluster.mhwwh9n.mongodb.net/ai-quiz-platform?retryWrites=true&w=majority`;
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
}

/* define connectDatabase */
async function connectDatabase() {
  const timestamp = new Date().toISOString();
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log(`[${timestamp}] [INFO] MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`[${timestamp}] [ERROR] MongoDB connection error: `, error);
    throw error;
  }
}

/* handle other connection states besides "connected" */
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});
mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

/* define disconnectDatabase */
async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('MongoDB disconnected gracefully');
}

module.exports = { connectDatabase, disconnectDatabase };
