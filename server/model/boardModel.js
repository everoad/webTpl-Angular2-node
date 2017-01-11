var pool = require('../db/connect')

pool.getConnection().then((connection) => {
  exports.getList = (params, callback) => {
    var sql =
      'SELECT board_seq, title, reg_date, hit_count, reply_count, front_img, user_nick, board.menu_fir_seq, board.menu_sec_seq, menu_sec_name ' +
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

  exports.getTotalDataNum = (params, callback) => {
    var sql =
      'SELECT count(*) total FROM board ' +
      'WHERE board.menu_fir_seq = ? ' +
      'AND board.menu_sec_seq = ?'

    connection.query(sql, params)
      .then(rows => callback(rows[0]))
      .catch((err) => callback(null, err))
  }

  exports.getDetail = (params, callback) => {
    var sql =
      'SELECT board_seq, content, title, reg_date, hit_count, reply_count, user_nick, board.menu_fir_seq, board.menu_sec_seq ' +
      'FROM board ' +
      'JOIN user ' +
      'ON user.user_email = board.user_email ' +
      'WHERE board_seq = ?'

    connection.query(sql, params)
      .then((rows) => callback(rows[0]))
      .catch((err) => callback(null, err))
  }

  exports.getMainList = (callback) => {
    var sql =
      'SELECT menu_fir_name, menu_fir_seq FROM menu_fir'

    connection.query(sql)
      .then(firMenu => firMenu.map((row, index) => {
        var sql =
          'SELECT board_seq, title, reg_date, hit_count, reply_count, front_img, user_nick, board.menu_fir_seq, board.menu_sec_seq, menu_sec_name ' +
          'FROM board ' +
          'JOIN user ' +
          'ON user.user_email = board.user_email ' +
          'JOIN menu_sec ' +
          'ON board.menu_sec_seq = menu_sec.menu_sec_seq ' +
          'WHERE board.menu_fir_seq = ? ' +
          'ORDER BY board_seq DESC ' +
          'LIMIT 0, 5'

        connection.query(sql, [row.menu_fir_seq])
          .then(boards => {
            row['menu_sec'] = boards
            if ((index + 1) === firMenu.length) {
              callback(firMenu)
            }
          }).catch((err) => callback(null, err))
      })).catch((err) => callback(null, err))
  }

  exports.add = (params, callback) => {
    var sql =
      'INSERT INTO board(title, content, reg_date, hit_count, reply_count, front_img, user_email, menu_fir_seq, menu_sec_seq) ' +
      'VALUES (?, ?, now(), 0, 0, ?, ?, ?, ?)'

    connection.query(sql, params)
      .then((result) => callback(result.insertId))
      .catch((err) => callback(null, err))
  }
}).catch((err) => {
  console.error('boardModel : ' + err.stack)
})

