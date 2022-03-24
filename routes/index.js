const router = require("express").Router();
const isLoggedIn = require('../middlewares/isLoggedIn')


// 👇 Ajout de routes
const auth = require('./auth.routes');
router.use('/auth', auth);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
/* LOG OUT */
router.get('/logout', (req, res)=>{
  req.session.destroy()
  res.redirect('/')
})
/* Main route*/
router.get('/main', isLoggedIn, (req, res, next)=>{
  res.render('main')
})
/* Private route*/
router.get('/private', isLoggedIn, (req, res, next)=>{
  res.render('private')
})

module.exports = router;
