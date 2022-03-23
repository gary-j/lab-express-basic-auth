const router = require("express").Router();
const mongoose = require("mongoose");
const User = require('../models/User.model');

const bcrypt = require('bcrypt');
// const saltRounds = bcrypt.getRounds(10)
const saltRounds = 10;

const session = require('express-session');

router.get('/', (req, res) =>{
    res.render('auth')
})


module.exports = router