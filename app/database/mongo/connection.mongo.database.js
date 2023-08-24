
const mongoose = require('mongoose');
const mongoString = require('../../config/app.config').database.mongodb.url
const userSchema = require('../../schema/user.schema').userSchema

mongoose.connect(mongoString).then(() => console.log("db connection successfull..")).catch((err) => console.log("error", err));

const user = new mongoose.Schema(userSchema);
const Allusers = mongoose.model('user_profile', user);

module.exports = Allusers