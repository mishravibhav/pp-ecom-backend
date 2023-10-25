const tryCatch = require('../utils/tryCatch.util')
const AppError =  require('../utils/apperror.util')
const mongodb = require('../database/mongo/query.mongo.database')

exports.overview = tryCatch(async (req, res, next) => {
    // console.log(req)

    if(req.params._id==="errorcheck") {
        throw new AppError("APP_ERROR","_id is missing in request",400)
    }
    const _id = req.params._id

    const dbRes = await mongodb.getUserdocument(_id,["_id","name","email","access","status","access","created_date","updated_date"]).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })

    // console.log(dbRes)
    if(!dbRes.success) return res.status(400).json(dbRes);

    res.status(200).json(dbRes);

})

exports.delete = tryCatch(async (req, res, next) => {
    // console.log(req)
    const _id = req.user._id

    const dbRes = await mongodb.deleteUserdocument({_id:_id}).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })

    // console.log(dbRes)
    if(!dbRes.success) return res.status(400).json(dbRes);

    res.status(200).json(dbRes);

})

exports.resetPassword = tryCatch(async (req, res, next) => {
    res.status(200).json({success: true, response:"resetPassword"});

})

exports.update = tryCatch(async (req, res, next) => {
    res.status(200).json({success: true, response:"update"});
})