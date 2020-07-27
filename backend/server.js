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
    socket.on("disconnect", () => {
      console.log(JSON.stringify(users[socket.id])+" disconnected.");
      delete users[socket.id];
      io.emit("action", {type: "users_online", data: createUsersOnline()});
    })
    socket.on("reconnect_attempt", () => {
      console.log(JSON.stringify(users[socket.id])+" is attempting to reconnect.");
    })
    socket.on("action", action => {
      switch(action.type){
        case "server/join":
          console.log("Got join event", action.data);
          users[socket.id].username = action.data;
          users[socket.id].avatar = createUserAvatarUrl();
          io.emit("action",{ 
            type: "users_online", 
            data: createUsersOnline()
          });
          socket.emit("action", { type: "self_user", data: users[socket.id] })
          break;
        case "server/private_message":
          console.log("received server/private_message event");
          const conversationId = action.data.conversationId;
          const from = users[socket.id].userId;
          const userValues = Object.values(users);
          const socketIds = Object.keys(users);
          for(let i=0; i < userValues.length; i++)
          {
            if (userValues[i].userId === conversationId)
            {
              const socketId = socketIds[i];
              console.log("emmiting private message: "+JSON.stringify(action.data));
              io.sockets.sockets[socketId].emit("action", { 
                type: "private_message",
                data: {...action.data},
                conversationId: from
              })
            }
          }
          break;
      }
    })
    
})