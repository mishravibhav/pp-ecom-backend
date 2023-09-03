const express = require('express');
const path = require('path')
var cookieParser = require('cookie-parser');
const responseTime = require('response-time')
const appMiddleware = require('./app/middleware/app.middleware')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '/app')))
app.use(cookieParser());
const port = 3000
app.use(responseTime(appMiddleware.requestLogger))

// connect mongo database
require('./app/database/mongo/connection.mongo.database')

// routes
app.use('/',require('./app/routes/index.route'))

// middlewares
app.use(appMiddleware.errorLogger)
app.use(appMiddleware.errorResponder)
app.use(appMiddleware.invalidPathHandler)

app.listen(port,()=>{
    console.log(`app is listing at port : ${port}`)
})


module.exports = app