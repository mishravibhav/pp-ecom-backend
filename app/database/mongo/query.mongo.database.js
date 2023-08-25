const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var Config = require('../../config/app.config')
const Allusers = require('./connection.mongo.database')

const createUserdocument = async (userPayload) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let payload = userPayload
            let payloadcopy = payload
            const passwordHash = bcrypt.hashSync(payloadcopy.password, 10);
            payload.password = passwordHash
            const newUser = new Allusers(payload)
            // console.log(newUser)
    
            await newUser.save()
    
            resolve({ success: true, response: "user created successfully" })
        } catch (error) {
            reject ({ success: false, response: error.message })
        }
    })
}


const getUserdocument = async (_id, fields) => {
   return new Promise(async(resolve,reject)=>{
    try {
        var result = await Allusers.find({}).where({_id:_id}).select(fields)

        resolve ({success:true,response:result})
        
    } catch (error) {
        reject ({ success: false, response: error })
    }
   })
}


const updateUserdocument = async (_id, updateParam) => {
    return new Promise(async(resolve,reject)=>{
        try {
            var updateUserpayload = updateParam
            if(updateParam.password){
                var passwordHashed = bcrypt.hashSync(updateParam.password, 10);
                updateUserpayload.password = passwordHashed
            }
            var result = await Allusers.findByIdAndUpdate({ _id }, {
                $set: updateUserpayload
            },{new: true})
            resolve({succuss:true,response:result})
        } catch (error) {
            // console.log(error)
            reject( { success: false, response: error })
        }
    })
}

const login = async(params)=> {
    return new Promise(async(resolve,reject)=>{
    try {
        console.log("params",params)
        let _id = params._id
        let Pass = params.password
        let account = await Allusers.findOne({ _id });
            if (!bcrypt.compareSync(Pass, account.password)) {
                console.log("invalid Credentials")
                reject ({ success: false, response: "invalid Credentials" })
            }

            var token = jwt.sign(
                { _id: _id, _id },
                Config.secretkey,
                {
                    expiresIn: "12h",
                }
            );
        
            const loginres = await updateUserdocument(_id, {secretKey:token}).then((res)=>{
                return {success:true,response:res}
            }).catch((err)=>{
                return {success:false,response:err}
            })
            if(!loginres.success){
                reject({ success: false, response: error })
            }

            resolve( { success: true, token:token })
    } catch (error) {
        console.log(error)

        reject({ success: false, response: error })
    }
    })
    
}

const validateToken = async (_id,token) => {
    return new Promise(async(resolve,reject)=>{
     try {
         var result = await Allusers.find({}).where({_id:_id,secretKey:token}).select(["_id","name","email","secretKey"])
 
         resolve ({success:true,response:result})
         
     } catch (error) {
         reject ({ success: false, response: error })
     }
    })
 }

const deleteUserdocument = async(params)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            resolve({success:true,response:""})
        } catch (error) {
            reject({success:false,response:error})
        }
    })
}


module.exports = {
    createUserdocument,
    getUserdocument,
    updateUserdocument,
    login,
    validateToken,
    deleteUserdocument
}