const express = require('express');
const User = require("../models/userModel");
const Router = express.Router();

function loginController(req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email })
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
}

function registerController(req, res) {
    User.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

Router.post("/login", loginController);
Router.post("/register", registerController);

module.exports = Router;