var express = require('express')
var app = express()


// Module.
var path = require('path')
var bodyParser = require('body-parser')


// Custom.
var index = require('./routes/index')
var localPassport = require('./auth/local.passport')



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
app.use((err, req, res, next) => {
  if (err) {
    console.error(`${err.name} : ${err.message}`)
  }
  //처리..
})


module.exports = app
