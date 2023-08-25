const express = require('express');
const path = require('path')
var cookieParser = require('cookie-parser');
const responseTime = require('response-time')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '/app')))
app.use(cookieParser());

app.use(responseTime((req, res, time) => {
  console.log(req.method, req.url, time + 'ms');
}));

const port = 3000

// connect mongo database
require('./app/database/mongo/connection.mongo.database')

// routes
app.use('/',require('./app/routes/index.route'))


app.all('*', (req, res, next) => {

    res.status(404).send({ success: false, error:`Can't find ${req.originalUrl} on the server`});
  });

app.listen(port,()=>{
    console.log(`app is listing at port : ${port}`)
})


module.exports = app