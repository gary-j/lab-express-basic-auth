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


router.get('/create', (req, res) =>{
    res.render('auth-create')
})

router.post('/create', async (req, res) => {

    const { username, password } = req.body

    await User.findOne({username}).then( async (isUser)=>{
        
        if(isUser){

            res.send('USER already exist !')

        }else if (!isUser){
            // pour l'instant le MDP n'est pas hashé
           const createdUser = await User.create({username, password}).then( (newUser) => {
               console.log(newUser, "a été créé"),
                req.session.user = newUser;

               res.redirect('../routes/index.js')
           })
        }
    })
})


module.exports = router