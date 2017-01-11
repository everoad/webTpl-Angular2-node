var express = require('express')
var app = express()

var path = require('path')
var bodyParser = require('body-parser')

var index = require('./routes/index')

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', index)

module.exports = app
