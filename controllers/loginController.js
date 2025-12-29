const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSectret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


//get login page
//GET
const getLogin = (req, res) => {
    res.render("home");
};


//Login user
//POST
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
        return res.json({message: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({message: "Invalid credentials"});
    }
    const token = jwt.sign({ id: user._id}, jwtSectret);
    res.cookie("token", token, {httpOnly: true});
    redirect("/contacts");
});

//REgister page
//GET /register
const getRegister = (req, res) => {
    res.render("register");
};

//Register user
//POST /register
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;
    if (password == password2) {
        //true
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.json({ message: "User registered successfully", user });
    } else {
        //false
        res.send("Passwords do not match");
    }
});

module.exports = {getLogin, loginUser, getRegister, registerUser};