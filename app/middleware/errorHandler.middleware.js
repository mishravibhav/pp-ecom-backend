module.exports = async(error,req,res,next)=>{
    return res.status(400).json({success:false,error:error.message})
}