require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_KEY)
const todoSchema = mongoose.Schema({
    message: String,
    username: String,
    room: String,

})