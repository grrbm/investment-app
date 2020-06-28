const io = require("socket.io")()
const messageHandler = require('./handlers/message.handler')

const PORT = process.env.PORT || 3001;

let currentUserId = 2;
const userIds = {};

io.on("connection", (socket) => {
    console.log("a user connected!")
    console.log(socket.id)
    userIds[socket.id] = currentUserId++;
    messageHandler.handleMessage(socket, userIds)
})

io.listen(PORT);
console.log("server listening")