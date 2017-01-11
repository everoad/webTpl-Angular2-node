var express = require('express')
var router = express.Router()
var sha256 = require('sha256')

var userModel = require('../model/userModel')

router.post('/login', (req, res) => {
  var userEmail = req.body.user_email
  var userPwd = req.body.user_pwd
  userModel.login([userEmail], (row, err) => {
    if (err) {
      console.error(err.stack)
    }
    if (row === null) {
      res.send({ result: 'fail-email' })
    } else if (row.user_pwd !== sha256(userPwd)) {
      res.send({ result: 'fail-pwd' })
    } else {
      res.send({ result: 'success' })
    }
  })
})

router.post('/join', (req, res) => {
  var userEmail = req.body.user_email
  var userNick = req.body.user_nick
  var userPwd = sha256(req.body.user_pwd)
  userModel.join([userEmail, userNick, userPwd], (insertId, err) => {
    if (err) {
      console.error(err.stack)
    }
    if (insertId === null) {
      res.send({ result: 'no' })
    } else {
      res.send({ result: 'ok' })
    }
  })
})

module.exports = router
