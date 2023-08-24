// const authenticateUser = require('../database/db')

module.exports = async (req, res, next) => {
    console.log("req.originalUrl==>",req.originalUrl)

    if(token){
      // jwt token validations
      // fetch user_id from token
      // authenticate user and pass user payload in req.user
    }

    req.user = user; 
    next();
  }