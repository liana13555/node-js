const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const { connectMongo } = require('./src/db/connection');

const { postsRouter } = require('./src/routers/postsRouter');
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
})

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

