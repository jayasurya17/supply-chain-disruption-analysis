;`use strict`

let createError = require('http-errors')
let express = require('express')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
import config from '../config'
import cors from 'cors'
import constants from '../src/utils/constants'

// router for modules
let usersRouter = require('../src/modules/user/router/users')
let filtersRouter = require('../src/modules/filter/router/filters')
let analysisRouter = require('../src/modules/analyzedData/router/analyzedData')

// database connections
require('../src/models/mongoDB/index')

let app = express()

let port = process.env.PORT || 9000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public/', express.static('./public/'))

// use cors to allow cross origin resource sharing
app.use(cors({ 
    origin: true, // Origin: true allows request from all URL's.
    credentials: true,
}))

// base routes for modules
app.use('/users', usersRouter)
app.use('/filters', filtersRouter)
app.use('/analysis', analysisRouter)

// Ping route to check health of instance for load balancer
app.get('/ping', (req, res) => {
  return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send()
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(config.port, () =>
  console.log(`Backend server listening on ${port}`)
)
module.exports = app
