var express = require('express')
var router = express.Router()

var adminModel = require('../model/adminModel')
var security = require('../auth/my-security')('user', 'user_email', 'user_role')



//router.use(security.hasRole([ "ROLE_ADMIN" ]))


router.route('/menu')

.put((req, res) => {
  console.log(req.body)
  res.send({ result: 'success' })
})




router.route('/home')

.get((req, res) => {
  res.send('hello')
})

.put((req, res) => {

})



module.exports = router