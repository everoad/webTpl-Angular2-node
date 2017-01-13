var express = require('express')
var router = express.Router()

var path = require('path')
var indexModel = require('../model/indexModel')

/**
 * Multer for Upload.
 */
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(' '/gi, '-'))
  }
})
var upload = multer({ storage: storage })



/**
 * IndexRouter uses other routers.
 */
var auth = require('./auth')
var board = require('./board')
router.use('/auth', auth)
router.use('/board', board)



/**
 * Returns index.jade
 */
router.get('/', (req, res) => {
  res.render('index')
})


/**
 * Returns lists of menu.
 */
router.get('/menu', (req, res) => {
  var promise = new Promise((resolve, reject) => {
    indexModel.getMenuFir((menuFir, err) => {
      if (err) {
        console.error(err.stack)
      }
      resolve(menuFir)
    })
  })
  promise.then(menuFir => menuFir.map((fir, index) => {
    indexModel.getMenuSec([fir.menu_fir_seq], (menuSec, err) => {
      if (err) {
        console.error(err.stack)
      }
      fir['menu_sec'] = menuSec
      if (index === (menuFir.length - 1)) {
        res.send(menuFir)
      }
    })
  })).catch(err => console.error(err.stack))
})


/**
 * Returns lists of main.
 */
router.get('/main', (req, res) => {
  var promise = new Promise((resolve, reject) => {
    indexModel.getMenuFir((menuFir, err) => {
      if (err) {
        console.error(err.stack)
      }
      resolve(menuFir)
    })
  })
  promise.then(menuFir => menuFir.map((fir, index) => {
    indexModel.getMainAll([fir.menu_fir_seq], (boards, err) => {
      if (err) {
        console.error(err)
      }
      fir['menu_sec'] = boards
      if ((index + 1) === menuFir.length) {
        res.send(menuFir)
      }
    })
  }))
})




/**
 * Returns img file.
 * @param {string} img - image name
 */
router.get('/img', (req, res) => {
  let img = decodeURIComponent(req.query.img)
  res.sendFile(path.join(__dirname, '../public/uploads/' + img))
})




/**
 * Upload image file.
 * Returns edited filename & originalFileName.
 * @param {File} file
 */
router.post('/upload', upload.single('file'), (req, res) => {
  res.send({
    uploadFileName: req.file.filename,
    originalFileName: req.file.originalname
  })
})

module.exports = router
