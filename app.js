require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.DB_PORT || 3000
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./src/routes/index')
const response = require('./src/helpers/response');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/images', express.static('./uploads'))

// routes
app.use('/api', routes)

// error handling
app.use((err, req, res, next) => {
  response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))
