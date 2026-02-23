'use-strict'; 

// import dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

// import routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const quizRoutes = require('./routes/quiz.routes');
const analyticsRoutes = require('./routes/analytics.routes');

// import middleware
const { requestLogger } = require('./middleware/request-logger');
const { notFound } = require('./middleware/not-found');
const { errorHandler } = require('./middleware/error-handler');

// import utils
const logger = require('./utils/logger');

/* Core Express App Setup */
const app = express();

/* use middlewares */

/* security middlewares */
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
/* rate limiting middleware */
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
});
app.use(globalRateLimiter);
/* body parser middlewares */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
/* request logger middleware */
app.use(requestLogger);

/* mount routes */
const prefix = process.env.API_PREFIX || '/api/v1';
app.use(`${prefix}/user`, userRoutes);
app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/quiz`, quizRoutes);
app.use(`${prefix}/analytics`, analyticsRoutes);

/* health check */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Quiz Platform API is healthy',
    timestamp: new Date().toISOString,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.NPM_VERSION || '11.7.0',
  });
  logger.info('Health check successful');
});
/* error middlewares */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
