const express = require('express')
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    // Handle 'send_message' event
    socket.on('send_message', (data) => {
        console.log(`Received message: ${data.message}`);
        // Broadcast the message to all connected clients
        io.emit('recive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3001, () => {
    console.log(`Example app listening on port 3001`);
});