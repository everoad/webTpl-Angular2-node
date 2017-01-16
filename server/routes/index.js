var express = require('express')
var router = express.Router()

//Module.
var path = require('path')
var multer = require('multer')

//custom
var indexModel = require('../model/indexModel')


/**
 * Multer for Upload.
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /gi, '-'))
  }
})
var upload = multer({ storage: storage })



/**
 * IndexRouter uses other routers.
 */
var auth = require('./auth')
var board = require('./board')
var admin = require('./admin')
router.use('/auth', auth)
router.use('/board', board)
router.use('/admin', admin)



/**
 * Returns index.jade
 */
router.get('/', (req, res) => {
  res.render('index')
})





/**
 * Returns lists of menu.
 */
router.get('/menu', (req, res, next) => {
  
  indexModel.getMenuFir((err, menuFir) => {
    if (err) { throw err }
    req.menuFir = menuFir
    next()
  })
})

router.get('/menu', (req, res) => {
  var menuFir = req.menuFir
  menuFir.map((fir, index) => {
    indexModel.getMenuSec([fir.menu_fir_seq], (err, menuSec) => {
      if (err) { throw err }
      fir['menu_sec'] = menuSec
      if (index === (menuFir.length - 1)) {
        res.send(menuFir)
      }
    })
  })
})






/**
 * Returns lists of main.
 */
router.get('/main', (req, res, next) => {
 
  indexModel.getMenuFir((err, menuFir) => {
    if (err) { throw err }
    req.menuFir = menuFir
    next()
  })
})

router.get('/main', (req, res) => {
  var menuFir = req.menuFir
  menuFir.map((fir, index) => {
    indexModel.getMainAll([fir.menu_fir_seq], (err, boards) => {
      if (err) { throw err }
      fir['menu_sec'] = boards
      if ((index + 1) === menuFir.length) {
        res.send(menuFir)
      }
    })
  })
})






/**
 * Returns img file.
 * @param {string} img - image name
 */
router.get('/public/uploads/:img', (req, res) => {
  let img = decodeURIComponent(req.params.img)
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
