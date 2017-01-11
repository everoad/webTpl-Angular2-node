var express = require('express')
var router = express.Router()
var boardModel = require('../model/boardModel')
var HTML = require('html-parse-stringify')
router.route('/:menu_fir_seq/:menu_sec_seq')
.get((req, res) => {
  var index = req.query.index
  var fir = req.params.menu_fir_seq
  var sec = req.params.menu_sec_seq
  var promise = new Promise((resolve, reject) => {
    boardModel.getTotalDataNum([fir, sec], (row, err) => {
      if (err) {
        console.error(err.stack)
      }
      resolve(parseInt(row.total))
    })
  })
  promise.then((total) => {
    var dataPerPage = 12
    var totalPage = Math.ceil(total / dataPerPage)
    totalPage = (totalPage === 0) ? 1 : totalPage
    index = (index < 1) ? 1 : index
    index = (index > totalPage) ? totalPage : index
    var start = (index - 1) * dataPerPage
    boardModel.getList([fir, sec, start, dataPerPage], (rows, err) => {
      if (err) {
        console.error(err.stack)
      }
      res.send({ boards: rows, total: total, dataPerPage: dataPerPage, totalPage: totalPage })
    })
  })
})
.post((req, res) => {
  var firSeq = req.body.menu_fir_seq
  var secSeq = req.body.menu_sec_seq
  var title = req.body.title
  var content = req.body.content
  var userEmail = 'test'
  var frontImg
  for (let tag of HTML.parse(content)) {
    if (tag.name === 'img') {
      frontImg = tag.attrs.src
      break
    }
  }
  boardModel.add([title, content, frontImg, userEmail, firSeq, secSeq], (insertId, err) => {
    if (err) {
      console.error(err.stack)
    }
    if (insertId === null) {
      res.send({ result: 'fail' })
    } else {
      res.send({
        board_seq: insertId
      })
    }
  })
})
.put((req, res) => {

})
.delete((req, res) => {
  var boardSeq = req.body.board_seq
})

router.get('/:menu_fir_seq/:menu_sec_seq/:board_seq', (req, res) => {
  var seq = req.params.board_seq
  boardModel.getDetail([seq], (row, err) => {
    if (err) {
      console.log(err)
    }
    res.send(row)
  })
})

router.get('/main', (req, res) => {
  boardModel.getMainList((rows, err) => {
    if (err) {
      console.error(err)
    }
    res.send(rows)
  })
})

module.exports = router
