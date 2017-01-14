var pool = require('../db/connect')

pool.getConnection().then((connection) => {

  /**
   * Get contents.
   * @param {any[]} params - [ menu_fir_seq, menu_sec_seq, start, dataPerPage, skey, stype ] LIMIT start, dataPerPage
   * @param {function(any[], Error)} callback
   */
  exports.getAll = (params, callback) => {
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
      .then((rows) => callback(null, rows))
      .catch((err) => callback(err, null))
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
      .then(rows => callback(null, rows[0]))
      .catch((err) => callback(err, null))
  }



  /**
   * Get a content.
   * @param {any[]} params - [ board_seq ]
   * @param {function(any[], Error)} callback
   */
  exports.getOne = (params, callback) => {
    var sql =
      'SELECT board_seq, content, title, DATE_FORMAT(reg_date, "%Y-%m-%d") reg_date, hit_count, reply_count, user_nick, board.user_email, board.menu_fir_seq, board.menu_sec_seq ' +
      'FROM board ' +
      'JOIN user ' +
      'ON user.user_email = board.user_email ' +
      'WHERE board_seq = ? '

    connection.query(sql, params)
      .then((rows) => callback(null, rows[0]))
      .catch((err) => callback(err, null))
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
      .then((result) => callback(null, result.insertId))
      .catch((err) => callback(err, null))
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
      .then(result => callback(null, result.affectedRows))
      .catch(err => callback(err, null))
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
      .then(result => callback(null, result.affectedRows))
      .catch((err) => callback(err, null))
  }




}).catch((err) => {
  console.error('boardModel : ' + err.stack)
})
