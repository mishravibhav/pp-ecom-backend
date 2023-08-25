const path = require('path')
const env = process.env.NODE_ENV || "development"
require('dotenv').config({ path: path.resolve(__dirname, `../../${env}.env`) })

module.exports = {
    database :{
        mysql:{
            host : process.env.sql_host, 
            user:process.env.sql_user,
            password:process.env.sql_password,
            database:process.env.sql_database,
            port :process.env.sql_port,
            connectionLimit : process.env.sql_connectionlimit
        },
        mongodb:{
            url:`mongodb://${process.env.mongodb_user}:${process.env.mongodb_password}@${process.env.mongodb_host}:${process.env.mongodb_port}/${process.env.mongodb_database}`
        },
    },
    secretkey:"secretkey"
}