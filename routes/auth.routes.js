const router = require("express").Router();
const mongoose = require("mongoose");
const User = require('../models/User.model');

const bcrypt = require('bcrypt');
// const saltRounds = bcrypt.getRounds(10)
const saltRounds = 10;

// Just go to the auth page
router.get('/', (req, res) =>{
    res.render('auth')
})

// Loggin from auth with form POST
router.post('/', (req, res, next)=>{
    //attemptedUrl was ignitiated in middleware is LoggedIn, and be injeted in form
    const { username, password, attemptedUrl} = req.body;
    // verify username
    if(!username){
        return res.status(400).render('auth',{
            errorMessage: 'Please provide your username'
        })
    }
    // verify password
    if(password.length < 8){
        return res.status(400).render('auth',{
            errorMessage: 'Please provide a password longer than 7 characters'
        })
    }

    // Then we search user in the db
    User.findOne({username})
    .then((user)=>{
        // is username exist in db ?
        if(!user){
            console.log('not the same user');


            return res.status(400).render('auth',{
                errorMessage: 'Wrong Credentials, please check your Username or password'
            })
        }

        // is pprovides password matches the one in db ? need bcrypt

        bcrypt.compare(password, user.password)
        .then((isSamePassword) => {
            if (!isSamePassword){

                console.log('not the same password');
                return res.status(400).render('auth',{
                    errorMessage: 'Wrong Credentials, please check your Username or password'
                })
            }
            req.session.user = user;
            let sessionUser = req.session.user
            console.log(req.session.user, 'LA SESSION');
            // return res.redirect(attemptedUrl ||'/')
            res.render('index', sessionUser)
        })
    })
    .catch((err) => {
        // the middleware gonna handle the err, with next()
        console.error(err, 'ERRERUUUUUR')
        next(err)
    })
 
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
            
            return bcrypt
            .genSalt(saltRounds)
            .then((salt) => {
                // Je return le hashedPassword pour la suite .then
                return bcrypt.hash(password, salt)})
            .then((hashedPassword)=>{
                // Now i create user
                console.log(hashedPassword, 'MOT DE PASSS RETOUR');
                return User.create({username,password: hashedPassword}).then( (newUser) => {
                    console.log(newUser, "a été créé"),
                     req.session.user = newUser;
     
                    res.redirect('/')
                })
            })
            .catch( (error) => {
                next(error)
            })
        
        }
    })
})


module.exports = router