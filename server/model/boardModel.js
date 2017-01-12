var pool = require('../db/connect')

pool.getConnection().then((connection) => {


  /**
   * Get contents.
   * @param {any[]} params - [ menu_fir_seq, menu_sec_seq, start, dataPerPage, skey, stype ] LIMIT start, dataPerPage
   * @param {function(any[], Error)} callback
   */
  exports.getList = (params, callback) => {
    var sql =
      'SELECT board_seq, title, DATE_FORMAT(reg_date, "%Y-%m-%d") reg_date, hit_count, reply_count, front_img, user_nick, board.menu_fir_seq, board.menu_sec_seq, menu_sec_name ' +
      'FROM board ' +
      'JOIN user ' +
      'ON user.user_email = board.user_email ' +
      'JOIN menu_sec ' +
      'ON board.menu_sec_seq = menu_sec.menu_sec_seq ' +
      'WHERE board.menu_fir_seq = ? ' +
      'AND board.menu_sec_seq = ? ' +
      'ORDER BY board_seq DESC ' +
      'LIMIT ?, ?'

    connection.query(sql, params)
      .then((rows) => callback(rows))
      .catch((err) => callback(null, err))
  }



  /**
   * Get a number of contents.
   * @param {any[]} params - [ menu_fir_seq, menu_sec_seq, stype, skey ]
   * @param {function(number, Error)} callback
   */
  exports.getTotalDataNum = (params, callback) => {
    var sql =
      'SELECT count(*) total FROM board ' +
      'WHERE board.menu_fir_seq = ? ' +
      'AND board.menu_sec_seq = ? '

    connection.query(sql, params)
      .then(rows => callback(rows[0]))
      .catch((err) => callback(null, err))
  }



  /**
   * Get a content.
   * @param {any[]} params - [ board_seq ]
   * @param {function(any[], Error)} callback
   */
  exports.getDetail = (params, callback) => {
    var sql =
      'SELECT board_seq, content, title, DATE_FORMAT(reg_date, "%Y-%m-%d") reg_date, hit_count, reply_count, user_nick, board.menu_fir_seq, board.menu_sec_seq ' +
      'FROM board ' +
      'JOIN user ' +
      'ON user.user_email = board.user_email ' +
      'WHERE board_seq = ? '

    connection.query(sql, params)
      .then((rows) => callback(rows[0]))
      .catch((err) => callback(null, err))
  }



  /**
   * Add content.
   * @param {any[]} params - [ title, content, front_img, user_email, menu_fir_seq, menu_sec_seq ].
   * @param {function(number, Error)} callback
   */
  exports.add = (params, callback) => {
    var sql =
      'INSERT INTO board(title, content, reg_date, hit_count, reply_count, front_img, user_email, menu_fir_seq, menu_sec_seq) ' +
      'VALUES (?, ?, now(), 0, 0, ?, ?, ?, ?)'

    connection.query(sql, params)
      .then((result) => callback(result.insertId))
      .catch((err) => callback(null, err))
  }



  /**
   * Edit content.
   * @param {any[]} params - [ title, content, front_img, board_seq ]
   * @param {function(number, Error)} callback
   */
  exports.edit = (params, callback) => {
    var sql =
      'UPDATE board ' +
      'SET title = ?, content = ?, front_img = ? ' +
      'WHERE board_seq = ?'

    connection.query(sql, params)
      .then(result => callback(result.affectedRows))
      .catch(err => callback(null, err))
  }



  /**
   * Delete content.
   * @param {any[]} params - [ board_seq ].
   * @param {function} - callback(results, Error)
   */
  exports.delete = (params, callback) => {
    var sql =
      'DELETE FROM board WHERE board_seq = ?'

    connection.query(sql, params)
      .then(result => callback(result.affectedRows))
      .catch((err) => callback(null, err))
  }

}).catch((err) => {
  console.error('boardModel : ' + err.stack)
})
