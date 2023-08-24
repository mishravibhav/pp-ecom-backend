const path = require('path')
const env = process.env.NODE_ENV || "development"
require('dotenv').config({ path: path.resolve(__dirname, `../../${env}.env`) })

module.exports = {
    database :{
        mysql:{
            host : process.env.host, 
            user:process.env.user,
            password:process.env.password,
            database:process.env.database,
            port :process.env.port,
            connectionLimit : process.env.connectionlimit
        },
        mongodb:{
            url:"mongodb://localhost:27017/ecom"
        },
    },
    secretkey:"secretkey"
}