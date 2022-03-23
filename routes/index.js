const router = require("express").Router();

// 👇 Ajout de routes
const auth = require('./auth.routes');
router.use('/auth', auth);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* authentication routes */
router.get('/auth', (req,res,next)=> {
  res.render('auth.routes')
})

module.exports = router;
