var express = require('express')
var router = express.Router()
var path = require('path')
var indexModel = require('../model/indexModel')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage })

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
  let img = decodeURIComponent(req.query.img)
  console.log(img)
  res.sendFile(path.join(__dirname, '../public/uploads/' + img))
})

router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.filename, req.file.originalname)
  res.send({
    uploadFileName: req.file.filename,
    originalFileName: req.file.originalname
  })
})

module.exports = router
