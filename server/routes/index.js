var express = require('express')
var router = express.Router()
var path = require('path')
var indexModel = require('../model/indexModel')

var board = require('./board')
var user = require('./user')

router.use('/board', board)
router.use('/user', user)

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/menu', (req, res) => {
  indexModel.getMenu(null, (rows) => {
    res.send(rows)
  })
})

router.get('/img', (req, res) => {
  let img = req.query.img
  res.sendFile(path.join(__dirname, '../public/uploads/' + img))
})

module.exports = router
