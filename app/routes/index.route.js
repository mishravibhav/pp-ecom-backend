const express = require("express");
const authRoutes = require('./auth.route');
const productRoutes = require('./product.route');
const { swaggerServe, swaggerSetup } = require('../docs/swagger.config')

// middleware
const router = express.Router();
router.use("/docs/api-docs", swaggerServe, swaggerSetup); 
router.use("/product", productRoutes);
router.use("/auth", authRoutes);


router.get('/health',(req,res)=>{
    res.status(200).json({success: true, response:"health check success"});
})

module.exports = router;