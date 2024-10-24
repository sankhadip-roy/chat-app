const http = require("http");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sankhadiproy23:nqou7frIgFrXYJ71@cluster0.czznsuk.mongodb.net/?retryWrites=true&w=majority"
    ); //will use env variable later
    console.log("Database connected"); //log
  } catch (err) {
    console.log("Database not connected", err); //log
  }
};
connectDb();

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://0dab-2405-201-8011-60aa-b7c8-583e-3cf9-4ba2.ngrok-free.app",
        "http://localhost:5173",
        "https://chat-app-three-phi-24.vercel.app/",
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Set();

io.on("connection", (socket) => {
  onlineUsers.add(socket.id);
  const usersList = Array.from(onlineUsers);
  // console.log(`✔ ${socket.id} :` + usersList); //log
  io.emit("online-users", usersList);
  socket.on("send_message", (data) => {
    // console.log("Data:", data); //log
    io.emit("recive_message", data);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    const usersList = Array.from(onlineUsers);
    // console.log(`✘ ${socket.id} :` + usersList) //log
    io.emit("online-users", usersList);
  });
});

app.use("/", userRoutes);

server.listen(3001, () => console.log("Server is running on port 3001")); //will use env variable later
