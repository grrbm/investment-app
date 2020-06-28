const socketIO = require("socket.io")()
const messageHandler = require('./handlers/message.handler')
const express = require('express')

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

let currentUserId = 2;
const userIds = {};

const io = socketIO(server)

io.on("connection", (socket) => {
    console.log("a user connected!")
    console.log(socket.id)
    userIds[socket.id] = currentUserId++;
    messageHandler.handleMessage(socket, userIds)
})