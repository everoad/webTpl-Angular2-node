var pool = require('../db/connect')

pool.getConnection().then((connection) => {
  
  /**
   * Returns user data for login.
   * @param  {any[]} params
   * @param  {function(any[], Error)} callback
   */
  exports.login = (params, callback) => {
    var sql =
      'SELECT user_email, user_pwd FROM user WHERE user_email = ?'

    connection.query(sql, params)
      .then(rows => callback(rows[0]))
      .catch((err) => callback(null, err))
  }


  /**
   * Returns insertId.
   * @param {any[]} params
   * @param {function(any[], Error)} callback
   */
  exports.join = (params, callback) => {
    var sql =
      'INSERT INTO user(user_email, user_nick, user_pwd, user_jdate, enabled) ' +
      'VALUES (?, ?, ?, now(), true)'
      
    connection.query(sql, params)
      .then(result => callback(result.insertId))
      .catch((err) => callback(null, err))
  }
}).catch((err) => console.error('userModel : ' + err.stack))
