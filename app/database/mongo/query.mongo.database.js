const bcrypt = require('bcryptjs');


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


const getUserdocument = async (param, fields) => {
   return new Promise(async(resolve,reject)=>{
    try {
        let _id = param._id
        const account = await Allusers.findOne({ _id });
        if (!account || account.secretKey!=param.key) {
            return { success: false, msg: "invalid Credentials" }
        } else {
            var result = await Allusers.find({}).where(param).select(fields)

        resolve ({success:true,response:result})
        }
        
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
        const account = await Allusers.findOne({ _id });
            if (!bcrypt.compareSync(Pass, account.password)) {
                console.log("invalid Credentials")
                reject ({ success: false, msg: "invalid Credentials" })
            }
            resolve( { success: true, response:account })
    } catch (error) {
        console.log(error)

        reject({ success: false, response: error })
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
    deleteUserdocument
}