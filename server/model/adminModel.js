var pool = require('../db/connect')


pool.getConnection().then((conn => {

  exports.getMenu = (callback) => {

  }



  exports.editMenu = (params, callback) => {

  }




  exports.getHome = (callback) => {

  }



  exports.editHome = (params, callback) => {

  }


})).catch(err => { throw err })