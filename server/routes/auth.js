var express = require('express')
var router = express.Router()

var passport = require('passport')

var sha256 = require('sha256')
var userModel = require('../model/userModel')
var security = require('../auth/my-security')


/**
 * Login.
 * @param {string} user_email
 * @param {string} user_pwd
 */
router.post('/login', security.isAnonymous,
  passport.authenticate('local', { successRedirect: '/api/auth/login/success',
                                  failureRedirect: '/api/auth/login/fail',
                                  failureFlash: false })
)



/**
 * Login Success.
 */
router.get('/login/success', (req ,res) => {
  res.send({ result: 'success',
             user : req.user })
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
    res.send({ result: 'success' })
  })
})





/**
 * Join.
 * @param {string} user_email
 * @param {string} user_nick
 * @param {string} user_pwd
 */
router.post('/join', security.isAnonymous, (req, res, next) => {
  var userEmail = req.body.user_email
  var userNick = req.body.user_nick
  var userPwd = sha256(req.body.user_pwd)
  
  userModel.add([userEmail, userNick, userPwd], (err, insertId) => {
    if (err) { throw err }
    req.userEmail = userEmail
    next()
  })
})

router.post('/join', (req, res) => {
  var userEmail = req.userEmail
  userModel.getOne([userEmail], (err, user) => {
    req.logIn(user, (err) => {
      if (err) { throw err }
      req.session.save(() => {
        res.redirect('/api/auth/login/success')
      })
    })
  })
})


module.exports = router
