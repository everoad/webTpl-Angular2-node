var winston = require('winston')
var moment = require('moment')
var path = require('path')


var logger = new (winston.Logger)({

  transports: [
    new (winston.transports.Console)({
      timestamp: function(){
        return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.join(__dirname, 'filelog-error.log'),
      level: 'error'
    })
  ]

})

module.exports = logger