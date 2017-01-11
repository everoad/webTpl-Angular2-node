var pool = require('../db/connect')

pool.getConnection().then((connection) => {
  exports.getMenu = (params, callback) => {
    var sql =
      'SELECT menu_fir_seq, menu_fir_name, menu_fir_type ' +
      'FROM menu_fir ' +
      'ORDER BY menu_fir_index'
    connection.query(sql, params)
      .then((rows) => rows.map((row, index) => {
        connection.query('SELECT menu_sec_seq, menu_sec_name, menu_fir_seq, menu_sec_index ' +
                         'FROM menu_sec WHERE menu_fir_seq = ?', [row.menu_fir_seq])
          .then(rows1 => {
            row['menu_sec'] = rows1
            if (index === (rows.length - 1)) {
              callback(rows)
            }
          })
      }))
  }
}).catch((err) => {
  console.error('boardModel : ' + err.stack)
})
