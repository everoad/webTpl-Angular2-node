var mysql = require('promise-mysql')
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'webtemplate'
})

module.exports = pool
