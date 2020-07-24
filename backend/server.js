const socketIO = require("socket.io")
const { v1: uuidv1 } = require('uuid');
const messageHandler = require('./handlers/message.handler')
const express = require('express')

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server)
const users = {}

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

function createUsersOnline()
{
  const values = Object.values(users);
  const onlyWithUsernames = values.filter(u => u.username !== undefined);
  return onlyWithUsernames;
}

io.on("connection", (socket) => {
    console.log("a user connected!")
    console.log(socket.id)
    users[socket.id] = {userId: uuidv1()};
    socket.on("join", username => {
      users[socked.id].username = username;
      users[socket.id].avatar = createUserAvatarUrl();
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
          users[socket.id].username = action.data;
          users[socket.id].avatar = createUserAvatarUrl();
          io.emit("action",{ 
            type: "users_online", 
            data: createUsersOnline()
          })
          break;
        case "server/private-message":
          console.log("Got a private-message",action.data);
      }
    })
    
})