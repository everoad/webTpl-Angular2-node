// provided as part of the Google Cloud developer documentation

"use strict"
var app = require('../app')
var debug = require("debug")("express:server")
var http = require("http")
var socketio = require('socket.io')

var port = normalizePort(process.env.PORT || 3000)
app.set("port", port)

var server = http.createServer(app);

//listen on provided ports
server.listen(port)

//add error handler
server.on("error", onError)

//start listening on port
server.on("listening", onListening)


//socket.io
var io = socketio.listen(server)

io.sockets.on('connection', (socket) => {
  socket.on('message', (message) => {
    io.sockets.emit('message', message)
  })
})

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}



/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port
  debug("Listening on " + bind)
}
