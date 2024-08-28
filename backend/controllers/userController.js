const express = require('express');
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');

//login
const loginController = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name: name });

    if (user && (await user.matchPassword(password))) {
        const respose = {
            stat: "Success",
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        };
        res.json(respose)
    } else {
        res.status(401);
        throw new Error('Invalid name or password or both');
    }

});


//registration
const registerController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check for all fields
    if (!name || !email || !password) {
        res.send(400);
        throw Error("all fields are not filled");
    }

    //pre existing user
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        throw new Error("User already exists");
    }

    //username already taken
    const usernameExists = await User.findOne({ name: name });
    if (usernameExists) {
        throw new Error("Username already taken");
    }

    //create user
    const newuser = await User.create({
        name,
        email,
        password,
    })

    if (newuser) {
        res.status(201).json({
            _id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            isAdmin: newuser.isAdmin,
            token: generateToken(newuser._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Registration Error');
    }
});

module.exports = { loginController, registerController };