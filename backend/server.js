const socketIO = require("socket.io")
const messageHandler = require('./handlers/message.handler')
const express = require('express')

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

let currentUserId = 2;
const userIds = {};

const io = socketIO(server)
const users = {}

io.on("connection", (socket) => {
    console.log("a user connected!")
    console.log(socket.id)
    users[socket.id] = {userId: currentUserId++};
    socket.on("join", username => {
      users(socked.id).username = username;
      messageHandler.handleMessage(socket, users)
    })
    socket.on("action", action => {
      switch(action.type){
        case "server/hello":
          console.log("Got a hello event", action.data);
          socket.emit("action", { type: "message", data: "Good day!"});
      }
    })
    
})