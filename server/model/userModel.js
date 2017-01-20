var pool = require('../db/connect')

pool.getConnection().then((connection) => {
  
  /**
   * Returns user data for login.
   * @param  {any[]} params
   * @param  {function(any[], Error)} callback
   */
  exports.getOne = (params, callback) => {
    var sql =
      'SELECT user_email, user_pwd, user_nick, user_role ' +
      'FROM user ' +
      'JOIN user_role ' +
      'ON user.user_email = user_role.user_email '
      'WHERE user_email = ?'

    connection.query(sql, params)
      .then(rows => callback(null, rows[0]))
      .catch(err => callback(err, null))
  }

  


  /**
   * Returns insertId.
   * @param {any[]} params
   * @param {function(any[], Error)} callback
   */
  exports.add = (params, callback) => {
    var sql =
      'INSERT INTO user(user_email, user_nick, user_pwd, user_jdate, enabled) ' +
      'VALUES (?, ?, ?, now(), true)'
      
    connection.query(sql, params)
      .then(result => callback(null, result.insertId))
      .catch((err) => callback(err, null))
      
  }
}).catch((err) => console.error('userModel : ' + err.stack))
