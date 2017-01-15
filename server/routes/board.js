var express = require('express')
var router = express.Router()
var boardModel = require('../model/boardModel')
var HTML = require('html-parse-stringify')


var security = require('../auth/my-security')


router.route('/:menu_fir_seq/:menu_sec_seq')


/**
 * Returns list of content & pagination data.
 * @param {number} index
 * @param {string} menu_fir_seq
 * @param {string} mnue_sec_seq
 * @param {string} stype
 * @param {string} skey
 */
.get((req, res) => {

  let data = JSON.parse(req.query.data)
  var index = data.index
  var stype = data.stype
  var skey = data.skey
  var fir = req.params.menu_fir_seq
  var sec = req.params.menu_sec_seq

  var promise = new Promise((resolve, reject) => {
    boardModel.getTotalDataNum([fir, sec, stype, skey], (err, row) => {
      if (err) { return reject(err) }

      resolve(parseInt(row.total)) 
    })
  })
  .then((total) => {

    var dataPerPage = 12
    var totalPage = Math.ceil(total / dataPerPage)

    totalPage = (totalPage === 0) ? 1 : totalPage
    index = (index < 1) ? 1 : index
    index = (index > totalPage) ? totalPage : index
    var start = (index - 1) * dataPerPage

    boardModel.getAll([fir, sec, start, dataPerPage, stype, skey], (err, rows) => {
      if (err) { throw err }

      res.send({ boards: rows, total: total, dataPerPage: dataPerPage, totalPage: totalPage })
    })
  }).catch(err => { throw err })

})




/**
 * Add content & Returns insertid.
 * @param {string} menu_fir_seq
 * @param {string} menu_sec_seq
 * @param {string} title
 * @param {string} content
 * @param {string} user_email
 */
.post(security.isAuthenticated, (req, res) => {

  var firSeq = req.body.menu_fir_seq
  var secSeq = req.body.menu_sec_seq
  var title = req.body.title
  var content = req.body.content
  var userEmail = req.user.user_email
  var frontImg

  for (let tag of HTML.parse(content)) {
    if (tag.name === 'img') {
      frontImg = tag.attrs.src
      break
    }
  }
  boardModel.add([title, content, frontImg, userEmail, firSeq, secSeq], (err, insertId) => {
    if (err) { throw err }
    res.send({ board_seq: insertId })
  })
})



/**
 * Edit content & returns affectedRows.
 * @param {string} board_seq
 * @param {string} title
 * @param {string} content
 */
.put(security.preAuthorize, (req, res) => {

  var boardSeq = req.body.board_seq
  var title = req.body.title
  var content = req.body.content
  var frontImg

  for (let tag of HTML.parse(content)) {
    if (tag.name === 'img') {
      frontImg = tag.attrs.src
      break
    }
  }
  boardModel.edit([title, content, frontImg, boardSeq], (err, affectedRows) => {
    if (err) { throw err }
    res.send({ result: 'success' })
  })
})



/**
 * Delete content & Returns affectedRows.
 * @param {string} board_seq
 */
.delete(security.preAuthorize, (req, res) => {

  var boardSeq = req.body.board_seq

  boardModel.delete([boardSeq], (err, affectedRows) => {
    if (err) { throw err }
    if (affectedRows === 1) {
      res.send({ result: 'success' })
    } else {
      res.send({ result: 'fail' })
    }
  })
})




/**
 * Returns a content's detail.
 * @param {string} board_seq
 */
router.get('/:menu_fir_seq/:menu_sec_seq/:board_seq', (req, res, next) => {

  var seq = req.params.board_seq

  boardModel.hitUp([seq], (err, affectedRows) => {
    if (err) { throw err }
    if (affectedRows === 1) {
      next()
    }
  })

})
router.get('/:menu_fir_seq/:menu_sec_seq/:board_seq', (req, res) => {
  
  var seq = req.params.board_seq

  boardModel.getOne([seq], (err, row) => {
    if (err) { throw err }
    res.send(row)
  })
  
})





router.route('/reply')



.get((req, res) => {
  var board_seq = req.query.board_seq

  boardModel.getReplyAll([board_seq], (err, rows) => {
    if (err) { throw err }
    res.send(rows)
  })
})




.post(security.isAuthenticated, (req, res, next) => {
  var board_seq = req.body.board_seq
  boardModel.replyCntUp([board_seq] ,(err, affectedRows) => {
    if (err) { throw err }
    if (affectedRows === 1) {
      next()
    }
  })
})

.post((req, res) => {
  var content = req.body.content
  var user_email = req.user.user_email
  var board_seq = req.body.board_seq
  boardModel.addReply([content, user_email, board_seq], (err, insertId) => {
    if (err) { throw err } 
    if (insertId) {
      res.redirect('/api/board/reply?board_seq=' + board_seq)
    }
  })
})






.delete(security.preAuthorize, (req, res, next) => {
  var board_seq = req.body.board_seq
  boardModel.replyCntDown([board_seq], (err, affectedRows) => {
    if (err) { throw err }
    if (affectedRows === 1) {
      next()
    }
  })
})

.delete((req, res) => {
  var reply_seq = req.body.reply_seq
  boardModel.deleteReply([reply_seq], (err, affectedRows) => {
    if (err) { throw err }
    if (affectedRows === 1) {
      res.send({ result: 'success' })
    }
  })
})


module.exports = router
