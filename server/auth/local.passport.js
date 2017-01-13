var express = require('express')

var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var sha256 = require('sha256')
var userModel = require('../model/userModel')

var app = module.exports = express()



/**
 * Passport에서 session을 사용.
 */
app.use(session({
  secret: 'sadf@#$@#%SDF2342123@!#SFD',
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())




/**
 * 로그인 성공시 session만드는 메소드.
 */
passport.serializeUser(function(user, done) {
  console.log('serialize', user)
  done(null, user.user_email)
})



/**
 * 로그인 후 유저 조회 메소드.
 * request마다 호출됨.
 */
passport.deserializeUser(function(id, done) {
  userModel.getOne([ id ], function (err, user) {
    done(err, user)
  })
})



/**
 * 로그인 처리.
 */
passport.use(new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_pwd'
  },
  function(username, password, done) {
    userModel.getOne([ username ], function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (user.user_pwd !== sha256(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
))