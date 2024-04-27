const express = require('express')
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");
const { log } = require('console');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

const onlineUsers = new Set()

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    onlineUsers.add(socket.id);
    const userList = Array.from(onlineUsers);
    io.emit('online-users', userList);
    socket.on('send_message', (data) => {
        console.log("Data:", data);
        io.emit('recive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        onlineUsers.delete(socket.id);
        const usersList = Array.from(onlineUsers);
        io.emit('online-users', usersList);
    });
});

server.listen(3001, () => {
    console.log(`Example app listening on port 3001`);
});