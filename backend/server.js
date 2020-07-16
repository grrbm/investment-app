const socketIO = require("socket.io")
const { v1: uuidv1 } = require('uuid');
const messageHandler = require('./handlers/message.handler')
const express = require('express')

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const userIds = {};

const io = socketIO(server)
const users = {}

function createUsersOnline()
{
  const values = Object.values(users);
  const onlyWithUsernames = values.filter(u => u.username !== undefined);
  return onlyWithUsernames;
}

io.on("connection", (socket) => {
    console.log("a user connected!")
    console.log(socket.id)
    users[socket.id] = {userId: uuidv1};
    socket.on("join", username => {
      users(socked.id).username = username;
      messageHandler.handleMessage(socket, users)
    })
    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("action", {type: "users_online", data: createUsersOnline()})
    })
    socket.on("action", action => {
      switch(action.type){
        case "server/hello":
          console.log("Got a hello event", action.data);
          socket.emit("action", { type: "message", data: "Good day!"});
          break;
        case "server/join":
          console.log("Got join event", action.data);
          users(socket.id).username = action.data;
          io.emit("action",{ 
            type: "users_online", 
            data: createUsersOnline()
          })
          break;
      }
    })
    
})