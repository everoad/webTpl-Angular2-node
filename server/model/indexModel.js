var pool = require('../db/connect')

pool.getConnection().then((connection) => {

  /**
   * Returns a list of first menu.
   * @param {function([], Error)} callback
   */
  exports.getMenuFir = (callback) => {
    var sql =
      'SELECT menu_fir_seq, menu_fir_name, menu_fir_type ' +
      'FROM menu_fir ' +
      'ORDER BY menu_fir_index'

    connection.query(sql)
      .then(rows => callback(rows))
      .catch(err => callback(null, err))
  }


  /**
   * Returns a list of second menu.
   * @param {any[]} params - [menu_fir_seq]
   * @param {function(any[], Error)} callback
   */
  exports.getMenuSec = (params, callback) => {
    var sql =
      'SELECT menu_sec_seq, menu_sec_name, menu_fir_seq, menu_sec_index ' +
      'FROM menu_sec WHERE menu_fir_seq = ?'

    connection.query(sql, params)
      .then(rows => callback(rows))
      .catch(err => callback(null, err))
  }


  /**
   * Returns a list of contents that were written recently.
   * @param {any[]} params - [menu_fir_seq]
   * @param {function(any[], Error)} callback
   */
  exports.getMainAll = (params, callback) => {
    var sql =
      'SELECT board_seq, title, DATE_FORMAT(reg_date, "%Y-%m-%d") reg_date, hit_count, reply_count, front_img, user_nick, board.menu_fir_seq, board.menu_sec_seq, menu_sec_name ' +
      'FROM board ' +
      'JOIN user ' +
      'ON user.user_email = board.user_email ' +
      'JOIN menu_sec ' +
      'ON board.menu_sec_seq = menu_sec.menu_sec_seq ' +
      'WHERE board.menu_fir_seq = ? ' +
      'ORDER BY board_seq DESC ' +
      'LIMIT 0, 5'
    
    connection.query(sql, params)
      .then(rows => callback(rows))
      .catch(err => callback(null, err))
  }

}).catch((err) => {
  console.error('boardModel : ' + err.stack)
})
