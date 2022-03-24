module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.session.user) {
  
    return res.status(403).send('DENIED, You need to Sign In')

    }
    req.user = req.session.user
    next()
  }
  