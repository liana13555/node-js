const mongoose = require('mongoose')

const app = require('../app')

const { PORT = 3031 } = process.env
const { DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
