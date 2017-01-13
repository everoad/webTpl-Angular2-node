var express = require('express')
var router = express.Router()

var passport = require('passport')

var sha256 = require('sha256')
var userModel = require('../model/userModel')


/**
 * Login.
 * @param {string} user_email
 * @param {string} user_pwd
 */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/api/auth/login/success',
                                  failureRedirect: '/api/auth/login/fail',
                                  failureFlash: true })
)


/**
 * Login Success.
 */
router.get('/login/success', (req ,res) => {
  res.send({ result: 'success' })
})


/**
 * Login Fail.
 */
router.get('/login/fail', (req ,res) => {
  res.send({ result: 'fail'})
})



/**
 * Logout.
 */
router.get('/logout', (req, res) => {
  req.logout()
  req.session.save(() => {
    res.send({ result: true })
  })
})




/**
 * Join.
 * @param {string} user_email
 * @param {string} user_nick
 * @param {string} user_pwd
 */
router.post('/join', (req, res, next) => {
  var userEmail = req.body.user_email
  var userNick = req.body.user_nick
  var userPwd = sha256(req.body.user_pwd)
  
  userModel.add([userEmail, userNick, userPwd], (err, insertId) => {
    if (err) {
      console.error(err.stack)
    }
    req.userEmail = userEmail
    next()
  })
})

router.post('/join', (req, res) => {
  var userEmail = req.userEmail
  userModel.getOne([userEmail], (err, user) => {
    console.log(user)
    req.logIn(user, (err) => {
      if (err) { return console.error(err.stack) }
      req.session.save(function() {
        res.redirect('/api/auth/login/success')
      })
    })
  })
})


module.exports = router
