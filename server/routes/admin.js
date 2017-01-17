var express = require('express')
var router = express.Router()

var adminModel = require('../model/adminModel')
var security = require('../auth/my-security')('user', 'user_email', 'user_role')



router.use(security.hasRole([ "ROLE_ADMIN" ]))


router.route('/menu')

.get((req, res) => {
  adminModel.getMenu((err, rows) => {
    if (err) { 
      logger.error(`${err.name} : ${err.message}`)
      return res.send({ result: 'fail' })
    }
    res.send(rows)
  })
})

.put((req, res) => {

})




router.route('/home')

.get((req, res) => {
  res.send('hello')
})

.put((req, res) => {

})



module.exports = router