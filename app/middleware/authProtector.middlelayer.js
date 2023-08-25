const Config = require('../config/app.config')
const jwt = require("jsonwebtoken");
const authenticateUser = require('../database/mongo/query.mongo.database').validateToken


module.exports = async (req, res, next) => {

  if (!req.body.token && !req.query.token && !req.cookies["vib-token"] && !req.headers["vib-token"]) {
    return res.status(403).json({success:false,message:"token is required for authentication"});
  }
  try {
    const token = req.body.token || req.query.token || req.cookies["vib-token"] || req.headers["vib-token"];
    const decoded = jwt.verify(token, Config.secretkey);

    if(!decoded){
      res.clearCookie("vib-token");
      return res.status(401).json({success:true,message:"token expired"});
    }
      const USER = await authenticateUser(decoded._id,token).then((res)=>{
        return res
      }).catch((err)=>{
        return err
      })
      if(!USER.success){
        return res.status(401).json(USER);
      }
        // console.log(USER)
        req.user = USER.response[0]
      
  } catch (err) {
    console.log(err)
    return res.status(401).json({success:true,message:"Invalid Token"});
  }
  return next();
}