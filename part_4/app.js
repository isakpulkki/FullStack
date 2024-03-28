const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const resetRouter = require('./controllers/reset');

mongoose.set('strictQuery', false);

logger.info('Connecting to ' + config.MONGODB_URI + '.');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB.');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB.');
  });

if (process.env.NODE_ENV === 'test') {
    const resetRouter = require('./controllers/reset')
    app.use('/api/reset', resetRouter)
  } 

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);

module.exports = app;
