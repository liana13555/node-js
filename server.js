const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

const app = express();

const { connectMongo } = require('./src/db/connection');
const { postsRouter } = require('./src/routers/postsRouter');
const { authRouter } = require('./src/routers/authRouter');
const { filesRouter } = require('./src/routers/filesRouter');
const { errorHandler } = require('./src/helpers/apiHelpers');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', postsRouter);  // Определяем логику для рутера
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);
app.use(errorHandler);  // обработчик ошибок

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.error('Error at server launch:', err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
}

start();

