var express = require('express')
var app = express()


// Module.
var path = require('path')
var bodyParser = require('body-parser')
var socketio = require('socket.io')

// Custom.
var index = require('./routes/index')
var localPassport = require('./auth/local.passport')
var logger = require('./log/logger')

var AuthError = require('./exception/auth.error')


app.set('view engine', 'jade')
app.set('views', path.join(__dirname, './views'))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(localPassport)
app.use('/api', index)



/**
 * ErrorHandler
 */
app.use(function(err, req, res, next) {

  switch(err.constructor) {

    case AuthError:
      logger.info(`${err.name} : ${err.message}`)
      break

    default:
      logger.error(`${err.name} : ${err.message}`)
      break

  }
  //처리..
  res.send({ result : 'fail' })
})



module.exports = app
