
let currentMessageId = 1;

function createMessage(user, messageText)
{
    return (
        {
            _id: currentMessageId++,
            text: messageText,
            createdAt: new Date(),
            user: {
                _id: user.userId,
                name: user.username,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    );
}


function handleMessage(socket, users) {
    socket.on("message",(messageText) => {
        const user = userIds[socket.id];
        const message = createMessage(userId, messageText);
        console.log(message);
        socket.broadcast.emit("message", message)
    })
}

module.exports = { handleMessage }