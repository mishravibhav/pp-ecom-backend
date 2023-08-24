const mongodb = require('../database/mongo/query.mongo.database')

exports.register = async (req, res, next) => {
    const body = req.body
    if(!body || !body._id || !body.name || !body.email || !body.password) return res.status(400).json({success: false, response:"mandatory fields are missing in body payload"});

    const dbRes = await mongodb.createUserdocument(body).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })

    console.log(dbRes)
    if(!dbRes.success) return res.status(400).json(dbRes);

    res.status(200).json(dbRes);
    
}

exports.login = async (req, res, next) => {
    const body = req.body
    if(!body || !body._id || !body.password) return res.status(400).json({success: false, response:"_id or password is missing"});

    const dbRes = await mongodb.login({_id:body._id,password:body.password}).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })

    console.log(dbRes)
    if(!dbRes.success) return res.status(400).json(dbRes);

    res.status(200).json(dbRes);

}

exports.resetPassword = async (req, res, next) => {
    res.status(200).json({success: true, response:"resetPassword"});

}

exports.update = async (req, res, next) => {
    res.status(200).json({success: true, response:"update"});
}