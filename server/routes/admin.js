var express = require('express')
var router = express.Router()

var adminModel = require('../model/adminModel')
var security = require('../auth/my-security')



router.use(security.isAdmin)


router.route('/menu')

.get((req, res) => {
  adminModel.getMenu((err, rows) => {
    if (err) { throw err }
    res.send(rows)
  })
})

.put((req, res) => {

})




router.route('/home')

.get((req, res) => {

})

.put((req, res) => {

})



module.exports = router