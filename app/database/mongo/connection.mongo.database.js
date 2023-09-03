
const mongoose = require('mongoose');
const mongoString = require('../../config/app.config').database.mongodb.url
const userModel = require('../../models/user.model').userSchema

mongoose.connect(mongoString).then(() => console.log("db connection successfull..")).catch((err) => console.log("error", err));

const user = new mongoose.Schema(userModel);
const Allusers = mongoose.model('user_profile', user);


module.exports = Allusers