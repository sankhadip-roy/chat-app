const express = require('express')
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");
const { log } = require('console');
const userModel = require("./model/userDb")

const mongoose = require("mongoose")

const app = express();
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://sankhadiproy23:nqou7frIgFrXYJ71@cluster0.czznsuk.mongodb.net/?retryWrites=true&w=majority");

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

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ "stat": "Success", "user": user.name })
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
})

app.post("/register", (req, res) => {
    userModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

server.listen(3001, () => {
    console.log(`Example app listening on port 3001`);
});